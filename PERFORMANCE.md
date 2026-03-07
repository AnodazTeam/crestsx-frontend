# Performance Optimization Guide for CrestsX Frontend

## Overview

Performance is critical for a DEX interface. Users expect fast load times and responsive interactions, especially during high-frequency trading.

## Performance Goals

- **First Contentful Paint (FCP):** < 1.5s
- **Time to Interactive (TTI):** < 3.5s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **First Input Delay (FID):** < 100ms

## Image Optimization

### Use Next.js Image Component

```tsx
import Image from 'next/image';

// ❌ BAD - Using regular img tag
<img src="/logo.png" alt="Logo" width={200} height={200} />

// ✅ GOOD - Using Next.js Image
<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={200}
  priority // For above-the-fold images
/>
```

### Optimize Token Icons

```tsx
function TokenIcon({ symbol }: { symbol: string }) {
  return (
    <Image
      src={`/tokens/${symbol.toLowerCase()}.png`}
      alt={`${symbol} token`}
      width={32}
      height={32}
      loading="lazy" // Lazy load below the fold
    />
  );
}
```

### Image CDN Configuration

```tsx
// next.config.ts
const nextConfig = {
  images: {
    domains: ['crestsx.com', 'storage.googleapis.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
};
```

## Code Splitting

### Dynamic Imports for Heavy Components

```tsx
import dynamic from 'next/dynamic';

// ❌ BAD - All code loaded upfront
import { HeavyChart } from '@/components/HeavyChart';

export default function Page() {
  return <HeavyChart />;
}

// ✅ GOOD - Load on demand
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false, // Disable SSR for client-only components
});

export default function Page() {
  return <HeavyChart />;
}
```

### Lazy Load Libraries

```tsx
// Trade page components only load when needed
const TradeForm = dynamic(() => import('@/components/trade/TradeForm'));
const Orderbook = dynamic(() => import('@/components/trade/Orderbook'));
const TradeHistory = dynamic(() => import('@/components/trade/TradeHistory'));
```

## Bundle Size Optimization

### Analyze Bundle Size

```bash
# Install analyzer
npm install @next/bundle-analyzer

# Add to next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // ... config
};

module.exports = withBundleAnalyzer(nextConfig);
```

### Analyze Bundle

```bash
ANALYZE=true npm run build
```

### Tree Shaking

```tsx
// ❌ BAD - Import entire library
import _ from 'lodash';

// ✅ GOOD - Import only what you need
import debounce from 'lodash/debounce';
import { formatPrice } from '@/lib/format';
```

### Use Lightweight Alternatives

```tsx
// ❌ BAD - Large library
import moment from 'moment'; // 67 KB

// ✅ GOOD - Native API or lightweight
import { format } from 'date-fns'; // 2 KB
// or use native Date methods
```

## Caching Strategy

### API Response Caching

```tsx
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

### React Query for Data Fetching

```tsx
import { useQuery } from '@tanstack/react-query';

function PoolData() {
  const { data, isLoading } = useQuery({
    queryKey: ['pools'],
    queryFn: fetchPools,
    staleTime: 30000, // 30 seconds
    cacheTime: 300000, // 5 minutes
  });

  if (isLoading) return <PoolSkeleton />;
  return <PoolList pools={data} />;
}
```

### Memoization

```tsx
import { useMemo, memo } from 'react';

// Memoize expensive calculations
function Orderbook({ orders }: { orders: Order[] }) {
  const sortedOrders = useMemo(() => {
    return orders.sort((a, b) => a.price - b.price);
  }, [orders]);

  return <div>{/* render sortedOrders */}</div>;
}

// Memoize entire component
export default memo(Orderbook);
```

## Rendering Optimization

### Virtualization for Long Lists

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

function OrderList({ orders }: { orders: Order[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: orders.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // Estimated row height
  });

  return (
    <div ref={parentRef} className="h-96 overflow-auto">
      {virtualizer.getVirtualItems().map((item) => (
        <Order key={item.key} order={orders[item.index]} />
      ))}
    </div>
  );
}
```

### Debounce User Input

```tsx
import { useState, useEffect } from 'react';
import { debounce } from 'lodash/debounce';

function TradeForm() {
  const [amount, setAmount] = useState('');

  // Debounce API calls
  const debouncedFetch = useMemo(
    () => debounce((value) => {
      fetchPriceEstimation(value);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedFetch(amount);
  }, [amount, debouncedFetch]);

  return <input value={amount} onChange={(e) => setAmount(e.target.value)} />;
}
```

### Throttle Scroll Events

```tsx
import { throttle } from 'lodash/throttle';

useEffect(() => {
  const handleScroll = throttle(() => {
    // Expensive scroll operation
    updatePosition();
  }, 100);

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

## Network Optimization

### WebSocket Connection Management

```tsx
// lib/websocket.ts
class WebSocketManager {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect(url: string) {
    this.ws = new WebSocket(url);

    this.ws.onclose = () => {
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        setTimeout(() => {
          this.reconnectAttempts++;
          this.connect(url);
        }, Math.pow(2, this.reconnectAttempts) * 1000); // Exponential backoff
      }
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}
```

### Parallel Requests

```tsx
// ❌ BAD - Sequential requests
const poolA = await fetchPool('A');
const poolB = await fetchPool('B');
const poolC = await fetchPool('C');

// ✅ GOOD - Parallel requests
const [poolA, poolB, poolC] = await Promise.all([
  fetchPool('A'),
  fetchPool('B'),
  fetchPool('C'),
]);
```

### Request Cancellation

```tsx
import { useEffect, useRef } from 'react';

function Search({ query }: { query: string }) {
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Cancel previous request
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();

    fetchResults(query, controllerRef.current.signal);
  }, [query]);
}
```

## Font Optimization

### Use Next.js Font

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Show fallback immediately
  preload: true,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

### Subset Custom Fonts

```bash
# Subset fonts to only include characters used
pyftsubset myfont.ttf --text-file=characters.txt --output-file=myfont-subset.ttf
```

## Service Worker for Offline Support

```tsx
// public/sw.js
const CACHE_NAME = 'crestsx-v1';
const urlsToCache = [
  '/',
  '/trade',
  '/pools',
  '/dashboard',
  '/api/pools',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

### Register Service Worker

```tsx
// app/layout.tsx
useEffect(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
}, []);
```

## Monitoring & Analytics

### Web Vitals Tracking

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### Custom Performance Metrics

```tsx
// lib/performance.ts
export function measureRender(componentName: string) {
  const start = performance.now();

  return {
    end: () => {
      const duration = performance.now() - start;
      console.log(`${componentName} rendered in ${duration.toFixed(2)}ms`);
      // Send to analytics
      sendToAnalytics('render_time', { component: componentName, duration });
    },
  };
}

// Usage
function MyComponent() {
  const measure = measureRender('MyComponent');

  useEffect(() => {
    measure.end();
  });

  return <div>{/* ... */}</div>;
}
```

## Lighthouse Audit Checklist

### Before Deploying

Run Lighthouse and aim for:
- [ ] Performance score > 90
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] SEO score > 90

### Common Issues to Fix

1. **Unused JavaScript**
   - Remove unused dependencies
   - Implement code splitting
   - Use tree shaking

2. **Render-blocking Resources**
   - Preload critical CSS
   - Inline critical CSS
   - Defer non-critical scripts

3. **Large Images**
   - Use WebP/AVIF format
   - Implement responsive images
   - Lazy load below the fold

4. **Unused CSS**
   - Purge unused Tailwind classes
   - Remove unused stylesheets

## Production Checklist

- [ ] Enable production mode (`NODE_ENV=production`)
- [ ] Minify JavaScript and CSS
- [ ] Enable gzip compression
- [ ] Implement CDN for static assets
- [ ] Configure cache headers
- [ ] Enable HTTP/2 or HTTP/3
- [ ] Optimize database queries
- [ ] Monitor performance metrics
- [ ] Set up performance alerts

## Tools

### Performance Monitoring
- Lighthouse (Chrome DevTools)
- WebPageTest
- PageSpeed Insights
- Vercel Analytics

### Bundle Analysis
- @next/bundle-analyzer
- webpack-bundle-analyzer

### Profiling
- Chrome DevTools Performance tab
- React DevTools Profiler
- why-did-you-render

---

**Status:** Performance optimization guide documented. Implement incrementally based on monitoring data.
