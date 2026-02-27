"use client";

import Link from "next/link";
import { useState } from "react";

interface VestingMonth {
  month: number;
  percentage: number;
  amount: string;
  unlocked: boolean;
}

export default function AirdropClaim() {
  const [claimed, setClaimed] = useState(false);

  // Mock data - TODO: Fetch from Backend API: GET /api/airdrop/profile
  const allocation = "3,750 CRX";
  const totalAllocation = 3750;
  const tgeUnlock = totalAllocation * 0.25; // 25% at TGE
  const remainingVesting = totalAllocation - tgeUnlock; // 75% over 3 months

  const vestingSchedule: VestingMonth[] = [
    { month: 0, percentage: 25, amount: "937.5 CRX", unlocked: true }, // TGE
    { month: 1, percentage: 25 + 25, amount: "937.5 CRX", unlocked: false },
    { month: 2, percentage: 25 + 50, amount: "937.5 CRX", unlocked: false },
    { month: 3, percentage: 100, amount: "937.5 CRX", unlocked: false }, // Final unlock
  ];

  const handleClaim = () => {
    // TODO: Call Backend API: POST /api/airdrop/claim
    setClaimed(true);
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

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Claim Your Airdrop</h1>

          {/* Claim Status Card */}
          {claimed ? (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center mb-8">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-3xl font-bold text-green-800 mb-2">
                Claim Successful!
              </h2>
              <p className="text-green-700 text-lg mb-6">
                Your CRX tokens have been claimed and are now staking. You can view them in your dashboard.
              </p>
              <Link href="/dashboard">
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                  Go to Dashboard
                </button>
              </Link>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-primary-50 to-blue-50 border-2 border-primary-200 rounded-2xl p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Your Total Allocation</div>
                  <div className="text-4xl font-bold text-gray-900">{allocation}</div>
                </div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                  <span className="text-3xl">💎</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Available Now (TGE)</div>
                    <div className="text-2xl font-bold text-green-600">
                      {tgeUnlock.toLocaleString()} CRX
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Vesting (3 months)</div>
                    <div className="text-2xl font-bold text-primary-600">
                      {remainingVesting.toLocaleString()} CRX
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vesting Schedule */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Vesting Schedule
            </h3>

            {/* Timeline */}
            <div className="relative mb-8">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              <div className="space-y-6">
                {vestingSchedule.map((month, index) => (
                  <div key={index} className="relative flex items-start space-x-4 pl-10">
                    <div
                      className={`absolute left-2 w-5 h-5 rounded-full border-2 ${
                        month.unlocked
                          ? "bg-green-500 border-green-500"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      {month.unlocked && (
                        <svg className="w-3 h-3 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {month.month === 0 ? "TGE (Launch)" : `Month ${month.month}`}
                          </div>
                          <div className="text-sm text-gray-500">
                            {month.percentage}% unlocked
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary-600">{month.amount}</div>
                          {month.unlocked && (
                            <span className="text-xs text-green-600">Available</span>
                          )}
                          {!month.unlocked && (
                            <span className="text-xs text-gray-400">Locked</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vesting Info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">ℹ️</span>
                <div className="text-sm text-yellow-800">
                  <strong>Note:</strong> Claimed tokens will be staked in the time-locked
                  staking pool with a 3-month vesting period. You can unstake tokens as they unlock.
                  No early withdrawal is possible before vesting completes.
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          {!claimed && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Ready to Claim?
              </h3>
              <p className="text-gray-600 mb-6">
                By claiming, your tokens will be staked with a 3-month vesting schedule.
                25% will be available immediately at TGE.
              </p>
              <button
                onClick={handleClaim}
                className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition"
              >
                Claim {tgeUnlock.toLocaleString()} CRX Now
              </button>
              <p className="text-center text-sm text-gray-500 mt-4">
                This action cannot be undone. Please review the vesting schedule before claiming.
              </p>
            </div>
          )}

          {/* Back to Profile */}
          {claimed && (
            <div className="text-center">
              <Link href="/airdrop/profile">
                <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                  Back to Profile
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
