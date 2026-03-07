# Contributing to CrestsX Frontend

Thank you for your interest in contributing to CrestsX! This document provides guidelines and instructions for contributing to the frontend repository.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other contributors

## Getting Started

### Fork and Clone

```bash
# Fork the repository on GitHub
git clone https://github.com/YOUR_USERNAME/crestsx-frontend.git
cd crestsx-frontend
npm install
```

### Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

## Development Setup

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

### Run Linter

```bash
npm run lint
```

## Branch Naming

Use these prefixes for branch names:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions or updates
- `chore/` - Maintenance tasks

Examples:
- `feature/airdrop-claim-flow`
- `fix/responsive-trade-page`
- `docs/update-api-integration`
- `refactor/wallet-context`

## Commit Messages

Follow conventional commits:

```
type(scope): subject

body

footer
```

Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style changes (formatting)
- `refactor` - Code refactoring
- `test` - Test updates
- `chore` - Maintenance

Examples:
```
feat(trade): add price estimation display

Implement price estimation on the trade page.
Shows estimated output amount when user inputs from amount.

Closes #123
```

```
fix(pools): handle empty pool list gracefully

Added loading state and empty message when no pools exist.
Fixes issue where app crashes on initial load.

Fixes #456
```

## Code Style

### TypeScript

- Use TypeScript for all new files
- Define interfaces for component props
- Avoid `any` types
- Use proper typing for API responses

Example:
```typescript
interface Pool {
  mint: string;
  balance: number;
  price: number;
}

interface PoolCardProps {
  pool: Pool;
  onDeposit: (mint: string) => void;
}
```

### React

- Use functional components with hooks
- Follow the rules of hooks
- Use `use client` directive for client components
- Keep components focused and small

Example:
```typescript
"use client";

import { useState } from "react";

export function PoolCard({ pool }: { pool: Pool }) {
  const [balance, setBalance] = useState(pool.balance);

  return (
    <div className="pool-card">
      <h3>{pool.mint}</h3>
      <p>Balance: {balance}</p>
    </div>
  );
}
```

### Styling

- Use Tailwind CSS utility classes
- Follow the existing color scheme
- Ensure responsive design
- Add dark mode support where applicable

Example:
```tsx
<div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md">
  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
    Pool Info
  </h2>
</div>
```

## Pull Request Process

### Before Submitting

1. Update documentation if needed
2. Add/update tests for new features
3. Run linter and fix any issues
4. Test your changes thoroughly
5. Update README.md if user-facing changes

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested these changes

## Checklist
- [ ] Code follows project style
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Self-review completed
- [ ] No console errors
- [ ] Responsive on mobile/tablet

## Related Issues
Closes #123
```

## Testing

### Manual Testing

- Test on desktop (1920x1080)
- Test on tablet (768x1024)
- Test on mobile (375x667)
- Test in Chrome, Firefox, Safari
- Check console for errors

### Unit Tests

Add unit tests for new utilities and helper functions:

```typescript
// __tests__/utils.test.ts
import { formatPrice } from '@/lib/utils';

describe('formatPrice', () => {
  it('formats price correctly', () => {
    expect(formatPrice(1234.56789)).toBe('1,234.57');
  });
});
```

### Integration Tests

Test API integrations with mock data or test endpoints.

## Documentation

### Code Comments

- Comment complex logic
- Explain non-obvious decisions
- Keep comments up to date

### README Updates

Update README.md for:
- New pages or features
- New dependencies
- Breaking changes

## Deployment

Deployments happen automatically via Vercel when PRs are merged to `main`.

## Getting Help

- Check [GitHub Issues](https://github.com/AnodazTeam/crestsx-frontend/issues)
- Review existing documentation
- Ask questions in PR comments
- Contact maintainers

## Recognition

Contributors are recognized in the project's CONTRIBUTORS.md and release notes.

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

---

Thank you for contributing to CrestsX! 🚀
