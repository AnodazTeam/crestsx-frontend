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

## Features

- Responsive design for all screen sizes
- Accessible UI with ARIA labels
- Dark mode support (ready for implementation)
- Token swap interface with price estimation
- Pool management interface
- Portfolio dashboard

## Project Structure

```
crestsx-frontend/
├── app/
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Landing page
│   ├── trade/
│   │   └── page.tsx      # Trade page
│   ├── pools/
│   │   └── page.tsx      # Pools page
│   └── dashboard/
│       └── page.tsx      # Dashboard page
├── public/               # Static assets
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

ISC
