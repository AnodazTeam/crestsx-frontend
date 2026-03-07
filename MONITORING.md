# Monitoring and Debugging Guide for CrestsX Frontend

## Overview

Effective monitoring and debugging are essential for maintaining a production DEX application. This guide covers tools, strategies, and best practices.

## Error Tracking

### Sentry Integration

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

```tsx
// app/layout.tsx
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html>{children}</html>;
}
```

### Custom Error Logging

```tsx
// lib/logger.ts
export const logger = {
  info: (message: string, context?: object) => {
    console.info(`[INFO] ${message}`, context);
    // Send to monitoring service
    logToService('info', message, context);
  },

  warn: (message: string, context?: object) => {
    console.warn(`[WARN] ${message}`, context);
    logToService('warn', message, context);
  },

  error: (message: string, error?: Error, context?: object) => {
    console.error(`[ERROR] ${message}`, error, context);
    logToService('error', message, {
      error: error?.message,
      stack: error?.stack,
      ...context,
    });
  },
};

function logToService(level: string, message: string, context?: object) {
  // Send to Sentry, Datadog, or custom service
  if (typeof window !== 'undefined') {
    // Client-side logging
  }
}
```

### Error Boundary Component

```tsx
// components/ErrorBoundary.tsx
'use client';

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error('React Error Boundary caught error', error, {
      componentStack: errorInfo.componentStack,
    });

    // Send to error tracking
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(error, {
        contexts: { react: { componentStack: errorInfo.componentStack } },
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
              <p className="text-gray-600 mb-4">
                {this.state.error?.message}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg"
              >
                Reload Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
```

### Global Error Handler

```tsx
// app/layout.tsx
'use client';

import { useEffect } from 'react';

export default function ErrorWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      logger.error('Unhandled Promise Rejection', event.reason);
      event.preventDefault();
    });

    // Global errors
    window.addEventListener('error', (event) => {
      logger.error('Global Error', event.error, {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
      });
    });

    return () => {
      window.removeEventListener('unhandledrejection', () => {});
      window.removeEventListener('error', () => {});
    };
  }, []);

  return <>{children}</>;
}
```

## Performance Monitoring

### Web Vitals Tracking

```tsx
// lib/vitals.ts
export function reportWebVitals(metric: any) {
  // Send to analytics
  if (typeof window !== 'undefined') {
    console.log('[Vital]', metric.name, metric.value);

    // Send to monitoring service
    if ((window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        value: Math.round(
          metric.name === 'CLS' ? metric.value * 1000 : metric.value
        ),
        event_label: metric.id,
        non_interaction: true,
      });
    }
  }
}

// app/layout.tsx
export const reportWebVitals: ReportWebVitals = reportWebVitals;
```

### Custom Metrics

```tsx
// lib/metrics.ts
class MetricsCollector {
  private metrics: Map<string, number[]> = new Map();

  startTimer(name: string) {
    performance.mark(`${name}-start`);
  }

  endTimer(name: string) {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);

    const measure = performance.getEntriesByName(name)[0];
    const duration = measure.duration;

    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(duration);

    // Log if average exceeds threshold
    const avg = this.getAverage(name);
    if (avg > 1000) { // 1 second
      logger.warn(`Slow performance: ${name}`, { avg, duration });
    }

    return duration;
  }

  getAverage(name: string): number {
    const values = this.metrics.get(name);
    if (!values || values.length === 0) return 0;
    const sum = values.reduce((a, b) => a + b, 0);
    return sum / values.length;
  }

  getStats(name: string) {
    const values = this.metrics.get(name) || [];
    const sorted = [...values].sort((a, b) => a - b);
    return {
      min: sorted[0] || 0,
      max: sorted[sorted.length - 1] || 0,
      avg: this.getAverage(name),
      median: sorted[Math.floor(sorted.length / 2)] || 0,
      count: values.length,
    };
  }
}

export const metrics = new MetricsCollector();
```

### Usage

```tsx
function OrderForm() {
  useEffect(() => {
    metrics.startTimer('order-form-render');
    return () => {
      metrics.endTimer('order-form-render');
    };
  });

  const handleSubmit = () => {
    metrics.startTimer('order-submission');
    // Submit order...
    metrics.endTimer('order-submission');
  };

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
```

## API Monitoring

### Request Logger

```tsx
// lib/api-logger.ts
export function createLoggedFetch(baseURL: string) {
  return async function loggedFetch(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const url = `${baseURL}${endpoint}`;
    const startTime = performance.now();

    logger.info(`API Request: ${options.method || 'GET'} ${url}`);

    try {
      const response = await fetch(url, options);

      const duration = performance.now() - startTime;

      // Log response
      if (!response.ok) {
        logger.error(`API Error: ${url}`, undefined, {
          status: response.status,
          statusText: response.statusText,
          duration,
        });
      } else {
        logger.info(`API Success: ${url}`, { duration });
      }

      // Track slow requests
      if (duration > 1000) {
        logger.warn(`Slow API Request: ${url}`, { duration });
      }

      return response;
    } catch (error) {
      const duration = performance.now() - startTime;
      logger.error(`API Failure: ${url}`, error as Error, { duration });
      throw error;
    }
  };
}

// Usage
const apiFetch = createLoggedFetch(process.env.NEXT_PUBLIC_API_BASE_URL!);
const response = await apiFetch('/pools');
```

### WebSocket Monitoring

```tsx
// lib/websocket-monitor.ts
class WebSocketMonitor {
  private ws: WebSocket | null = null;
  private reconnectCount = 0;
  private messageCount = 0;
  private lastMessageTime = Date.now();

  connect(url: string) {
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      logger.info('WebSocket connected', { url });
      this.reconnectCount = 0;
    };

    this.ws.onmessage = (event) => {
      this.messageCount++;
      this.lastMessageTime = Date.now();

      // Alert if no messages for 30 seconds
      setTimeout(() => {
        if (Date.now() - this.lastMessageTime > 30000) {
          logger.warn('WebSocket stale', {
            lastMessage: Date.now() - this.lastMessageTime,
          });
        }
      }, 30000);
    };

    this.ws.onclose = (event) => {
      logger.warn('WebSocket closed', {
        code: event.code,
        reason: event.reason,
        reconnectCount: this.reconnectCount,
      });
    };

    this.ws.onerror = (error) => {
      logger.error('WebSocket error', undefined, {
        message: (error as any).message,
      });
    };
  }

  getStats() {
    return {
      connected: this.ws?.readyState === WebSocket.OPEN,
      reconnectCount: this.reconnectCount,
      messageCount: this.messageCount,
      lastMessageTime: this.lastMessageTime,
    };
  }
}
```

## User Analytics

### Event Tracking

```tsx
// lib/analytics.ts
export const analytics = {
  track: (event: string, properties?: object) => {
    logger.info(`Analytics: ${event}`, properties);

    // Send to analytics service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, properties);
    }
  },

  identify: (userId: string, traits?: object) => {
    logger.info(`User identified: ${userId}`, traits);
    // Send to analytics service
  },

  page: (name: string) => {
    logger.info(`Page view: ${name}`);
    // Track page view
  },
};

// Usage
analytics.track('order_created', {
  token_pair: 'SOL-USDC',
  order_type: 'limit',
  amount: 100,
});

analytics.page('trade');
```

### Funnel Tracking

```tsx
// lib/funnel.ts
const FUNNEL_STEPS = ['landing', 'connect_wallet', 'create_order', 'confirm_order'];

export function trackFunnel(step: string) {
  const stepIndex = FUNNEL_STEPS.indexOf(step);
  if (stepIndex === -1) {
    logger.warn(`Unknown funnel step: ${step}`);
    return;
  }

  // Track current step
  analytics.track('funnel_step', {
    step,
    step_number: stepIndex + 1,
    total_steps: FUNNEL_STEPS.length,
  });

  // Track drop-off from previous step
  if (stepIndex > 0) {
    const previousStep = FUNNEL_STEPS[stepIndex - 1];
    analytics.track('funnel_dropoff', {
      from: previousStep,
      to: step,
    });
  }
}

// Usage
function TradeForm() {
  useEffect(() => {
    trackFunnel('create_order');
  }, []);

  return <form>{/* ... */}</form>;
}
```

## Debugging Tools

### Debug Panel (Development Only)

```tsx
// components/DebugPanel.tsx
'use client';

import { useState, useEffect } from 'react';

export function DebugPanel() {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const [state, setState] = useState({
    localStorage: {},
    sessionStorage: {},
    metrics: {},
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setState({
        localStorage: { ...localStorage },
        sessionStorage: { ...sessionStorage },
        metrics: (window as any).metrics?.getStats(),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 right-0 bg-black text-white p-4 max-w-md max-h-96 overflow-auto text-xs">
      <h3 className="font-bold mb-2">Debug Panel</h3>

      <div className="mb-4">
        <h4 className="font-semibold">Local Storage</h4>
        <pre>{JSON.stringify(state.localStorage, null, 2)}</pre>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold">Session Storage</h4>
        <pre>{JSON.stringify(state.sessionStorage, null, 2)}</pre>
      </div>

      <div>
        <h4 className="font-semibold">Metrics</h4>
        <pre>{JSON.stringify(state.metrics, null, 2)}</pre>
      </div>
    </div>
  );
}
```

### React Query DevTools

```tsx
// app/layout.tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </body>
    </html>
  );
}
```

## Common Issues & Solutions

### Issue: Blank Screen

**Symptoms:** Page renders blank, no content visible

**Debugging:**
1. Check console for errors
2. Verify React is mounting
3. Check for infinite loops
4. Verify API responses

**Solutions:**
- Add error boundaries
- Implement loading states
- Add console logs in key components
- Check for null/undefined values

### Issue: Infinite Re-renders

**Symptoms:** High CPU usage, app freezes

**Debugging:**
```tsx
useEffect(() => {
  console.log('Component rendered');
});
```

**Solutions:**
- Add proper dependencies to useEffect
- Memoize expensive calculations
- Use useCallback for handlers
- Avoid state updates in render

### Issue: Memory Leak

**Symptoms:** Increasing memory usage over time

**Debugging:**
```tsx
// Chrome DevTools > Memory > Take heap snapshot
```

**Solutions:**
- Clean up event listeners
- Clear intervals/timeouts
- Cancel pending requests
- Unsubscribe from observables

### Issue: WebSocket Disconnects

**Symptoms:** Real-time updates stop

**Debugging:**
```tsx
ws.onclose = (event) => {
  console.log('WebSocket closed:', {
    code: event.code,
    reason: event.reason,
  });
};
```

**Solutions:**
- Implement exponential backoff
- Add heartbeat/ping-pong
- Check network connectivity
- Validate token/session

## Production Monitoring Checklist

### Before Launch
- [ ] Error tracking configured (Sentry)
- [ ] Performance monitoring setup (Web Vitals)
- [ ] Analytics tracking implemented
- [ ] API request logging enabled
- [ ] WebSocket monitoring active
- [ ] Log aggregation configured
- [ ] Alerts set up for critical errors
- [ ] Dashboard created for key metrics

### Ongoing
- [ ] Monitor error rates
- [ ] Track performance metrics
- [ ] Review funnel drop-offs
- [ ] Check API response times
- [ ] Monitor WebSocket health
- [ ] Analyze user behavior patterns
- [ ] Review security events

---

**Status:** Monitoring and debugging guide documented. Implement based on production needs.
