# Solana Wallet Integration Guide

## Overview

CrestsX requires Solana wallet integration for:
- User authentication
- Token transactions
- Airdrop claims
- Pool deposits/withdrawals
- Order creation/execution

## Supported Wallets

- **Phantom** (recommended)
- Solflare
- Backpack
- Glow

## Installation

### 1. Install Wallet Adapter

```bash
npm install @solana/wallet-adapter-react @solana/wallet-adapter-react-ui
npm install @solana/wallet-adapter-wallets @solana/wallet-adapter-base
```

### 2. Create Wallet Context

Create `contexts/WalletContext.tsx`:

```tsx
"use client";

import React, { createContext, useContext, useMemo, useCallback } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

const WalletContext = createContext<{
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  signTransaction: (transaction: any) => Promise<any>;
} | null>(null);

export function useWalletContext() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWalletContext must be used within WalletContextProvider');
  }
  return context;
}

export function WalletProviderClient({ children }: { children: React.ReactNode }) {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      // Add more wallets as needed
    ],
    []
  );

  const network = useMemo(() => clusterApiUrl('devnet'), []);

  return (
    <ConnectionProvider endpoint={network}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
```

## 3. Update Root Layout

Add to `app/layout.tsx`:

```tsx
import { WalletProviderClient } from '@/contexts/WalletContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <WalletProviderClient>
        <body className={inter.className}>{children}</body>
      </WalletProviderClient>
    </html>
  );
}
```

## 4. Create Wallet Button Component

Create `components/WalletButton.tsx`:

```tsx
"use client";

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletModalButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';

export default function WalletButton() {
  const { publicKey, connected } = useWallet();

  if (connected && publicKey) {
    return (
      <WalletDisconnectButton className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
        {publicKey.toString().slice(0, 6)}...{publicKey.toString().slice(-4)}
      </WalletDisconnectButton>
    );
  }

  return (
    <WalletModalButton className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
      Connect Wallet
    </WalletModalButton>
  );
}
```

## 5. Integrate into Pages

Replace placeholder wallet connection logic:

**Before (Current):**
```tsx
const handleConnectWallet = () => {
  // TODO: Integrate Solana wallet adapter
  setWalletConnected(true);
  setWalletAddress("8xF...3f2Q");
};
```

**After (With Adapter):**
```tsx
import { useWallet } from '@solana/wallet-adapter-react';

export default function PageName() {
  const { publicKey, connected, signTransaction } = useWallet();

  // publicKey: Public key of connected wallet
  // connected: Boolean indicating connection status
  // signTransaction: Function to sign transactions

  return (
    <div>
      {/* Page content */}
    </div>
  );
}
```

## API Integration Examples

### 1. Deposit to Pool

```tsx
async function depositToPool(pool: string, amount: number) {
  const { publicKey, signTransaction } = useWallet();

  if (!connected || !publicKey) {
    alert("Please connect wallet");
    return;
  }

  // Create transaction instruction
  const instruction = createDepositInstruction({
    pool: pool,
    user: publicKey,
    amount: amount * 1e9, // Convert to smallest unit
  });

  const transaction = new Transaction().add(instruction);

  // Sign transaction
  const signed = await signTransaction(transaction);

  // Send to backend
  const response = await fetch('/api/pools/deposit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      transaction: signed.serialize(),
      pool: pool,
      wallet: publicKey.toString(),
    }),
  });

  return response.json();
}
```

### 2. Create Order

```tsx
async function createOrder(params: OrderParams) {
  const { publicKey, signTransaction } = useWallet();

  if (!connected || !publicKey) {
    alert("Please connect wallet");
    return;
  }

  const instruction = createOrderInstruction({
    pool: params.pool,
    user: publicKey,
    offerAmount: params.offerAmount,
    wantAmount: params.wantAmount,
    wantMint: params.wantMint,
  });

  const transaction = new Transaction().add(instruction);

  // Handle x402 payment if required
  const signed = await signTransaction(transaction);

  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      transaction: signed.serialize(),
      wallet: publicKey.toString(),
      ...params,
    }),
  });

  return response.json();
}
```

### 3. Airdrop Claim

```tsx
async function claimAirdrop() {
  const { publicKey, signTransaction } = useWallet();

  if (!connected || !publicKey) {
    alert("Please connect wallet");
    return;
  }

  // Create claim transaction
  const instruction = createClaimInstruction({
    user: publicKey,
  });

  const transaction = new Transaction().add(instruction);

  const signed = await signTransaction(transaction);

  const response = await fetch('/api/airdrop/claim', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      transaction: signed.serialize(),
      wallet: publicKey.toString(),
    }),
  });

  return response.json();
}
```

## Network Configuration

### Development (Devnet)
```tsx
const network = clusterApiUrl('devnet');
```

### Production (Mainnet)
```tsx
const network = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl('mainnet-beta');
```

## Error Handling

### Wallet Not Found
```tsx
const { wallet } = useWallet();

if (!wallet?.adapter) {
  alert("No wallet found. Please install Phantom or Solflare.");
  window.open("https://phantom.app/", "_blank");
  return;
}
```

### Transaction Failed
```tsx
try {
  const result = await executeTransaction();
  console.log("Transaction successful:", result);
} catch (error) {
  console.error("Transaction failed:", error);
  alert("Transaction failed. Please try again.");
}
```

### Connection Lost
```tsx
useEffect(() => {
  if (!connected && walletConnected) {
    // Handle disconnection
    alert("Wallet disconnected. Please reconnect.");
  }
}, [connected]);
```

## Styling the Wallet Button

```css
/* Customize wallet adapter modal */
.wallet-adapter-button {
  background: linear-gradient(135deg, #0284c7, #0369a1);
  border: none;
  border-radius: 0.5rem;
  color: white;
  padding: 0.5rem 1rem;
  font-weight: 600;
  transition: all 0.2s;
}

.wallet-adapter-button:hover {
  background: linear-gradient(135deg, #0369a1, #0c4a6e);
  transform: translateY(-1px);
}

.wallet-adapter-button:active {
  transform: translateY(0);
}
```

## Testing Wallet Integration

### Test on Devnet

1. Get test SOL from [Solana Faucet](https://faucet.solana.com/)
2. Switch Phantom to Devnet
3. Connect wallet
4. Test transactions

### Mock Wallet for Testing

```tsx
const mockWallet = {
  publicKey: new PublicKey("test_wallet_address"),
  signTransaction: async (tx: Transaction) => tx,
  connected: true,
};

// For testing without real wallet
```

## Security Best Practices

1. **Never** store private keys in the frontend
2. **Always** validate transactions before signing
3. **Use** HTTPS in production
4. **Verify** wallet connection status before transactions
5. **Implement** transaction timeout handling

## Deployment Checklist

- [ ] Wallet adapter packages installed
- [ ] Wallet context created
- [ ] Root layout wrapped in WalletProvider
- [ ] All pages updated to use real wallet
- [ ] Error handling implemented
- [ ] Network configuration set (devnet vs mainnet)
- [ ] Tested on devnet
- [ ] Tested on multiple browsers
- [ ] Mobile wallet tested

## Troubleshooting

### Wallet Not Connecting
- Check if wallet is installed
- Verify network matches (devnet/mainnet)
- Clear browser cache
- Check console for errors

### Transactions Failing
- Verify sufficient balance
- Check network status
- Validate instruction parameters
- Review backend logs

### Modal Not Showing
- Ensure WalletModalProvider is in layout
- Check z-index conflicts
- Verify CSS styling

---

**Status:** Guide complete. Integration ready when backend API is live.
