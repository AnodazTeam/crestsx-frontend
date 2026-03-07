# Component Library for CrestsX Frontend

This document catalogs reusable components across the CrestsX DEX interface. Use these for consistency and faster development.

## Core Components

### Button Components

#### PrimaryButton
```tsx
<button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
  Button Text
</button>
```

#### SecondaryButton
```tsx
<button className="bg-primary-100 text-primary-700 px-4 py-2 rounded-lg hover:bg-primary-200 transition">
  Button Text
</button>
```

### Navigation Components

#### Navbar
Located in each page's navigation section.

**Usage:**
```tsx
<nav className="border-b border-primary-200 bg-white/80 backdrop-blur-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo and links */}
    </div>
  </div>
</nav>
```

### Card Components

#### Standard Card
```tsx
<div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
  {/* Content */}
</div>
```

#### Pool Card
```tsx
<div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 hover:shadow-lg transition">
  <div className="flex justify-between items-center">
    {/* Pool info */}
  </div>
</div>
```

### Form Components

#### Input Field
```tsx
<input
  type="text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Placeholder text"
  className="border border-gray-300 rounded-xl p-4 bg-gray-50 w-full"
/>
```

#### Labeled Input
```tsx
<div className="mb-2">
  <label className="text-sm text-gray-500 mb-2 block">Label</label>
  <div className="border border-gray-300 rounded-xl p-4 bg-gray-50">
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="0.00"
      className="w-full bg-transparent text-3xl font-semibold outline-none"
    />
  </div>
</div>
```

### Badge Components

#### Status Badge
```tsx
<span className="bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-semibold">
  Status Text
</span>
```

#### Tag Badge
```tsx
<span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
  Tag
</span>
```

### Loading States

#### Button Loading
```tsx
<button
  disabled={loading}
  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
>
  {loading ? <Spinner /> : "Button Text"}
</button>
```

#### Spinner
```tsx
<svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg>
```

## Page Templates

### Landing Page Template
```tsx
"use client";

import Link from "next/link";

export default function PageName() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Navbar */}
      <nav className="border-b border-primary-200 bg-white/80 backdrop-blur-sm">
        {/* Navigation content */}
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        {/* Hero content */}
      </section>

      {/* Content Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        {/* Page content */}
      </section>
    </main>
  );
}
```

## Utility Functions

### Format Currency
```typescript
function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

// Usage: formatCurrency(1234.56, "USD") => "$1,234.56"
```

### Format Number
```typescript
function formatNumber(num: number, decimals: number = 2): string {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// Usage: formatNumber(1234.5678, 2) => "1,234.57"
```

### Truncate Address
```typescript
function truncateAddress(address: string, start: number = 6, end: number = 4): string {
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

// Usage: truncateAddress("8xF3...3f2Q") => "8xF...3f2Q"
```

### Format Timestamp
```typescript
function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

// Usage: formatTimestamp(1699000000) => "Nov 3, 2023, 12:00 AM"
```

## Color Scheme

### Primary Colors
- `primary-50`: #f0f9ff
- `primary-100`: #e0f2fe
- `primary-200`: #bae6fd
- `primary-600`: #0284c7
- `primary-700`: #0369a1

### Gray Colors
- `gray-50`: #f9fafb
- `gray-100`: #f3f4f6
- `gray-200`: #e5e7eb
- `gray-500`: #6b7280
- `gray-600`: #4b5563
- `gray-900`: #111827

## Spacing Scale

- `p-4`: 1rem (16px)
- `p-6`: 1.5rem (24px)
- `p-8`: 2rem (32px)
- `py-12`: 3rem (48px)
- `py-20`: 5rem (80px)

## Responsive Breakpoints

- `sm`: 640px (phones)
- `md`: 768px (tablets)
- `lg`: 1024px (desktops)
- `xl`: 1280px (large screens)

**Usage Example:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid */}
</div>
```

## Icons

### Chevron Left
```tsx
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
</svg>
```

### Chevron Right
```tsx
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
</svg>
```

### Arrow Swap
```tsx
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
</svg>
```

### Check Circle
```tsx
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
```

## Typography

### Headings
```tsx
<h1 className="text-5xl font-bold">H1 - Main Heading</h1>
<h2 className="text-3xl font-bold">H2 - Section Heading</h2>
<h3 className="text-2xl font-semibold">H3 - Subsection</h3>
```

### Text
```tsx
<p className="text-gray-600">Body text</p>
<p className="text-sm text-gray-500">Small text</p>
<p className="text-lg font-semibold">Large text</p>
```

## Accessibility

### ARIA Labels
```tsx
<button aria-label="Close dialog">Close</button>
<input aria-label="Wallet address" placeholder="Wallet Address" />
```

### Focus States
```tsx
<button className="focus:outline-none focus:ring-2 focus:ring-primary-500">
  Accessible Button
</button>
```

### Keyboard Navigation
All interactive elements should be keyboard accessible via Tab and Enter/Space.

## Contributing New Components

When adding new reusable components:
1. Add to this document
2. Follow existing patterns
3. Include accessibility attributes
4. Test on mobile/tablet/desktop
5. Ensure dark mode compatibility

---

**Purpose:** Maintain consistency and accelerate development across the CrestsX frontend.
