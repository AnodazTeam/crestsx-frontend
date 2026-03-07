# CrestsX Frontend Test Plan

## Test Environment

- **Dev URL:** http://localhost:3000
- **Staging URL:** https://staging.crestsx.com
- **Production URL:** https://exchange.crestsx.com

## Manual Testing Checklist

### 1. Page Load & Navigation

- [ ] Landing page loads (< 3 seconds)
- [ ] All navigation links work (Trade, Pools, Dashboard, Airdrop)
- [ ] Logo redirects to home
- [ ] Back/forward browser navigation works
- [ ] Direct URL access works for all pages

### 2. Responsive Design

#### Desktop (1920x1080)
- [ ] Layout displays correctly
- [ ] No horizontal scrolling
- [ ] All elements visible

#### Tablet (768x1024)
- [ ] Navigation menu accessible
- [ ] Trade form usable
- [ ] Pools table scrollable

#### Mobile (375x667)
- [ ] Mobile-friendly navigation
- [ ] Touch targets large enough (min 44px)
- [ ] No horizontal scrolling
- [ ] Stacked layouts work correctly

### 3. Landing Page

- [ ] Hero section displays correctly
- [ ] Feature cards align properly
- [ ] CTA buttons are clickable
- [ ] Gradient backgrounds render

### 4. Trade Page

- [ ] Swap form displays
- [ ] Token dropdowns work
- [ ] Amount inputs accept valid numbers
- [ ] Swap button toggles tokens
- [ ] Price estimation shows (when backend connected)
- [ ] Connect Wallet button present

### 5. Pools Page

- [ ] Pool list displays
- [ ] Pool cards show correct info
- [ ] Deposit/Withdraw buttons present
- [ ] Balance amounts display

### 6. Dashboard Page

- [ ] Portfolio summary displays
- [ ] Position list shows
- [ ] Recent activity visible
- [ ] Charts render (if present)

### 7. Airdrop Pages

#### Airdrop Landing
- [ ] Hero section displays
- [ ] "Check Eligibility" button works
- [ ] Steps are clear

#### Airdrop Check
- [ ] Wallet address input works
- [ ] Check button triggers API call
- [ ] Eligibility status displays
- [ ] Error handling for invalid addresses

#### Airdrop Claim
- [ ] Claim button present
- [ ] Wallet connection works
- [ ] Transaction flow starts
- [ ] Success/error states display

#### Airdrop Profile
- [ ] Profile data displays
- [ ] Referral code visible
- [ ] Stats show correctly

### 8. Dark Mode

- [ ] Toggle works (if implemented)
- [ ] Colors are readable
- [ ] All components adapt
- [ ] No contrast issues

### 9. Accessibility

- [ ] All images have alt text
- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus indicators visible
- [ ] Screen reader friendly
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)

### 10. Browser Compatibility

#### Chrome
- [ ] Latest version works
- [ ] DevTools show no errors

#### Firefox
- [ ] Latest version works
- [ ] Console shows no errors

#### Safari
- [ ] Latest version works
- [ ] Console shows no errors

#### Mobile Safari (iOS)
- [ ] Touch interactions work
- [ ] Performance acceptable

#### Chrome Mobile (Android)
- [ ] Touch interactions work
- [ ] Performance acceptable

## API Integration Tests

### Mock Mode (No Backend)

- [ ] UI displays without errors
- [ ] Loading states show correctly
- [ ] Error states display gracefully

### With Backend Connected

#### Pool API
- [ ] GET /pools/{mint} returns data
- [ ] Pool data displays correctly

#### Order API
- [ ] POST /orders creates order
- [ ] Payment required flow works
- [ ] Order confirmation displays

#### WebSocket
- [ ] Connection establishes
- [ ] Real-time updates receive
- [ ] Reconnection works on disconnect

## Performance Tests

### Load Time
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Largest Contentful Paint < 2.5s

### Lighthouse Score
- [ ] Performance > 90
- [ ] Accessibility > 90
- [ ] Best Practices > 90
- [ ] SEO > 90

### Bundle Size
- [ ] Main bundle < 200KB (gzipped)
- [ ] Total page weight < 500KB

## Security Tests

- [ ] No sensitive data in client-side code
- [ ] HTTPS enforced in production
- [ ] No console.log errors with secrets
- [ ] Content Security Policy headers present
- [ ] X-XSS-Protection headers present

## Error Handling Tests

### Network Errors
- [ ] Shows user-friendly message on API failure
- [ ] Retry functionality works
- [ ] No app crashes on errors

### Invalid Input
- [ ] Form validation prevents invalid submissions
- [ ] Error messages are clear and helpful
- [ ] Input sanitization works

### Wallet Connection Errors
- [ ] Handles missing wallet gracefully
- [ ] Shows clear error message
- [ ] Provides install instructions

## E2E Scenarios

### New User Flow
1. User visits exchange.crestsx.com
2. Landing page loads
3. User clicks "Connect Wallet"
4. Wallet connects successfully
5. User navigates to Trade page
6. User enters swap amount
7. User confirms swap
8. Transaction executes

### Airdrop Flow
1. User visits /airdrop
2. User clicks "Check Eligibility"
3. User enters wallet address
4. System checks eligibility
5. User clicks "Claim" if eligible
6. Wallet approves transaction
7. Airdrop claimed successfully

### Pool Management
1. User navigates to Pools page
2. User views pool list
3. User clicks "Deposit" on a pool
4. User enters deposit amount
5. User confirms transaction
6. Pool balance updates

## Regression Tests

After any deployment:
- [ ] All manual tests pass
- [ ] No console errors
- [ ] All API integrations work
- [ ] Performance metrics maintained

## Test Data

### Test Wallet Addresses
- Solana devnet test wallet: [to be added]
- Solana mainnet test wallet: [to be added]

### Test Tokens
- SOL (native)
- USDC (devnet: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v)
- USDT (devnet: [to be added])
- CRX (custom token)

## Bug Reporting

Use GitHub Issues with template:

```markdown
**Title:** [BUG] Brief description

**Steps to Reproduce:**
1.
2.
3.

**Expected Behavior:**

**Actual Behavior:**

**Environment:**
- OS:
- Browser:
- URL:

**Screenshots:**

**Additional Info:**
```

## Sign-off

- **Tester:** _______________
- **Date:** _______________
- **Environment:** Dev / Staging / Prod
- **Status:** Passed / Failed / Needs Review
