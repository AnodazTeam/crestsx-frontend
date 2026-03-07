# CrestsX Frontend API Integration Guide

## API Endpoints

### Backend API (MCP Server)

Base URL: `NEXT_PUBLIC_API_BASE_URL`

#### Pool Endpoints

```
GET  /pools/{mint}           # Get pool info
POST /pools                   # Create new pool
POST /pools/{mint}/deposit   # Deposit tokens
POST /pools/{mint}/withdraw  # Withdraw tokens
GET  /pools/{mint}/balance/{wallet}  # Check balance
```

#### Order Endpoints

```
POST /orders                  # Create order (x402 protected)
GET  /orders/{id}             # Get order info
POST /orders/{id}/take        # Take order (x402 protected)
POST /orders/{id}/cancel      # Cancel order
GET  /orders/pool/{mint}      # List orders in pool
```

#### Agent Endpoints

```
POST /agents/register         # Register agent wallet
GET  /agents/{wallet}/positions  # Get positions
GET  /agents/{wallet}/orders   # Get orders
```

### WebSocket API

```javascript
const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL);

ws.onopen = () => {
  // Subscribe to pool updates
  ws.send(JSON.stringify({
    action: 'subscribe',
    pool: 'USDC'
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Handle orderbook updates
};
```

## x402 Payment Flow

### 1. Make Payment Request

```typescript
async function createOrder(params: OrderParams) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (response.status === 402) {
    const paymentRequired = await response.json();
    // Handle payment required
    return paymentRequired;
  }

  return response.json();
}
```

### 2. Payment Required Response

```typescript
interface PaymentRequired {
  required_amount: number;
  payment_token: string;
  payment_address: string;
  mandate_id: string;
  expires_at: number;
}
```

### 3. Execute Payment

```typescript
async function makePayment(payment: PaymentRequired) {
  // Integrate with wallet to send payment
  const tx = await wallet.sendTransaction({
    to: payment.payment_address,
    amount: payment.required_amount,
    token: payment.payment_token,
  });

  // Retry original request with payment proof
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Payment-Proof': tx.signature,
    },
    body: JSON.stringify(params),
  });

  return response.json();
}
```

## State Management

### React Context for Wallet

```typescript
// contexts/WalletContext.tsx
import { createContext, useContext, useState } from 'react';

interface WalletContextType {
  connected: boolean;
  walletAddress: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connect = async () => {
    // Connect to Solana wallet (Phantom, Solflare, etc.)
    const { solana } = window as any;
    if (solana?.isPhantom) {
      const response = await solana.connect();
      setWalletAddress(response.publicKey.toString());
      setConnected(true);
    }
  };

  const disconnect = () => {
    setConnected(false);
    setWalletAddress(null);
  };

  return (
    <WalletContext.Provider value={{ connected, walletAddress, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
```

### API Client Utility

```typescript
// lib/api.ts
import { useWallet } from '@/contexts/WalletContext';

export function useAPI() {
  const { walletAddress } = useWallet();

  async function request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(walletAddress && { 'X-Wallet-Address': walletAddress }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  return { request };
}
```

## Error Handling

### Error Types

```typescript
enum APIError {
  NETWORK_ERROR = 'NETWORK_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  PAYMENT_REQUIRED = 'PAYMENT_REQUIRED',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
}

class APIException extends Error {
  constructor(
    public type: APIError,
    message: string,
    public details?: any
  ) {
    super(message);
  }
}
```

### Error Handler Component

```typescript
// components/ErrorBoundary.tsx
'use client';

import React from 'react';

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setError(event.error);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
```

## Testing

### Mock API (Development)

```typescript
// lib/mock-api.ts
export const mockPools = [
  { mint: 'USDC', balance: 1000000, price: 1.0 },
  { mint: 'SOL', balance: 50000, price: 150.5 },
  { mint: 'CRX', balance: 100000, price: 0.05 },
];

export async function mockFetchPools() {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockPools), 500);
  });
}
```

### Integration Test

```typescript
// tests/api.test.ts
import { describe, it, expect } from 'vitest';
import { fetchPools } from '@/lib/api';

describe('API Integration', () => {
  it('should fetch pools', async () => {
    const pools = await fetchPools();
    expect(pools).toBeInstanceOf(Array);
    expect(pools[0]).toHaveProperty('mint');
  });
});
```

## Performance Optimization

### API Caching

```typescript
// lib/cache.ts
const cache = new Map<string, { data: any; expiry: number }>();

export async function cachedFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 60000 // 1 minute
): Promise<T> {
  const cached = cache.get(key);
  if (cached && cached.expiry > Date.now()) {
    return cached.data;
  }

  const data = await fetcher();
  cache.set(key, { data, expiry: Date.now() + ttl });
  return data;
}
```

### Request Batching

```typescript
// lib/batch.ts
const batchQueue: Map<string, Promise<any>> = new Map();

export async function batchRequest<T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> {
  if (batchQueue.has(key)) {
    return batchQueue.get(key)!;
  }

  const promise = fetcher().finally(() => {
    batchQueue.delete(key);
  });

  batchQueue.set(key, promise);
  return promise;
}
```

## Security

### XSS Prevention

```typescript
// lib/sanitize.ts
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
```

### CSRF Protection

```typescript
// Add CSRF token to requests
fetch('/api/orders', {
  headers: {
    'X-CSRF-Token': getCsrfToken(),
  },
});
```

## Debugging

### Logging

```typescript
// lib/logger.ts
export const logger = {
  info: (...args: any[]) => console.log('[INFO]', ...args),
  error: (...args: any[]) => console.error('[ERROR]', ...args),
  debug: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[DEBUG]', ...args);
    }
  },
};
```

### API Response Inspector

```typescript
// lib/inspector.ts
export function inspectResponse(response: Response) {
  console.log({
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries()),
  });
}
```
