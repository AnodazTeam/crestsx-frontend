"use client";

import Link from "next/link";
import { useState } from "react";

export default function AirdropCheck() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [eligibility, setEligibility] = useState<null | {
    eligible: boolean;
    points: number;
    tier: string;
    allocation: string;
  }>(null);
  const [loading, setLoading] = useState(false);

  const handleConnectWallet = () => {
    // TODO: Integrate Solana wallet adapter
    setWalletConnected(true);
    setWalletAddress("8xF...3f2Q");
  };

  const handleCheckEligibility = async () => {
    setLoading(true);
    // TODO: Call Backend API: GET /api/airdrop/eligibility?wallet={walletAddress}
    // Mock data for now
    setTimeout(() => {
      setEligibility({
        eligible: true,
        points: 350,
        tier: "Agent Developers",
        allocation: "3,750 CRX"
      });
      setLoading(false);
    }, 1500);
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
                {walletConnected ? walletAddress.slice(0, 6) + "..." : "Connect Wallet"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Link href="/airdrop" className="text-primary-600 hover:text-primary-700 flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Airdrop
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-6">Check Your Eligibility</h1>

          {!walletConnected && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">👛</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Connect Your Wallet
              </h2>
              <p className="text-gray-600 mb-6">
                Connect your Solana wallet to check if you're eligible for the CRX airdrop.
              </p>
              <button
                onClick={handleConnectWallet}
                className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition"
              >
                Connect Solana Wallet
              </button>
            </div>
          )}

          {walletConnected && !eligibility && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Connected Wallet</div>
                  <div className="font-semibold text-gray-900">{walletAddress}</div>
                </div>
                <button
                  onClick={() => setWalletConnected(false)}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Disconnect
                </button>
              </div>

              <button
                onClick={handleCheckEligibility}
                disabled={loading}
                className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? "Checking..." : "Check Eligibility"}
              </button>
            </div>
          )}

          {eligibility && (
            <div className="space-y-6">
              {eligibility.eligible ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
                  <div className="text-5xl mb-4">🎉</div>
                  <h2 className="text-3xl font-bold text-green-800 mb-2">
                    You're Eligible!
                  </h2>
                  <p className="text-green-700 text-lg">
                    Congratulations! You've qualified for the CRX airdrop.
                  </p>
                </div>
              ) : (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
                  <div className="text-5xl mb-4">😔</div>
                  <h2 className="text-3xl font-bold text-red-800 mb-2">
                    Not Eligible Yet
                  </h2>
                  <p className="text-red-700 text-lg">
                    You don't meet the minimum requirements. Keep participating to earn points!
                  </p>
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Your Airdrop Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Total Points</span>
                    <span className="text-2xl font-bold text-primary-600">
                      {eligibility.points.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Your Tier</span>
                    <span className="text-xl font-semibold text-gray-900">
                      {eligibility.tier}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Allocation</span>
                    <span className="text-2xl font-bold text-green-600">
                      {eligibility.allocation}
                    </span>
                  </div>
                </div>
              </div>

              {eligibility.eligible && (
                <div className="flex space-x-4">
                  <Link href="/airdrop/profile" className="flex-1">
                    <button className="w-full bg-gray-100 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-200 transition">
                      View Profile
                    </button>
                  </Link>
                  <Link href="/airdrop/claim" className="flex-1">
                    <button className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 transition">
                      Claim Airdrop
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
