# CrestsX Frontend Deployment Guide

## Prerequisites

Before deploying, ensure:
- ✅ Backend API is live and accessible
- ✅ Domain `exchange.crestsx.com` is configured
- ✅ Environment variables are set in Vercel

## Vercel Deployment

### 1. Connect Repository

```bash
# Via Vercel CLI (optional)
vercel login
vercel link
```

Or connect via Vercel Dashboard:
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import from GitHub: `AnodazTeam/crestsx-frontend`
3. Select framework: Next.js

### 2. Configure Environment Variables

In Vercel Project Settings > Environment Variables:

```env
# Backend API
NEXT_PUBLIC_API_BASE_URL=https://api.crestsx.com
NEXT_PUBLIC_WS_URL=wss://api.crestsx.com/stream

# Solana
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# x402 Payments
NEXT_PUBLIC_X402_ENABLED=true
NEXT_PUBLIC_PAYMENT_TOKEN=USDC

# Application
NEXT_PUBLIC_APP_NAME=CrestsX
NEXT_PUBLIC_APP_URL=https://exchange.crestsx.com

# Feature Flags
NEXT_PUBLIC_ENABLE_AIRDROP=true
NEXT_PUBLIC_ENABLE_REFERRALS=true
```

### 3. Custom Domain

1. Go to Project Settings > Domains
2. Add domain: `exchange.crestsx.com`
3. Configure DNS:
   ```
   CNAME exchange.crestsx.com cname.vercel-dns.com
   ```

### 4. Deploy

```bash
# Via CLI
vercel --prod

# Or via GitHub push (automatic deployment)
git push origin main
```

## Pre-Deployment Checklist

- [ ] `.env.example` exists and is up-to-date
- [ ] All pages build without errors
- [ ] No console errors in dev mode
- [ ] API endpoints are documented in .env.example
- [ ] Vercel.json configuration is correct
- [ ] README.md has deployment instructions
- [ ] License file exists
- [ ] No hardcoded secrets in code
- [ ] Responsive design tested on mobile/tablet
- [ ] Accessibility check (ARIA labels present)

## Post-Deployment Verification

1. **URL Access:** Visit `https://exchange.crestsx.com`
2. **Page Load:** Check all 8 pages load correctly
3. **API Connection:** Verify browser can reach backend
4. **Console:** Check for no errors in DevTools
5. **Mobile Test:** Test on mobile viewport
6. **Lighthouse:** Run Lighthouse audit

## Monitoring

### Vercel Analytics (Built-in)
- Page views
- Core Web Vitals
- Performance metrics

### Optional: Add Sentry

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

Set environment variable:
```env
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

## Rollback

If deployment fails:

```bash
# Via CLI
vercel rollback [deployment-url]

# Or via Vercel Dashboard:
# Deployments > Click deployment > Redeploy
```

## Troubleshooting

### Build Fails
- Check Next.js version compatibility
- Verify TypeScript types: `npm run build -- --debug`
- Check environment variables are properly prefixed with `NEXT_PUBLIC_`

### API Connection Issues
- Verify CORS is configured on backend
- Check if API URL is correct and accessible
- Test with curl: `curl https://api.crestsx.com/healthz`

### Domain Not Resolving
- Wait up to 24 hours for DNS propagation
- Verify CNAME record in DNS provider
- Check Vercel domain settings

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- GitHub Issues: https://github.com/AnodazTeam/crestsx-frontend/issues
