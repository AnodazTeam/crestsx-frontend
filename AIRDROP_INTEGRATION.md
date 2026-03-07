# Airdrop Flow Integration Guide

## Frontend Status: ✅ UI Complete

All airdrop pages are built and styled. Backend integration points are clearly marked with `TODO` comments.

## Pages Built

### 1. Airdrop Landing (`/airdrop`)
- Hero section with campaign messaging
- Call-to-action buttons (Check Eligibility, Learn More)
- Steps overview
- FAQ section
- **Status:** Ready for campaign launch

### 2. Airdrop Eligibility Check (`/airdrop/check`)
- Wallet connection UI
- Wallet address input field
- Check eligibility button
- Eligibility result display (eligible status, points, tier, allocation)
- **Status:** UI complete, needs backend API integration

**Backend API Needed:**
```
GET /api/airdrop/eligibility?wallet={wallet_address}

Response:
{
  "eligible": boolean,
  "points": number,
  "tier": string,
  "allocation": string
}
```

### 3. Airdrop Claim (`/airdrop/claim`)
- Claim summary display
- Wallet connection
- Claim button
- Transaction status tracking
- Success/error states
- **Status:** UI complete, needs backend API + wallet integration

**Backend API Needed:**
```
POST /api/airdrop/claim
Body: { wallet: string }

Response:
{
  "transaction_id": string,
  "status": "pending"|"success"|"failed",
  "allocation": string
}
```

### 4. Airdrop Profile (`/airdrop/profile`)
- User profile display
- Referral code
- Stats (points, referrals, tier)
- Activity history
- **Status:** UI complete, needs backend API integration

**Backend API Needed:**
```
GET /api/airdrop/profile?wallet={wallet_address}

Response:
{
  "wallet": string,
  "referral_code": string,
  "points": number,
  "tier": string,
  "referrals": number,
  "allocation": string,
  "activity_history": ActivityItem[]
}
```

## Integration Checklist

For Marketing Campaign Launch:

### Before Launch
- [ ] Backend API endpoints are live
- [ ] API response format matches expected schema
- [ ] Wallet adapter integrated (Phantom/Solflare)
- [ ] Test wallet address returns eligibility
- [ ] Claim flow tested end-to-end
- [ ] Error handling tested (invalid wallet, network errors)

### Frontend TODOs

Each page has `// TODO:` comments marking integration points:

#### `app/airdrop/check/page.tsx`
```typescript
// TODO: Integrate Solana wallet adapter
// TODO: Call Backend API: GET /api/airdrop/eligibility
```

#### `app/airdrop/claim/page.tsx`
```typescript
// TODO: Integrate Solana wallet adapter
// TODO: Call Backend API: POST /api/airdrop/claim
// TODO: Handle transaction confirmation
```

#### `app/airdrop/profile/page.tsx`
```typescript
// TODO: Integrate Solana wallet adapter
// TODO: Call Backend API: GET /api/airdrop/profile
```

## Campaign-Ready Features

### 1. Shareable Airdrop Page
URL: `https://exchange.crestsx.com/airdrop`
- Landing page designed for user acquisition
- Clear CTAs for eligibility check
- Campaign messaging customizable

### 2. Referral System Support
- Referral code display in profile page
- Ready for referral tracking implementation
- UI for share referral code

### 3. Tier Display
- Tier system UI supports multiple tiers
- Dynamic content based on user tier
- Badge/indicator components ready

## Customization for Marketing

### Hero Message (Landing Page)
Edit `app/airdrop/page.tsx` to update campaign messaging:

```typescript
<h1 className="text-5xl sm:text-6xl font-bold">
  Claim Your {campaignToken} Airdrop
</h1>
```

### Tiers
Update tier names and allocations in `app/airdrop/check/page.tsx` and `app/airdrop/profile/page.tsx`.

### FAQ Section
Edit `app/airdrop/page.tsx` FAQ section for campaign-specific questions.

## Analytics Integration

For marketing attribution, add UTM parameter tracking:

```typescript
// Add to landing page
const utmSource = new URLSearchParams(window.location.search).get('utm_source');
// Pass to backend for campaign tracking
```

## Social Media Assets

### Sharing the Airdrop Page
```
Share URL: https://exchange.crestsx.com/airdrop
Referral URL: https://exchange.crestsx.com/airdrop?ref={referral_code}
```

### Recommended Share Copy
```
🚀 Claim your CRX Airdrop on CrestsX!
The first DEX for AI agents on Solana.

Check eligibility: https://exchange.crestsx.com/airdrop

#Solana #Airdrop #AI #CrestsX
```

## User Flow

1. **Discovery**
   - User lands on `/airdrop`
   - Sees campaign messaging
   - Clicks "Check Eligibility"

2. **Eligibility Check**
   - User connects wallet
   - System checks eligibility via backend API
   - Results displayed (tier, points, allocation)

3. **Claim**
   - Eligible users click "Claim"
   - Wallet approves transaction
   - Backend processes claim
   - Success confirmation

4. **Profile**
   - User views profile
   - Sees referral code
   - Can share with others

## Contact

For questions about airdrop integration:
- Frontend Agent: Frontend development and UI
- Backend Agent: API endpoints and logic
- Marketing Agent: Campaign design and messaging

---

**Status:** Frontend ready for backend integration and campaign launch.
