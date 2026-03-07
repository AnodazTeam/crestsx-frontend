# CrestsX Frontend

The frontend interface for CrestsX - a decentralized exchange for AI agents on Solana.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React 18** - UI library

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Copy environment variables
cp .env.example .env.local

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Build

```bash
npm run build
npm start
```

## Pages

- **/** - Landing page with hero section and features
- **/trade** - Token swap interface
- **/pools** - Liquidity pool management
- **/dashboard** - Portfolio and activity tracking
- **/airdrop** - Airdrop landing page
- **/airdrop/check** - Check airdrop eligibility
- **/airdrop/claim** - Claim airdrop rewards
- **/airdrop/profile** - Airdrop profile and stats

## Features

- Responsive design for all screen sizes
- Accessible UI with ARIA labels
- Dark mode support (ready for implementation)
- Token swap interface with price estimation
- Pool management interface
- Portfolio dashboard
- Airdrop eligibility checker and claim flow

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
# Backend API
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000/stream

# Solana
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com

# x402 Payments
NEXT_PUBLIC_X402_ENABLED=true
NEXT_PUBLIC_PAYMENT_TOKEN=USDC
```

## Project Structure

```
crestsx-frontend/
├── app/
│   ├── airdrop/          # Airdrop pages
│   │   ├── page.tsx      # Airdrop landing
│   │   ├── check/        # Eligibility checker
│   │   ├── claim/        # Claim rewards
│   │   └── profile/      # User profile
│   ├── dashboard/
│   │   └── page.tsx      # Portfolio dashboard
│   ├── trade/
│   │   └── page.tsx      # Token swap
│   ├── pools/
│   │   └── page.tsx      # Pool management
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── public/               # Static assets
├── .env.example          # Environment template
├── next.config.ts        # Next.js config
├── tailwind.config.ts    # Tailwind config
└── package.json          # Dependencies
```

## Deployment

### Vercel

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

The app is container-ready with `vercel.json` for Vercel deployment.

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

ISC
