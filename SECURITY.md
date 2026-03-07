# Security Guidelines for CrestsX Frontend

## Overview

CrestsX is a decentralized exchange handling real transactions. Security is critical for protecting users' assets and maintaining trust.

## Security Principles

1. **Never** store private keys in the frontend
2. **Always** validate transactions before signing
3. **Never** expose sensitive data in logs
4. **Always** use HTTPS in production
5. **Validate** all user inputs
6. **Implement** proper error handling
7. **Keep** dependencies updated

## Private Key Security

### ❌ NEVER Do This

```tsx
// NEVER store private keys
const privateKey = "abc123..."; // Don't do this!
localStorage.setItem('privateKey', privateKey); // Don't do this!

// NEVER expose in logs
console.log('Private key:', privateKey); // Don't do this!
```

### ✅ ALWAYS Do This

```tsx
// Use wallet adapter for signing
const { signTransaction, publicKey } = useWallet();

const signedTx = await signTransaction(transaction);
// Wallet adapter handles private key securely
```

## Transaction Validation

### Verify Before Signing

```tsx
async function validateAndSign(transaction: Transaction) {
  // 1. Verify recipient address
  const recipient = transaction.instructions[0].keys.find(
    k => k.isWritable
  )?.pubkey;

  if (!isValidAddress(recipient)) {
    throw new Error("Invalid recipient address");
  }

  // 2. Verify amount
  const amount = extractAmount(transaction);
  if (amount > MAX_AMOUNT) {
    throw new Error("Amount exceeds limit");
  }

  // 3. Show user details
  const confirmed = await showConfirmation({
    recipient: recipient.toString(),
    amount: formatAmount(amount),
    fee: calculateFee(transaction),
  });

  if (!confirmed) {
    throw new Error("User cancelled");
  }

  // 4. Sign with wallet adapter
  return await signTransaction(transaction);
}
```

### Confirmation Dialog

```tsx
function TransactionConfirm({ transaction, onConfirm, onCancel }) {
  const amount = extractAmount(transaction);
  const fee = calculateFee(transaction);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-md">
        <h2 className="text-xl font-bold mb-4">Confirm Transaction</h2>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Amount:</span>
            <span className="font-semibold">{formatAmount(amount)}</span>
          </div>
          <div className="flex justify-between">
            <span>Fee:</span>
            <span className="font-semibold">{formatAmount(fee)}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span>Total:</span>
            <span className="font-bold">{formatAmount(amount + fee)}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
```

## Input Validation

### Validate Wallet Addresses

```tsx
function isValidSolanaAddress(address: string): boolean {
  try {
    const pubkey = new PublicKey(address);
    return PublicKey.isOnCurve(pubkey);
  } catch {
    return false;
  }
}

// Usage
if (!isValidSolanaAddress(walletAddress)) {
  throw new Error("Invalid wallet address");
}
```

### Validate Amounts

```tsx
function validateAmount(amount: string, decimals: number = 9): number {
  // Check if it's a valid number
  const num = parseFloat(amount);
  if (isNaN(num)) {
    throw new Error("Invalid amount");
  }

  // Check if positive
  if (num <= 0) {
    throw new Error("Amount must be positive");
  }

  // Check decimal places
  if (amount.split('.')[1]?.length > decimals) {
    throw new Error(`Maximum ${decimals} decimal places`);
  }

  // Check maximum amount
  if (num > MAX_AMOUNT) {
    throw new Error("Amount exceeds maximum");
  }

  return num;
}
```

### Sanitize User Inputs

```tsx
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets (XSS prevention)
    .slice(0, MAX_LENGTH); // Limit length
}
```

## Environment Variables

### Required Variables

```env
# .env.local (Never commit this file!)
NEXT_PUBLIC_API_BASE_URL=https://api.crestsx.com
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_APP_URL=https://exchange.crestsx.com

# NEVER include secrets here!
# API keys, passwords, etc. should be server-side only
```

### .env.example (Safe to Commit)

```env
# Environment template
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000/stream
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_X402_ENABLED=true
NEXT_PUBLIC_PAYMENT_TOKEN=USDC
```

## HTTPS Enforcement

### Force HTTPS in Production

```tsx
// app/layout.tsx
useEffect(() => {
  if (process.env.NODE_ENV === 'production' && window.location.protocol === 'http:') {
    window.location.href = window.location.href.replace('http:', 'https:');
  }
}, []);
```

### Secure Cookies

```tsx
// If using cookies
document.cookie = `session=${token}; Secure; HttpOnly; SameSite=Strict`;
```

## Error Handling

### Never Expose Stack Traces

```tsx
// ❌ BAD
catch (error) {
  alert(`Error: ${error.stack}`); // Exposes internal details
}

// ✅ GOOD
catch (error) {
  console.error('Transaction failed:', error);
  alert('Transaction failed. Please try again.'); // User-friendly
}
```

### Handle Network Errors Gracefully

```tsx
async function apiCall(endpoint: string) {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      // Network error
      return { error: 'Network error. Please check connection.' };
    }
    // Other errors
    return { error: 'Something went wrong. Please try again.' };
  }
}
```

## Content Security Policy (CSP)

### Next.js Configuration

```tsx
// next.config.ts
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://api.crestsx.com wss://api.crestsx.com;
`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

## Dependency Security

### Regular Updates

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update dependencies
npm update
```

### Use Fixed Versions

```json
{
  "dependencies": {
    "react": "^18.3.0", // Don't use caret (^) for security-critical
    "solana-web3.js": "1.95.3" // Use exact version
  }
}
```

## Rate Limiting

### Implement on Client

```tsx
const RATE_LIMIT = {
  requests: 10,
  window: 60000, // 1 minute
};

class RateLimiter {
  private requests: number[] = [];

  check(): boolean {
    const now = Date.now();
    // Remove old requests
    this.requests = this.requests.filter(
      time => now - time < RATE_LIMIT.window
    );

    if (this.requests.length >= RATE_LIMIT.requests) {
      return false;
    }

    this.requests.push(now);
    return true;
  }
}

const rateLimiter = new RateLimiter();

// Usage
if (!rateLimiter.check()) {
  alert('Too many requests. Please wait.');
  return;
}
```

## Phishing Protection

### Verify Domain

```tsx
// Check if user is on official domain
const OFFICIAL_DOMAINS = [
  'exchange.crestsx.com',
  'crestsx.com',
];

function isOfficialDomain(): boolean {
  return OFFICIAL_DOMAINS.includes(window.location.hostname);
}

useEffect(() => {
  if (process.env.NODE_ENV === 'production' && !isOfficialDomain()) {
    alert('Warning: You may be on a phishing site!');
  }
}, []);
```

### Warn About Unofficial Links

```tsx
function ExternalLink({ href, children }) {
  const handleClick = (e) => {
    if (!OFFICIAL_DOMAINS.some(d => href.includes(d))) {
      const confirmed = confirm(
        'You are leaving CrestsX. Continue to external site?'
      );
      if (!confirmed) {
        e.preventDefault();
      }
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
```

## Log Security

### Never Log Sensitive Data

```tsx
// ❌ BAD
console.log('Transaction:', transaction);
console.log('Private key:', privateKey);

// ✅ GOOD
console.log('Transaction type:', transaction.type);
console.log('Signing transaction...');
```

### Use Structured Logging

```tsx
const logger = {
  info: (message: string, meta?: object) => {
    if (process.env.NODE_ENV === 'development') {
      console.info(`[INFO] ${message}`, meta);
    }
  },
  error: (message: string, error?: Error) => {
    // Remove stack trace in production
    const safeError = error ? { message: error.message } : undefined;
    console.error(`[ERROR] ${message}`, safeError);
  },
};
```

## Security Checklist

### Before Deployment
- [ ] No sensitive data in environment variables (.env.local not committed)
- [ ] All private keys removed from code
- [ ] Transaction validation implemented
- [ ] Input validation on all forms
- [ ] HTTPS enforced in production
- [ ] CSP headers configured
- [ ] Error messages don't expose internals
- [ ] Dependencies updated and audited
- [ ] Rate limiting implemented
- [ ] Phishing protection in place
- [ ] No console.log with sensitive data

### Post-Deployment
- [ ] Monitor for security vulnerabilities
- [ ] Regular dependency updates
- [ ] Security audit performed
- [ ] Penetration testing conducted
- [ ] Bug bounty program active

## Incident Response

### Report Security Issues

If you discover a security vulnerability:

1. **Do NOT** disclose publicly
2. Email: security@crestsx.com
3. Include details of the vulnerability
4. Allow 90 days to fix before disclosure

### Security Incident Steps

1. Identify scope of the issue
2. Determine if user funds are at risk
3. If yes, pause trading immediately
4. Notify team and stakeholders
5. Implement fix
6. Test thoroughly
7. Deploy with monitoring
8. Communicate to users

## Additional Resources

- [Solana Security Best Practices](https://docs.solana.com/developing/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)
- [npm audit](https://docs.npmjs.com/cli/v6/commands/npm-audit)

---

**Status:** Security guidelines documented. Follow these principles for all development.
