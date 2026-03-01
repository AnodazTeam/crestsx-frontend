"use client";

import Link from "next/link";
import { useState } from "react";

export default function Trade() {
  const [fromToken, setFromToken] = useState("SOL");
  const [toToken, setToToken] = useState("CRX");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  const swapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

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
              <Link href="/trade" className="text-primary-600 font-semibold">
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

      {/* Trade Interface */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Swap Tokens
          </h1>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            {/* From Token */}
            <div className="mb-2">
              <label className="text-sm text-gray-500 mb-2 block">You pay</label>
              <div className="border border-gray-300 rounded-xl p-4 bg-gray-50">
                <input
                  type="text"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-transparent text-3xl font-semibold outline-none"
                  aria-label="Amount to swap from"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-500 text-sm">Balance: 0.00</span>
                  <button className="flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-lg hover:bg-primary-200 transition">
                    <span className="font-semibold">{fromToken}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="relative my-4">
              <button
                onClick={swapTokens}
                className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-primary-200 rounded-full p-2 hover:border-primary-400 transition"
                aria-label="Swap tokens"
              >
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
            </div>

            {/* To Token */}
            <div className="mb-6">
              <label className="text-sm text-gray-500 mb-2 block">You receive</label>
              <div className="border border-gray-300 rounded-xl p-4 bg-gray-50">
                <input
                  type="text"
                  value={toAmount}
                  onChange={(e) => setToAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-transparent text-3xl font-semibold outline-none"
                  aria-label="Amount to receive"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-500 text-sm">Balance: 0.00</span>
                  <button className="flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-lg hover:bg-primary-200 transition">
                    <span className="font-semibold">{toToken}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Price and Fee Info */}
            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Rate</span>
                <span>1 {fromToken} = 1.00 {toToken}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Price Impact</span>
                <span>&lt;0.01%</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Trading Fee</span>
                <span>0.25%</span>
              </div>
            </div>

            {/* Swap Button */}
            <button
              disabled={!fromAmount || !toAmount}
              className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-primary-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed mt-6"
            >
              {fromAmount && toAmount ? "Swap" : "Enter an amount"}
            </button>
          </div>

          {/* Advanced Settings */}
          <div className="mt-4 text-center">
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              ⚙️ Advanced Settings
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
