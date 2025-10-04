# React Native Playground - Technical Architecture

## System Overview

The React Native Playground is built as a monorepo with two main packages:
- **Frontend**: React-based web application
- **Backend**: Node.js server handling code bundling and execution

## Communication Flow

```
┌─────────────┐         WebSocket          ┌─────────────┐
│             │◄──────────────────────────►│             │
│  Frontend   │                            │   Backend   │
│  (React)    │         HTTP/REST          │  (Node.js)  │
│             │◄──────────────────────────►│             │
└─────────────┘                            └─────────────┘
      │                                           │
      │                                           │
      ▼                                           ▼
┌─────────────┐                          ┌─────────────┐
│   Monaco    │                          │    Babel    │
│   Editor    │                          │  Transpiler │
└─────────────┘                          └─────────────┘
      │                                           │
      ▼                                           ▼
┌─────────────┐                          ┌─────────────┐
│   Preview   │                          │   Bundle    │
│   Iframe    │◄─────────────────────────│   Cache     │
└─────────────┘                          └─────────────┘
```

## Frontend Architecture

### Component Hierarchy

```
App
├── Header
│   ├── Logo
│   ├── Actions (Run, Share, Download)
│   └── Settings
├── Sidebar
│   ├── Files Tab
│   ├── Packages Tab
│   ├── Templates Tab
│   └── Examples Tab
├── Editor (Monaco)
│   └── Code Editor
├── Preview
│   ├── Device Frame Selector
│   └── Preview Iframe
└── Console
    ├── Log Viewer
    └── Controls (Clear, Expand/Collapse)
```

### State Management (Zustand)

```typescript
PlaygroundStore {
  // Code state
  code: string
  bundledCode: string
  
  // Connection state
  isConnected: boolean
  socket: Socket | null
  
  // UI state
  previewMode: 'web' | 'ios' | 'android'
  deviceFrame: string
  
  // Console state
  logs: ConsoleLog[]
  
  // Actions
  setCode()
  connect()
  disconnect()
  addLog()
  clearLogs()
}
```

### WebSocket Events

**Client → Server:**
- `code:update` - Send updated code for bundling

**Server → Client:**
- `bundle:ready` - Bundled code ready for execution
- `console:log` - Console output from executed code

## Backend Architecture

### Service Layer

```
BundlerService
├── bundle(code: string): Promise<string>
├── transformToWeb(code: string): string
└── wrapInModule(code: string): string
```

### Code Transformation Pipeline

1. **Input**: React Native TypeScript code
2. **Transform**: Convert RN imports to web equivalents
3. **Polyfill**: Add React Native Web polyfills
4. **Transpile**: Babel transforms TS/JSX → JS
5. **Wrap**: Wrap in IIFE with module system
6. **Output**: Executable JavaScript bundle

### Example Transformation

**Input (React Native):**
```typescript
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View>
      <Text>Hello World</Text>
    </View>
  );
}
```

**Output (Web-compatible):**
```javascript
(function() {
  // Polyfills
  const View = ({ style, children }) => 
    React.createElement('div', { style }, children);
  
  const Text = ({ style, children }) => 
    React.createElement('span', { style }, children);
  
  // User code (transpiled)
  function App() {
    return React.createElement(View, null,
      React.createElement(Text, null, "Hello World")
    );
  }
  
  // Render
  ReactDOM.createRoot(document.getElementById('root'))
    .render(React.createElement(App));
})();
```

## Performance Optimizations

### 1. Debounced Code Updates
- User types → 500ms delay → Send to server
- Prevents excessive bundling on every keystroke

### 2. Incremental Bundling
- Cache unchanged modules
- Only recompile modified code
- Reduces bundle time from ~2s to ~200ms

### 3. WebSocket Communication
- Persistent connection
- Low latency (~10-50ms)
- Bidirectional real-time updates

### 4. Iframe Sandboxing
- Isolated execution environment
- Prevents memory leaks
- Easy to reset/reload

## Rendering Strategies

### Current: React Native Web (Phase 1)

**Pros:**
- ⚡ Instant updates (<100ms)
- 🎯 Direct DOM rendering
- 💰 Low server cost
- 🚀 No simulator overhead

**Cons:**
- ❌ Limited native API support
- ❌ Not 100% RN compatible
- ❌ No native modules

### Future: Video Streaming (Phase 2)

**Pros:**
- ✅ 100% RN compatibility
- ✅ Real iOS/Android simulator
- ✅ Native module support
- ✅ Perfect visual fidelity

**Cons:**
- 🐌 Higher latency (~200ms)
- 💰 Higher server cost
- 📡 More bandwidth usage

### Hybrid Approach (Phase 3)

Automatically detect code requirements:
- Simple UI → React Native Web
- Native APIs → Video streaming
- Best of both worlds

## Security Considerations

### Code Execution Sandbox
- Iframe with `sandbox` attribute
- Restricted permissions
- No access to parent window

### Input Validation
- Sanitize user code
- Limit bundle size
- Rate limiting on API

### Resource Limits
- Max execution time: 30s
- Max memory: 512MB
- Max bundle size: 5MB

## Scalability

### Horizontal Scaling
- Stateless backend servers
- Load balancer distribution
- Redis for session management

### Caching Strategy
- Bundle cache (Redis)
- CDN for static assets
- Browser caching

### Database Design (Future)
```
Users
├── id
├── email
└── created_at

Projects
├── id
├── user_id
├── code
├── title
└── created_at

Shares
├── id
├── project_id
└── share_token
```

## Monitoring & Observability

### Metrics to Track
- Bundle time (p50, p95, p99)
- WebSocket latency
- Error rate
- Active connections
- Memory usage

### Logging
- Structured JSON logs
- Error tracking (Sentry)
- Performance monitoring (DataDog)

## Future Enhancements

### Multi-File Support
- Virtual file system
- Import resolution
- File tree UI

### NPM Package Installation
- On-demand package loading
- ESM CDN (esm.sh, skypack)
- Dependency resolution

### Real-Time Collaboration
- Operational Transform (OT)
- Conflict-free Replicated Data Type (CRDT)
- Cursor positions
- User presence

### iOS/Android Simulators
- Docker containers
- VNC/WebRTC streaming
- Touch event translation
- Device farm integration

## Technology Choices

### Why Vite?
- ⚡ Fastest dev server
- 🎯 Native ESM support
- 🔥 Instant HMR
- 📦 Optimized builds

### Why Zustand?
- 🪶 Lightweight (1KB)
- 🎯 Simple API
- ⚡ No boilerplate
- 🔄 React hooks

### Why Monaco?
- 💎 VSCode quality
- 🎨 Syntax highlighting
- 🔍 IntelliSense
- 🛠️ Extensible

### Why Socket.IO?
- 🔄 Auto-reconnection
- 📡 Fallback transports
- 🎯 Room support
- 📦 Battle-tested

## Deployment

### Frontend (Vercel/Netlify)
- Static site hosting
- CDN distribution
- Automatic HTTPS
- Preview deployments

### Backend (Railway/Render)
- Container deployment
- Auto-scaling
- Health checks
- Zero-downtime deploys

### Infrastructure as Code
```yaml
# docker-compose.yml
services:
  frontend:
    build: ./packages/frontend
    ports: ["3000:3000"]
  
  backend:
    build: ./packages/backend
    ports: ["4000:4000"]
    environment:
      - NODE_ENV=production
```

## Testing Strategy

### Unit Tests
- Component testing (Vitest + Testing Library)
- Service testing (Jest)
- 80%+ coverage target

### Integration Tests
- E2E testing (Playwright)
- WebSocket testing
- Bundle testing

### Performance Tests
- Load testing (k6)
- Stress testing
- Latency benchmarks

## Conclusion

This architecture provides a solid foundation for a high-performance React Native playground with room for future enhancements. The hybrid rendering approach balances speed, compatibility, and cost-effectiveness.
