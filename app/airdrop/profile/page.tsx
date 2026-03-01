"use client";

import Link from "next/link";

interface PointSource {
  category: string;
  points: number;
  description: string;
}

export default function AirdropProfile() {
  // Mock data - TODO: Fetch from Backend API: GET /api/airdrop/profile
  const totalPoints = 350;
  const tier = "Agent Developers";
  const allocation = "3,750 CRX";
  const share = "0.015%";

  const pointSources: PointSource[] = [
    { category: "Trading Volume", points: 150, description: "Volume-based trading rewards" },
    { category: "Liquidity Provision", points: 80, description: "LP token holdings" },
    { category: "Staking", points: 60, description: "CRX staking rewards" },
    { category: "Community Engagement", points: 40, description: "Discord, Twitter, referrals" },
    { category: "Early Adopter Bonus", points: 20, description: "Registration before TGE" },
  ];

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
              <Link href="/dashboard" className="text-gray-600 hover:text-primary-600 transition">
                Dashboard
              </Link>
              <Link href="/airdrop" className="text-primary-600 font-semibold">
                Airdrop
              </Link>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
                8xF...3f2Q
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/airdrop" className="text-primary-600 hover:text-primary-700 flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Airdrop
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Airdrop Profile</h1>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-2">Total Points</div>
              <div className="text-4xl font-bold text-primary-600">{totalPoints.toLocaleString()}</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-2">Current Tier</div>
              <div className="text-2xl font-bold text-gray-900">{tier}</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-2">Allocation</div>
              <div className="text-3xl font-bold text-green-600">{allocation}</div>
            </div>
          </div>

          {/* Tier Progress */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Tier Progress
            </h3>
            <div className="space-y-4">
              {[
                { name: "Alpha Testers", minPoints: 1000, current: false },
                { name: "Community Builders", minPoints: 500, current: false },
                { name: "Agent Developers", minPoints: 200, current: true },
                { name: "Solana Users", minPoints: 50, current: false },
                { name: "Early LPs", minPoints: 10, current: false },
              ].map((tier) => (
                <div
                  key={tier.name}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    tier.current ? "bg-primary-50 border-2 border-primary-400" : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      tier.current ? "bg-primary-600 text-white" : "bg-gray-300 text-gray-600"
                    }`}>
                      {tier.current ? "✓" : "○"}
                    </div>
                    <div>
                      <div className={`font-semibold ${tier.current ? "text-primary-700" : "text-gray-700"}`}>
                        {tier.name}
                      </div>
                      <div className="text-sm text-gray-500">{tier.minPoints}+ points</div>
                    </div>
                  </div>
                  {tier.current && (
                    <span className="bg-primary-600 text-white text-sm px-3 py-1 rounded-full">
                      Current
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Point Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Point Breakdown
            </h3>
            <div className="space-y-4">
              {pointSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{source.category}</div>
                    <div className="text-sm text-gray-500">{source.description}</div>
                  </div>
                  <div className="text-2xl font-bold text-primary-600">
                    +{source.points}
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between pt-4 border-t-2 border-primary-200">
                <div className="font-bold text-gray-900">Total Points</div>
                <div className="text-3xl font-bold text-primary-600">{totalPoints.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Allocation Details */}
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Allocation Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-gray-500 mb-1">Tier Allocation</div>
                <div className="text-2xl font-bold text-gray-900">{allocation}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Pool Share</div>
                <div className="text-2xl font-bold text-gray-900">{share}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Link href="/airdrop/check" className="flex-1">
              <button className="w-full bg-gray-100 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-200 transition">
                Recheck Eligibility
              </button>
            </Link>
            <Link href="/airdrop/claim" className="flex-1">
              <button className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 transition">
                Claim Airdrop
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
