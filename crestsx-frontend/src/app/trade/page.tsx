"use client";

import { useState } from "react";

type Token = {
  symbol: string;
  name: string;
  balance: string;
  icon: string;
};

const tokens: Token[] = [
  { symbol: "SOL", name: "Solana", balance: "0.00", icon: "⬡" },
  { symbol: "USDC", name: "USD Coin", balance: "0.00", icon: "⬢" },
  { symbol: "USDT", name: "Tether", balance: "0.00", icon: "◈" },
  { symbol: "BTC", name: "Bitcoin", balance: "0.00", icon: "₿" },
  { symbol: "ETH", name: "Ethereum", balance: "0.00", icon: "Ξ" },
];

export default function Trade() {
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [orderType, setOrderType] = useState<"limit" | "market">("limit");

  const handleSwap = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Trade Card */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Trade</h1>
              <div className="flex bg-slate-800 rounded-lg p-1">
                <button
                  onClick={() => setOrderType("limit")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    orderType === "limit"
                      ? "bg-slate-700 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Limit
                </button>
                <button
                  onClick={() => setOrderType("market")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    orderType === "market"
                      ? "bg-slate-700 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Market
                </button>
              </div>
            </div>

            {/* From */}
            <div className="bg-slate-800/50 rounded-xl p-4 mb-2">
              <div className="flex justify-between mb-2">
                <span className="text-slate-400 text-sm">From</span>
                <span className="text-slate-400 text-sm">
                  Balance: {fromToken.balance}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.00"
                  className="bg-transparent text-3xl font-semibold outline-none w-full placeholder-slate-600"
                />
                <select
                  value={fromToken.symbol}
                  onChange={(e) =>
                    setFromToken(tokens.find((t) => t.symbol === e.target.value)!)
                  }
                  className="bg-slate-700 px-3 py-2 rounded-lg font-medium"
                >
                  {tokens.map((token) => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-2 relative z-10">
              <button
                onClick={handleSwap}
                className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
              </button>
            </div>

            {/* To */}
            <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-slate-400 text-sm">To</span>
                <span className="text-slate-400 text-sm">
                  Balance: {toToken.balance}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={toAmount}
                  onChange={(e) => setToAmount(e.target.value)}
                  placeholder="0.00"
                  className="bg-transparent text-3xl font-semibold outline-none w-full placeholder-slate-600"
                />
                <select
                  value={toToken.symbol}
                  onChange={(e) =>
                    setToToken(tokens.find((t) => t.symbol === e.target.value)!)
                  }
                  className="bg-slate-700 px-3 py-2 rounded-lg font-medium"
                >
                  {tokens.map((token) => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rate & Fees */}
            <div className="flex justify-between text-sm text-slate-400 mb-6">
              <span>Rate: 1 {fromToken.symbol} = -- {toToken.symbol}</span>
              <span>Fee: 0.2%</span>
            </div>

            {/* Submit */}
            <button className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-colors">
              {fromAmount ? "Place Order" : "Enter Amount"}
            </button>
          </div>
        </div>

        {/* Order Book */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Order Book</h2>
          
          {/* Asks */}
          <div className="mb-4">
            <div className="text-xs text-slate-500 mb-2">Asks</div>
            <div className="space-y-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-red-400">
                    {(98 + i * 0.5).toFixed(2)}
                  </span>
                  <span className="text-slate-400">
                    {(Math.random() * 10).toFixed(4)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Spread */}
          <div className="py-2 border-y border-slate-800 mb-4">
            <div className="text-center text-cyan-400 font-semibold">
              98.50 - 98.75
            </div>
          </div>

          {/* Bids */}
          <div>
            <div className="text-xs text-slate-500 mb-2">Bids</div>
            <div className="space-y-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-green-400">
                    {(97.5 - i * 0.5).toFixed(2)}
                  </span>
                  <span className="text-slate-400">
                    {(Math.random() * 10).toFixed(4)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Trades */}
      <div className="mt-8 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Recent Trades</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-slate-400 text-sm border-b border-slate-800">
                <th className="text-left pb-3">Time</th>
                <th className="text-left pb-3">Pair</th>
                <th className="text-left pb-3">Type</th>
                <th className="text-right pb-3">Price</th>
                <th className="text-right pb-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, i) => (
                <tr key={i} className="text-sm border-b border-slate-800/50">
                  <td className="py-3 text-slate-400">12:3{i}:00</td>
                  <td>SOL/USDC</td>
                  <td className="text-green-400">buy</td>
                  <td className="text-right">98.50</td>
                  <td className="text-right">{(Math.random() * 5).toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
