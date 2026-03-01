"use client";

import Link from "next/link";
import { useState } from "react";

interface Pool {
  name: string;
  tokens: string[];
  tvl: string;
  apr: string;
  volume24h: string;
}

const mockPools: Pool[] = [
  {
    name: "SOL - CRX",
    tokens: ["SOL", "CRX"],
    tvl: "$0",
    apr: "0%",
    volume24h: "$0",
  },
  {
    name: "USDC - CRX",
    tokens: ["USDC", "CRX"],
    tvl: "$0",
    apr: "0%",
    volume24h: "$0",
  },
];

export default function Pools() {
  const [selectedPool, setSelectedPool] = useState<string | null>(null);

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
              <Link href="/pools" className="text-primary-600 font-semibold">
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

      {/* Pool List */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Liquidity Pools</h1>
            <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition">
              + Create Pool
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Pool</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">TVL</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">24h Volume</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">APR</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600"></th>
                </tr>
              </thead>
              <tbody>
                {mockPools.map((pool, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex -space-x-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full border-2 border-white"></div>
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full border-2 border-white"></div>
                        </div>
                        <span className="font-semibold text-gray-900">{pool.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-900">{pool.tvl}</td>
                    <td className="px-6 py-4 text-right text-gray-900">{pool.volume24h}</td>
                    <td className="px-6 py-4 text-right text-green-600 font-semibold">{pool.apr}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
                {mockPools.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No pools available yet. Create one to get started!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Add Liquidity</h3>
              <p className="text-gray-600 text-sm">
                Deposit tokens to a pool and earn a share of trading fees proportional to your contribution.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Earn Rewards</h3>
              <p className="text-gray-600 text-sm">
                Provide liquidity and earn CRX tokens as rewards. The more you contribute, the more you earn.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Remove Anytime</h3>
              <p className="text-gray-600 text-sm">
                Withdraw your liquidity and rewards at any time. Non-custodial and fully transparent.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
