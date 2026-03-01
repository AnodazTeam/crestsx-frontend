"use client";

import { useState } from "react";

type Position = {
  pair: string;
  side: "long" | "short";
  size: string;
  entryPrice: string;
  markPrice: string;
  pnl: string;
  pnlPercent: string;
};

const positions: Position[] = [
  { pair: "SOL/USDC", side: "long", size: "100", entryPrice: "95.50", markPrice: "98.50", pnl: "+300", pnlPercent: "+3.14%" },
  { pair: "BTC/USDC", side: "short", size: "0.5", entryPrice: "45000", markPrice: "44500", pnl: "+250", pnlPercent: "+1.11%" },
];

type Order = {
  id: string;
  pair: string;
  type: "limit" | "market";
  side: "buy" | "sell";
  price: string;
  amount: string;
  status: "open" | "filled" | "cancelled";
};

const orders: Order[] = [
  { id: "1", pair: "SOL/USDC", type: "limit", side: "buy", price: "95.00", amount: "50", status: "open" },
  { id: "2", pair: "ETH/USDC", type: "market", side: "buy", price: "2800", amount: "10", status: "filled" },
  { id: "3", pair: "SOL/USDC", type: "limit", side: "sell", price: "105.00", amount: "25", status: "cancelled" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"positions" | "orders" | "history">("positions");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-400 text-sm mb-1">Total Balance</div>
          <div className="text-2xl font-bold">$0.00</div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-400 text-sm mb-1">Available</div>
          <div className="text-2xl font-bold">$0.00</div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-400 text-sm mb-1">In Orders</div>
          <div className="text-2xl font-bold">$0.00</div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-400 text-sm mb-1">Unrealized PnL</div>
          <div className="text-2xl font-bold text-green-400">+$550</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["positions", "orders", "history"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab
                ? "bg-cyan-500 text-slate-900"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
        {activeTab === "positions" && (
          <>
            {positions.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left p-4 text-slate-400 font-medium">Pair</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Side</th>
                    <th className="text-right p-4 text-slate-400 font-medium">Size</th>
                    <th className="text-right p-4 text-slate-400 font-medium">Entry</th>
                    <th className="text-right p-4 text-slate-400 font-medium">Mark</th>
                    <th className="text-right p-4 text-slate-400 font-medium">PnL</th>
                    <th className="text-right p-4 text-slate-400 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {positions.map((pos, i) => (
                    <tr key={i} className="border-b border-slate-800/50">
                      <td className="p-4 font-medium">{pos.pair}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            pos.side === "long"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {pos.side.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 text-right">{pos.size}</td>
                      <td className="p-4 text-right">${pos.entryPrice}</td>
                      <td className="p-4 text-right">${pos.markPrice}</td>
                      <td className="p-4 text-right">
                        <span className="text-green-400">{pos.pnl}</span>
                        <span className="text-green-400/60 ml-1">({pos.pnlPercent})</span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                          Close
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center text-slate-400">
                No open positions
              </div>
            )}
          </>
        )}

        {activeTab === "orders" && (
          <>
            {orders.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left p-4 text-slate-400 font-medium">Pair</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Type</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Side</th>
                    <th className="text-right p-4 text-slate-400 font-medium">Price</th>
                    <th className="text-right p-4 text-slate-400 font-medium">Amount</th>
                    <th className="text-right p-4 text-slate-400 font-medium">Status</th>
                    <th className="text-right p-4 text-slate-400 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-slate-800/50">
                      <td className="p-4 font-medium">{order.pair}</td>
                      <td className="p-4 text-slate-400">{order.type}</td>
                      <td className="p-4">
                        <span
                          className={`${
                            order.side === "buy" ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {order.side.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {order.type === "market" ? "Market" : `$${order.price}`}
                      </td>
                      <td className="p-4 text-right">{order.amount}</td>
                      <td className="p-4 text-right">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            order.status === "open"
                              ? "bg-cyan-500/20 text-cyan-400"
                              : order.status === "filled"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-slate-700 text-slate-400"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {order.status === "open" && (
                          <button className="text-red-400 hover:text-red-300 text-sm font-medium">
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center text-slate-400">No orders</div>
            )}
          </>
        )}

        {activeTab === "history" && (
          <div className="p-8 text-center text-slate-400">
            No trading history yet
          </div>
        )}
      </div>

      {/* Agent Wallet Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Agent Wallet</h2>
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400">Wallet Address</span>
            <button className="text-cyan-400 hover:text-cyan-300 text-sm">
              Copy Address
            </button>
          </div>
          <div className="bg-slate-800 px-4 py-3 rounded-lg font-mono text-sm mb-6">
            0x0000...0000
          </div>

          <h3 className="font-medium mb-3">Token Balances</h3>
          <div className="space-y-3">
            {[
              { symbol: "SOL", balance: "0.00", value: "$0.00" },
              { symbol: "USDC", balance: "0.00", value: "$0.00" },
              { symbol: "USDT", balance: "0.00", value: "$0.00" },
              { symbol: "CRES", balance: "0.00", value: "$0.00" },
            ].map((token) => (
              <div
                key={token.symbol}
                className="flex justify-between items-center py-2 border-b border-slate-800/50 last:border-0"
              >
                <span className="font-medium">{token.symbol}</span>
                <div className="text-right">
                  <div>{token.balance}</div>
                  <div className="text-slate-500 text-sm">{token.value}</div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-3 border border-slate-700 hover:border-slate-600 text-slate-300 rounded-lg transition-colors">
            Deposit Tokens
          </button>
        </div>
      </div>
    </div>
  );
}
