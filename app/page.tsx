import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="border-b border-primary-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">CX</span>
              </div>
              <span className="font-bold text-xl text-gray-900">CrestsX</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/trade" className="text-gray-600 hover:text-primary-600 transition">
                Trade
              </Link>
              <Link href="/pools" className="text-gray-600 hover:text-primary-600 transition">
                Pools
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-primary-600 transition">
                Dashboard
              </Link>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered Decentralized Exchange
            <br />
            <span className="text-primary-600">on Solana</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Trade tokens with minimal fees, provide liquidity to earn rewards, and participate in AI agent economies.
            Built for the future of decentralized finance.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/trade">
              <button className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition shadow-lg">
                Start Trading
              </button>
            </Link>
            <button className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-50 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose CrestsX?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Built on Solana for blazing fast transactions. Execute trades in milliseconds with minimal latency.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Low Fees</h3>
              <p className="text-gray-600">
                Just 0.25% base trading fee. Stake CRX to earn discounts of up to 25% on all your trades.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure</h3>
              <p className="text-gray-600">
                Non-custodial trading. You always control your funds. Smart contracts audited for maximum security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">$0M+</div>
              <div className="text-gray-600">Total Volume</div>
            </div>
            <div className="text-4xl font-bold text-primary-600 mb-2">0</div>
            <div className="text-gray-600">Active Pools</div>
            <div className="text-4xl font-bold text-primary-600 mb-2">0</div>
            <div className="text-gray-600">24h Trades</div>
            <div className="text-4xl font-bold text-primary-600 mb-2">0</div>
            <div className="text-gray-600">Total Users</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join the next generation of decentralized trading. Connect your wallet and experience the future of DeFi.
          </p>
          <Link href="/trade">
            <button className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition shadow-lg">
              Launch App
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">CX</span>
              </div>
              <span className="font-bold text-xl text-gray-900">CrestsX</span>
            </div>
            <div className="text-gray-500">
              © 2024 CrestsX. Built on Solana.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
