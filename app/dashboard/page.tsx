"use client";

import Link from "next/link";

interface Position {
  pool: string;
  tokens: string[];
  lpTokens: string;
  value: string;
  share: string;
}

interface Holding {
  token: string;
  balance: string;
  value: string;
}

const mockPositions: Position[] = [];
const mockHoldings: Holding[] = [
  { token: "SOL", balance: "0.00", value: "$0.00" },
  { token: "CRX", balance: "0.00", value: "$0.00" },
];

export default function Dashboard() {
  const totalPortfolioValue = mockHoldings.reduce((sum, h) => sum + parseFloat(h.value.replace("$", "") || "0"), 0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="border-b border-primary-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">CX</span>
                </div>
                <span className="font-bold text-xl text-gray-900">CrestsX</span>
              </div>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/trade" className="text-gray-600 hover:text-primary-600 transition">
                Trade
              </Link>
              <Link href="/pools" className="text-gray-600 hover:text-primary-600 transition">
                Pools
              </Link>
              <Link href="/dashboard" className="text-primary-600 font-semibold">
                Dashboard
              </Link>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage your portfolio and track your trading activity</p>
          </div>

          {/* Portfolio Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-2">Total Portfolio Value</div>
              <div className="text-2xl font-bold text-gray-900">${totalPortfolioValue.toFixed(2)}</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-2">24h Profit/Loss</div>
              <div className="text-2xl font-bold text-gray-900">$0.00</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-2">Active Positions</div>
              <div className="text-2xl font-bold text-gray-900">{mockPositions.length}</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-2">Total Trades</div>
              <div className="text-2xl font-bold text-gray-900">0</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Token Holdings */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Token Holdings</h2>
              </div>
              <div className="p-6">
                {mockHoldings.length > 0 ? (
                  <div className="space-y-4">
                    {mockHoldings.map((holding, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full"></div>
                          <div>
                            <div className="font-semibold text-gray-900">{holding.token}</div>
                            <div className="text-sm text-gray-500">{holding.balance}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{holding.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-4xl mb-4">🪙</div>
                    <p>No tokens yet. Connect your wallet to see your holdings.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Liquidity Positions */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Liquidity Positions</h2>
              </div>
              <div className="p-6">
                {mockPositions.length > 0 ? (
                  <div className="space-y-4">
                    {mockPositions.map((position, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div className="flex items-center space-x-3">
                          <div className="flex -space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full border-2 border-white"></div>
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full border-2 border-white"></div>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{position.pool}</div>
                            <div className="text-sm text-gray-500">{position.lpTokens} LP tokens</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{position.value}</div>
                          <div className="text-sm text-gray-500">{position.share} share</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-4xl mb-4">💧</div>
                    <p>No liquidity positions. Add liquidity to start earning.</p>
                    <Link href="/pools">
                      <button className="mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition">
                        Explore Pools
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-4">📊</div>
                  <p>No recent activity. Start trading to see your history here.</p>
                  <Link href="/trade">
                    <button className="mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition">
                      Start Trading
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
