# Contributing to React Native Playground

Thank you for your interest in contributing! This guide will help you get started.

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Setup Development Environment

1. **Fork the repository**
```bash
git clone https://github.com/yourusername/rn-playground.git
cd rn-playground
```

2. **Install dependencies**
```bash
./setup.sh
# or manually:
npm install
cd packages/frontend && npm install
cd ../backend && npm install
```

3. **Start development servers**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

## Project Structure

```
rn-playground/
├── packages/
│   ├── frontend/       # React application
│   │   ├── src/
│   │   │   ├── components/  # UI components
│   │   │   ├── store/       # State management
│   │   │   ├── templates/   # Code templates
│   │   │   └── ...
│   │   └── ...
│   └── backend/        # Node.js server
│       ├── src/
│       │   ├── services/    # Business logic
│       │   └── ...
│       └── ...
└── ...
```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 2. Make Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

```bash
# Frontend
cd packages/frontend
npm run build

# Backend
cd packages/backend
npm run build
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add new feature"
# or
git commit -m "fix: resolve bug"
```

**Commit Message Format:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Build/tooling changes

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Code Style Guidelines

### TypeScript/JavaScript

```typescript
// ✅ Good
export function bundleCode(code: string): Promise<string> {
  // Clear function name, typed parameters
  return transform(code);
}

// ❌ Bad
export function bc(c: any) {
  return transform(c);
}
```

### React Components

```typescript
// ✅ Good
export default function Editor() {
  const { code, setCode } = usePlaygroundStore();
  
  return (
    <MonacoEditor
      value={code}
      onChange={setCode}
    />
  );
}

// ❌ Bad
export default function Editor() {
  const store = usePlaygroundStore();
  return <MonacoEditor value={store.code} onChange={store.setCode} />;
}
```

### CSS/Styling

```typescript
// ✅ Good - Use Tailwind classes
<div className="flex items-center gap-2 p-4 bg-gray-800">

// ❌ Bad - Inline styles
<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
```

## Adding New Features

### 1. New Component

```typescript
// packages/frontend/src/components/NewComponent.tsx
import { usePlaygroundStore } from '../store/playgroundStore';

export default function NewComponent() {
  // Component logic
  return (
    <div className="...">
      {/* Component UI */}
    </div>
  );
}
```

### 2. New Template

```typescript
// packages/frontend/src/templates/newTemplate.ts
export const newTemplate = `
import React from 'react';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View>
      <Text>New Template</Text>
    </View>
  );
}
`;
```

### 3. New Backend Service

```typescript
// packages/backend/src/services/newService.ts
export class NewService {
  async process(data: string): Promise<string> {
    // Service logic
    return processedData;
  }
}
```

## Testing

### Manual Testing Checklist

- [ ] Code editor loads correctly
- [ ] Code changes trigger updates
- [ ] Preview renders correctly
- [ ] Console shows logs
- [ ] WebSocket connects
- [ ] No console errors
- [ ] Works on mobile viewport
- [ ] Works in different browsers

### Browser Testing

Test in:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Documentation

### Update Documentation When:
- Adding new features
- Changing APIs
- Modifying architecture
- Adding dependencies

### Documentation Files:
- `README.md` - Overview
- `FEATURES.md` - Feature list
- `ARCHITECTURE.md` - Technical details
- `DEPLOYMENT.md` - Deployment guide
- `CONTRIBUTING.md` - This file

## Common Tasks

### Adding a New NPM Package

**Frontend:**
```bash
cd packages/frontend
npm install package-name
```

**Backend:**
```bash
cd packages/backend
npm install package-name
```

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update all
npm update

# Update specific package
npm install package-name@latest
```

### Debugging

**Frontend:**
- Use React DevTools
- Check browser console
- Use Monaco editor breakpoints

**Backend:**
- Use `console.log()` for quick debugging
- Check terminal output
- Use Node.js debugger

## Performance Guidelines

### Frontend
- Lazy load heavy components
- Debounce expensive operations
- Memoize computed values
- Optimize re-renders

### Backend
- Cache bundle results
- Use async/await properly
- Avoid blocking operations
- Implement rate limiting

## Security Guidelines

### Never Commit:
- API keys
- Passwords
- Private keys
- Sensitive data

### Always:
- Validate user input
- Sanitize code output
- Use HTTPS in production
- Implement rate limiting

## Pull Request Guidelines

### Before Submitting:
- [ ] Code builds without errors
- [ ] No console warnings
- [ ] Tested manually
- [ ] Documentation updated
- [ ] Commit messages follow format

### PR Description Should Include:
- What changed
- Why it changed
- How to test
- Screenshots (if UI change)

### Example PR Description:

```markdown
## Description
Added dark/light theme toggle to header

## Changes
- Added theme state to store
- Created ThemeToggle component
- Updated color classes

## Testing
1. Click theme toggle in header
2. Verify colors change
3. Verify preference persists

## Screenshots
[Before/After images]
```

## Getting Help

### Resources
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Socket.IO Docs](https://socket.io/docs/)

### Community
- GitHub Discussions
- Discord Server
- Stack Overflow

### Reporting Bugs

Use GitHub Issues with:
- Clear title
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots/logs
- Environment details

## Feature Requests

We welcome feature requests! Please:
1. Check existing issues first
2. Describe the feature clearly
3. Explain the use case
4. Provide examples if possible

## Code of Conduct

### Be Respectful
- Treat everyone with respect
- Welcome newcomers
- Be patient with questions
- Give constructive feedback

### Be Professional
- Focus on the code, not the person
- Accept criticism gracefully
- Acknowledge contributions
- Help others learn

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to:
- Open a GitHub Discussion
- Ask in Discord
- Email the maintainers

---

**Thank you for contributing to React Native Playground! 🎉**
