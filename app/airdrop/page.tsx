"use client";

import Link from "next/link";

export default function Airdrop() {
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
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4">
            <span className="bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-semibold">
              ✨ Exclusive Launch Reward
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Claim Your
            <span className="text-primary-600"> CRX Airdrop</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Early adopters earn CRX tokens based on their participation. Check your eligibility,
            view your points, and claim your rewards before the vesting period begins.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/airdrop/check">
              <button className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition shadow-lg">
                Check Eligibility
              </button>
            </Link>
            <Link href="/airdrop/profile">
              <button className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-50 transition">
                View Your Profile
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Airdrop Info Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How Airdrop Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Check Eligibility</h3>
              <p className="text-gray-600">
                Connect your wallet and check if you qualify for the airdrop based on
                your activities across the ecosystem.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Earn Points</h3>
              <p className="text-gray-600">
                Participate in activities like trading, liquidity provision, and community engagement
                to earn more points and increase your tier.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Claim Rewards</h3>
              <p className="text-gray-600">
                Claim your CRX tokens when eligible. 25% unlocks at TGE with the
                remaining vesting linearly over 3 months.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tier Allocation */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Tier Allocations (Phase 1)
          </h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Tier</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Points Required</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Allocation</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tier: "Alpha Testers", points: "1000+", crx: "1.25M CRX", share: "5%" },
                  { tier: "Community Builders", points: "500-999", crx: "2.5M CRX", share: "10%" },
                  { tier: "Agent Developers", points: "200-499", crx: "3.75M CRX", share: "15%" },
                  { tier: "Solana Users", points: "50-199", crx: "5M CRX", share: "20%" },
                  { tier: "Early LPs", points: "10-49", crx: "12.5M CRX", share: "50%" },
                ].map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{row.tier}</td>
                    <td className="px-6 py-4 text-gray-600">{row.points}</td>
                    <td className="px-6 py-4 text-right text-gray-900">
                      <div className="font-semibold">{row.crx}</div>
                      <div className="text-sm text-gray-500">{row.share}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-gray-600 mt-6">
            Total Phase 1 Allocation: <span className="font-bold">25M CRX</span>
          </p>
        </div>
      </section>

      {/* Vesting Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Vesting Schedule
          </h2>
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 text-center">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">25%</div>
                <div className="text-lg text-gray-700 mb-4">at TGE</div>
                <p className="text-gray-600 text-sm">
                  Unlocks immediately when CRX token launches on mainnet
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">75%</div>
                <div className="text-lg text-gray-700 mb-4">3-month vesting</div>
                <p className="text-gray-600 text-sm">
                  Linear vesting over 90 days after TGE
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-primary-200">
              <p className="text-gray-700">
                <strong>Note:</strong> Claimed tokens will be staked in the time-locked staking pool.
                You can unstake at any time after the vesting period completes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Claim Your CRX?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Connect your wallet to check your eligibility and view your airdrop allocation.
          </p>
          <Link href="/airdrop/check">
            <button className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition shadow-lg">
              Start Now
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
