# CrestsX Frontend Documentation Index

Welcome to the CrestsX Frontend documentation hub. This document provides quick navigation to all guides and resources.

## Quick Start

### New to the Project?
1. Start with [README.md](README.md) - Project overview and setup
2. Follow [DEPLOYMENT.md](DEPLOYMENT.md) - How to deploy
3. Review [COMPONENTS.md](COMPONENTS.md) - Reusable components

### Integrating Features?
1. [INTEGRATION.md](INTEGRATION.md) - API and backend integration
2. [WALLET_INTEGRATION.md](WALLET_INTEGRATION.md) - Solana wallet setup
3. [AIRDROP_INTEGRATION.md](AIRDROP_INTEGRATION.md) - Campaign integration

### Improving Performance?
1. [PERFORMANCE.md](PERFORMANCE.md) - Optimization guide
2. [MONITORING.md](MONITORING.md) - Error tracking and debugging
3. [TEST_PLAN.md](TEST_PLAN.md) - Testing procedures

## Documentation Files

### Core Documentation

| File | Description | Audience |
|------|-------------|----------|
| [README.md](README.md) | Project overview, tech stack, getting started | Everyone |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Vercel deployment guide, environment setup | DevOps, Frontend |
| [INTEGRATION.md](INTEGRATION.md) | API endpoints, x402 payments, WebSocket | Frontend, Backend |
| [TEST_PLAN.md](TEST_PLAN.md) | Testing checklist, E2E scenarios | QA, Frontend |

### Development Guides

| File | Description | Audience |
|------|-------------|----------|
| [COMPONENTS.md](COMPONENTS.md) | Reusable components, utilities, patterns | Frontend |
| [WALLET_INTEGRATION.md](WALLET_INTEGRATION.md) | Solana wallet setup, code examples | Frontend |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Branch naming, commit style, PR guidelines | Contributors |
| [SECURITY.md](SECURITY.md) | Security best practices, guidelines | Frontend, Security |

### Advanced Guides

| File | Description | Audience |
|------|-------------|----------|
| [PERFORMANCE.md](PERFORMANCE.md) | Optimization, caching, bundle analysis | Frontend, DevOps |
| [MONITORING.md](MONITORING.md) | Error tracking, analytics, debugging | Frontend, DevOps |
| [AIRDROP_INTEGRATION.md](AIRDROP_INTEGRATION.md) | Campaign launch, API requirements | Marketing, Frontend |

### Project Management

| File | Description | Audience |
|------|-------------|----------|
| [ROADMAP.md](ROADMAP.md) | 7-phase roadmap, future features | PM, Team |
| [CHANGELOG.md](CHANGELOG.md) | Version history, release notes | PM, Team |
| [FAQ.md](FAQ.md) | User-facing frequently asked questions | Support, Users |

## Project Structure

```
crestsx-frontend/
├── app/                      # Next.js App Router pages
│   ├── airdrop/             # Airdrop pages (landing, check, claim, profile)
│   ├── dashboard/            # Portfolio and activity
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   ├── pools/               # Pool management
│   └── trade/               # Trading interface
├── public/                   # Static assets
├── .env.example              # Environment variables template
├── .github/                  # GitHub configuration
│   └── ISSUE_TEMPLATE/       # Issue templates
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
├── vercel.json              # Vercel deployment config
└── docs/                    # All documentation files (this file and others)
```

## Quick Reference

### Environment Variables

```env
# Backend API
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000/stream

# Solana
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com

# Features
NEXT_PUBLIC_X402_ENABLED=true
NEXT_PUBLIC_ENABLE_AIRDROP=true
NEXT_PUBLIC_ENABLE_REFERRALS=true
```

### Key Commands

```bash
# Development
npm run dev              # Start dev server

# Building
npm run build            # Build for production
npm start                # Start production server

# Quality
npm run lint             # Run ESLint
```

### Pages Overview

| Page | Path | Purpose | Status |
|------|------|---------|--------|
| Landing | `/` | Homepage with hero and features | ✅ Complete |
| Trade | `/trade` | Token swap interface | ✅ Complete |
| Pools | `/pools` | Liquidity pool management | ✅ Complete |
| Dashboard | `/dashboard` | Portfolio and activity tracking | ✅ Complete |
| Airdrop | `/airdrop` | Airdrop campaign landing | ✅ Complete |
| Check Eligibility | `/airdrop/check` | Check airdrop eligibility | ✅ Complete |
| Claim Airdrop | `/airdrop/claim` | Claim airdrop rewards | ✅ Complete |
| Airdrop Profile | `/airdrop/profile` | Airdrop stats and referral | ✅ Complete |

## Workflows

### Starting Development

1. Clone repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local`
4. Start dev server: `npm run dev`
5. Open http://localhost:3000

### Adding a New Feature

1. Create feature branch: `git checkout -b feature/my-feature`
2. Follow [CONTRIBUTING.md](CONTRIBUTING.md) guidelines
3. Implement feature using components from [COMPONENTS.md](COMPONENTS.md)
4. Test locally
5. Commit with conventional commits
6. Push and create pull request

### Deploying to Production

1. Review [DEPLOYMENT.md](DEPLOYMENT.md) checklist
2. Set environment variables in Vercel
3. Deploy: `vercel --prod`
4. Run [TEST_PLAN.md](TEST_PLAN.md) post-deployment checks
5. Monitor using [MONITORING.md](MONITORING.md) tools

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check [TEST_PLAN.md](TEST_PLAN.md) |
| Slow performance | Review [PERFORMANCE.md](PERFORMANCE.md) |
| Errors in production | Check [MONITORING.md](MONITORING.md) |
| Security concerns | Review [SECURITY.md](SECURITY.md) |
| Integration issues | Check [INTEGRATION.md](INTEGRATION.md) |

## Getting Help

### Documentation Search
If you're not sure where to look:

- **Deployment:** DEPLOYMENT.md
- **API:** INTEGRATION.md
- **Wallet:** WALLET_INTEGRATION.md
- **Components:** COMPONENTS.md
- **Testing:** TEST_PLAN.md
- **Security:** SECURITY.md
- **Performance:** PERFORMANCE.md
- **Monitoring:** MONITORING.md
- **Contributing:** CONTRIBUTING.md
- **Roadmap:** ROADMAP.md
- **Changelog:** CHANGELOG.md
- **FAQ:** FAQ.md

### Support Channels

- **GitHub Issues:** Report bugs, request features
- **Discord:** Community support and discussions
- **Email:** support@crestsx.com for urgent issues

### Useful Links

- [Repository](https://github.com/AnodazTeam/crestsx-frontend)
- [Vercel Deployment](https://vercel.com/new)
- [Solana Docs](https://docs.solana.com/)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)

## Version Information

- **Current Version:** 0.1.0
- **Next Version:** 0.2.0 (Backend Integration)
- **Last Updated:** 2026-03-08

See [CHANGELOG.md](CHANGELOG.md) for version history and [ROADMAP.md](ROADMAP.md) for future plans.

## Documentation Standards

All documentation follows these principles:
- Clear, concise language
- Code examples with explanations
- Step-by-step instructions
- Troubleshooting sections
- Cross-references to related docs

---

**Need help finding something?** Check the table of contents above or search this repository.

**Want to improve docs?** Submit a PR following [CONTRIBUTING.md](CONTRIBUTING.md) guidelines.
