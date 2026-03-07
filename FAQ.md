# FAQ for CrestsX Frontend

## Frequently Asked Questions

### General Questions

#### What is CrestsX?
CrestsX is a decentralized exchange (DEX) for AI agents on the Solana blockchain. It enables agents to trade, swap, and earn through liquidity pools and airdrop programs.

#### How do I connect my wallet?
Click the "Connect Wallet" button in the top navigation. You can use Phantom, Solflare, Backpack, or Glow wallet. Make sure your wallet is set to the correct network (devnet or mainnet).

#### What wallets are supported?
We support:
- Phantom (recommended)
- Solflare
- Backpack
- Glow

#### What network should I use?
- **Devnet** - For testing with fake tokens
- **Mainnet** - For real transactions with real assets

## Trading

#### How do I swap tokens?
1. Go to the Trade page
2. Connect your wallet
3. Select the token you want to swap from
4. Select the token you want to swap to
5. Enter the amount
6. Click "Swap" and confirm the transaction

#### What are maker and taker fees?
- **Maker fee:** 0.1% - You provide liquidity to the orderbook
- **Taker fee:** 0.2% - You take an existing order from the orderbook

#### What is slippage?
Slippage is the difference between the expected price and the executed price. We recommend setting slippage tolerance to 0.5% - 1% to ensure your trade executes.

#### What is price impact?
Price impact is how your trade affects the pool price. Larger trades have higher price impact. Split large trades into smaller ones to reduce impact.

#### Why did my transaction fail?
Common reasons:
- Insufficient balance for trade + fees
- Slippage tolerance too low
- Network congestion
- Expired order (for limit orders)

Check the error message for specific details and try again.

## Pools

#### What is a liquidity pool?
A liquidity pool is a smart contract that holds tokens to enable trading. Liquidity providers earn fees from trades.

#### How do I add liquidity?
1. Go to the Pools page
2. Select the pool you want to add liquidity to
3. Enter the amount of each token
4. Click "Deposit"
5. Confirm the transaction

#### How do I remove liquidity?
1. Go to the Pools page
2. Click on your position in the pool
3. Enter the amount to withdraw
4. Click "Withdraw"
5. Confirm the transaction

#### What fees do I earn?
Liquidity providers earn 0.2% of all trades that use the pool. Fees are distributed proportionally to all LPs.

#### Can I lose money providing liquidity?
Yes, through **impermanent loss**. When token prices change, the value of your liquidity can be less than if you had just held the tokens.

## Airdrop

#### How do I participate in the airdrop?
1. Go to the Airdrop page
2. Connect your wallet
3. Check your eligibility
4. If eligible, claim your tokens

#### What are the airdrop tiers?
There are multiple tiers based on your activity and contributions:
- **Agent Developers** - Highest tier
- **Early Adopters** - High tier
- **Community Members** - Medium tier
- **New Users** - Base tier

#### How do referrals work?
Share your referral code to invite others. You earn:
- 10% of trading fees from referred users (lifetime)
- Additional airdrop allocation for successful referrals
- Referred users get 5% discount on trading fees

#### When can I claim my airdrop?
You can claim once the airdrop campaign is active and you're eligible. Check the Airdrop page for campaign status.

#### Why am I not eligible?
Common reasons:
- Wallet is new (no activity)
- Didn't complete required actions
- Already claimed from another wallet
- Not in eligible geographic region

## Technical

#### Why is the page blank?
- Clear your browser cache and reload
- Disable browser extensions that might block JavaScript
- Try a different browser (Chrome, Firefox, Safari)
- Check your internet connection

#### Why are transactions slow?
Solana transactions are usually fast (< 1 second). Slow transactions may be due to:
- Network congestion
- Low network priority
- Fee too low

#### What if my transaction is stuck?
Transactions can get stuck if:
- Gas/fees are too low
- Network is congested
- Validator is down

Wait 1-2 minutes. If still stuck, the transaction will expire and you can try again.

#### How do I check transaction status?
1. Copy the transaction signature from your wallet
2. Go to Solscan: https://solscan.io/
3. Paste the signature to view transaction details

#### What is x402 payment?
x402 is an AI agent payment protocol. When you perform certain actions, you may need to pay a small fee to execute the action. Your wallet will prompt you to sign this payment.

## Security

#### Is my private key safe?
Yes. We never see your private key. All transactions are signed in your wallet. We only receive the signed transaction.

#### What if I lose my wallet?
We cannot recover your wallet. Always backup your:
- Seed phrase (12-24 words)
- Private key
- Store them in a secure, offline location

#### What is phishing?
Phishing is when attackers create fake websites to steal your wallet. Always verify:
- URL is `exchange.crestsx.com`
- Browser extension is legitimate (Phantom, Solflare)
- Never enter your seed phrase on any website

#### What if I suspect fraud?
1. Immediately disconnect your wallet
2. Check your transaction history
3. Report to security@crestsx.com
4. Contact your wallet provider

## Troubleshooting

#### "Transaction Failed" error
- Check your balance
- Verify network (devnet vs mainnet)
- Increase slippage tolerance
- Try again with a smaller amount

#### "Wallet Not Connected"
- Refresh the page
- Disconnect and reconnect wallet
- Clear browser cache
- Try a different browser

#### "Insufficient Liquidity"
- No orders available in the orderbook
- Try a different trading pair
- Wait for more liquidity to be added

#### "Invalid Wallet Address"
- Double-check the address
- Ensure you're copying from your wallet
- Addresses are case-sensitive

## Account

#### Can I use multiple wallets?
Yes, you can use any wallet address. Each wallet is treated independently for balances, positions, and airdrop eligibility.

#### How do I export my transaction history?
Transaction history is available on the Dashboard page. You can also view all transactions on Solscan using your wallet address.

#### Can I change my connected wallet?
Click your wallet address in the top navigation, then click "Disconnect". Connect with a different wallet.

## Development

#### How can I contribute?
See our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. We welcome:
- Bug fixes
- New features
- Documentation improvements
- UI/UX enhancements

#### How do I report a bug?
Use our GitHub issue templates:
- [Bug Report](https://github.com/AnodazTeam/crestsx-frontend/issues/new?template=bug_report.md)
- [Feature Request](https://github.com/AnodazTeam/crestsx-frontend/issues/new?template=feature_request.md)

#### Where is the source code?
https://github.com/AnodazTeam/crestsx-frontend

#### What technologies are used?
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Solana Web3.js

## Support

#### How do I get help?
- **Documentation:** Read our guides (DEPLOYMENT.md, INTEGRATION.md, etc.)
- **GitHub Issues:** Report bugs or request features
- **Discord:** Join our community
- **Email:** support@crestsx.com

#### What information should I provide when reporting an issue?
- Your wallet address (first 6 and last 4 characters)
- Transaction signature (if applicable)
- Screenshots of the error
- Browser and version
- Steps to reproduce

---

**Still have questions?** Join our community or contact support.
