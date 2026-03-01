"use client";

import { useState } from "react";

type Pool = {
  name: string;
  tokenA: string;
  tokenB: string;
  tvl: string;
  volume24h: string;
  apy: string;
};

const pools: Pool[] = [
  { name: "SOL/USDC", tokenA: "SOL", tokenB: "USDC", tvl: "$1.2M", volume24h: "$450K", apy: "12.5%" },
  { name: "SOL/USDT", tokenA: "SOL", tokenB: "USDT", tvl: "$890K", volume24h: "$320K", apy: "10.2%" },
  { name: "BTC/USDC", tokenA: "BTC", tokenB: "USDC", tvl: "$2.1M", volume24h: "$780K", apy: "8.7%" },
  { name: "ETH/USDC", tokenA: "ETH", tokenB: "USDC", tvl: "$1.5M", volume24h: "$560K", apy: "9.3%" },
  { name: "SOL/ETH", tokenA: "SOL", tokenB: "ETH", tvl: "$650K", volume24h: "$210K", apy: "15.2%" },
];

export default function Pools() {
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [depositAmount, setDepositAmount] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Pool List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Liquidity Pools</h1>
            <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-medium rounded-lg transition-colors">
              + Create Pool
            </button>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left p-4 text-slate-400 font-medium">Pool</th>
                  <th className="text-right p-4 text-slate-400 font-medium">TVL</th>
                  <th className="text-right p-4 text-slate-400 font-medium">24h Volume</th>
                  <th className="text-right p-4 text-slate-400 font-medium">APY</th>
                  <th className="text-right p-4 text-slate-400 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {pools.map((pool, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedPool(pool)}
                    className={`border-b border-slate-800/50 cursor-pointer hover:bg-slate-800/30 transition-colors ${
                      selectedPool?.name === pool.name ? "bg-slate-800/50" : ""
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          <span className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-sm">
                            {pool.tokenA[0]}
                          </span>
                          <span className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm">
                            {pool.tokenB[0]}
                          </span>
                        </div>
                        <span className="font-medium">{pool.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">{pool.tvl}</td>
                    <td className="p-4 text-right">{pool.volume24h}</td>
                    <td className="p-4 text-right text-green-400">{pool.apy}</td>
                    <td className="p-4 text-right">
                      <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                        Add Liquidity
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pool Details / Add Liquidity */}
        <div>
          {selectedPool ? (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Add Liquidity</h2>
              <p className="text-slate-400 text-sm mb-6">
                Add liquidity to {selectedPool.name} to earn trading fees.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-slate-400 text-sm block mb-2">
                    {selectedPool.tokenA} Amount
                  </label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-sm block mb-2">
                    {selectedPool.tokenB} Amount
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Share of Pool</span>
                    <span>--%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Estimated APY</span>
                    <span className="text-green-400">{selectedPool.apy}</span>
                  </div>
                </div>

                <button className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-colors mt-4">
                  Add Liquidity
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Select a Pool</h3>
              <p className="text-slate-400 text-sm">
                Choose a pool from the list to add liquidity.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Your Positions */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Your Positions</h2>
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center">
          <p className="text-slate-400">No active positions</p>
          <p className="text-slate-500 text-sm mt-1">
            Add liquidity to start earning
          </p>
        </div>
      </div>
    </div>
  );
}
