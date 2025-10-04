# Deployment Guide

Complete guide for deploying the React Native Playground to production.

## Deployment Options

### Option 1: Vercel + Railway (Recommended)

**Frontend on Vercel:**
- Zero configuration
- Automatic HTTPS
- Global CDN
- Preview deployments

**Backend on Railway:**
- Easy container deployment
- Auto-scaling
- Built-in monitoring
- WebSocket support

### Option 2: Netlify + Render

**Frontend on Netlify:**
- Similar to Vercel
- Great DX
- Fast builds

**Backend on Render:**
- Free tier available
- Docker support
- Auto-deploy from Git

### Option 3: AWS (Advanced)

**Frontend:**
- S3 + CloudFront
- Route 53 for DNS
- Certificate Manager for SSL

**Backend:**
- ECS/Fargate for containers
- ALB for load balancing
- ElastiCache for Redis
- RDS for database

## Step-by-Step: Vercel + Railway

### 1. Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend
cd packages/frontend

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? rn-playground-frontend
# - Directory? ./
# - Override settings? No
```

**Environment Variables:**
```
VITE_API_URL=https://your-backend.railway.app
```

### 2. Deploy Backend to Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Navigate to backend
cd packages/backend

# Initialize
railway init

# Deploy
railway up

# Add environment variables
railway variables set NODE_ENV=production
railway variables set PORT=4000
```

### 3. Update CORS Settings

In `packages/backend/src/index.ts`:

```typescript
const io = new Server(httpServer, {
  cors: {
    origin: [
      'http://localhost:3000',
      'https://your-frontend.vercel.app'
    ],
    methods: ['GET', 'POST']
  }
});
```

### 4. Configure Custom Domain (Optional)

**Vercel:**
```bash
vercel domains add playground.yourdomain.com
```

**Railway:**
- Go to Railway dashboard
- Settings → Domains
- Add custom domain

## Docker Deployment

### Build Images

```bash
# Build frontend
docker build -t rn-playground-frontend ./packages/frontend

# Build backend
docker build -t rn-playground-backend ./packages/backend
```

### Push to Registry

```bash
# Tag images
docker tag rn-playground-frontend:latest your-registry/rn-playground-frontend:latest
docker tag rn-playground-backend:latest your-registry/rn-playground-backend:latest

# Push
docker push your-registry/rn-playground-frontend:latest
docker push your-registry/rn-playground-backend:latest
```

### Deploy with Docker Compose

```yaml
version: '3.8'

services:
  frontend:
    image: your-registry/rn-playground-frontend:latest
    ports:
      - "80:3000"
    environment:
      - VITE_API_URL=https://api.yourdomain.com
    restart: always

  backend:
    image: your-registry/rn-playground-backend:latest
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - PORT=4000
    restart: always
```

## Kubernetes Deployment

### Frontend Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rn-playground-frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: your-registry/rn-playground-frontend:latest
        ports:
        - containerPort: 3000
        env:
        - name: VITE_API_URL
          value: "https://api.yourdomain.com"
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 3000
  selector:
    app: frontend
```

### Backend Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rn-playground-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: your-registry/rn-playground-backend:latest
        ports:
        - containerPort: 4000
        env:
        - name: NODE_ENV
          value: "production"
        - name: PORT
          value: "4000"
---
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  type: LoadBalancer
  ports:
  - port: 4000
    targetPort: 4000
  selector:
    app: backend
```

## Environment Variables

### Frontend (.env.production)
```
VITE_API_URL=https://api.yourdomain.com
VITE_WS_URL=wss://api.yourdomain.com
```

### Backend (.env.production)
```
NODE_ENV=production
PORT=4000
CORS_ORIGIN=https://playground.yourdomain.com
REDIS_URL=redis://your-redis-url:6379
DATABASE_URL=postgresql://user:pass@host:5432/db
```

## Performance Optimization

### Frontend

1. **Enable Gzip Compression**
```javascript
// vite.config.ts
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    compression()
  ]
});
```

2. **Code Splitting**
```typescript
// Lazy load components
const Editor = lazy(() => import('./components/Editor'));
const Preview = lazy(() => import('./components/Preview'));
```

3. **CDN for Static Assets**
- Use Vercel/Netlify CDN
- Or configure CloudFront

### Backend

1. **Enable Clustering**
```typescript
import cluster from 'cluster';
import os from 'os';

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Start server
}
```

2. **Add Redis Caching**
```typescript
import Redis from 'redis';

const redis = Redis.createClient({
  url: process.env.REDIS_URL
});

// Cache bundles
await redis.set(`bundle:${hash}`, code, { EX: 3600 });
```

3. **Rate Limiting**
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api', limiter);
```

## Monitoring

### Application Monitoring

**Sentry for Error Tracking:**
```typescript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});
```

**DataDog for Metrics:**
```typescript
import { StatsD } from 'hot-shots';

const statsd = new StatsD({
  host: 'localhost',
  port: 8125
});

statsd.increment('bundle.count');
statsd.timing('bundle.time', duration);
```

### Health Checks

```typescript
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});
```

## Security

### 1. HTTPS Only
```typescript
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});
```

### 2. Helmet for Security Headers
```typescript
import helmet from 'helmet';
app.use(helmet());
```

### 3. Rate Limiting
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);
```

### 4. Input Validation
```typescript
import { body, validationResult } from 'express-validator';

app.post('/api/bundle',
  body('code').isString().isLength({ max: 100000 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Process request
  }
);
```

## Backup & Recovery

### Database Backups
```bash
# Automated daily backups
0 2 * * * pg_dump $DATABASE_URL > backup-$(date +\%Y\%m\%d).sql
```

### Code Backups
- Use Git for version control
- Tag releases
- Maintain staging environment

## Scaling Strategy

### Horizontal Scaling
- Add more backend instances
- Use load balancer
- Sticky sessions for WebSocket

### Vertical Scaling
- Increase server resources
- Optimize bundle caching
- Use CDN for static assets

### Database Scaling
- Read replicas
- Connection pooling
- Query optimization

## Cost Optimization

### Free Tier Options
- **Vercel**: Free for personal projects
- **Railway**: $5/month credit
- **Render**: Free tier available
- **Netlify**: Free for personal use

### Estimated Costs (1000 users/day)
- **Vercel**: $0 (within free tier)
- **Railway**: ~$10/month
- **Total**: ~$10/month

### Production Scale (10,000 users/day)
- **Vercel Pro**: $20/month
- **Railway**: ~$50/month
- **Redis**: ~$15/month
- **Total**: ~$85/month

## Troubleshooting

### WebSocket Connection Issues
1. Check CORS settings
2. Verify WebSocket support on host
3. Check firewall rules
4. Test with polling fallback

### Bundle Errors
1. Check Babel configuration
2. Verify polyfills
3. Test locally first
4. Check error logs

### Performance Issues
1. Enable caching
2. Add CDN
3. Optimize bundle size
4. Use compression

## Rollback Strategy

```bash
# Vercel
vercel rollback

# Railway
railway rollback

# Docker
docker-compose down
docker-compose up -d --force-recreate
```

## Maintenance

### Regular Tasks
- Monitor error rates
- Check performance metrics
- Update dependencies
- Review security alerts
- Backup database

### Updates
```bash
# Update dependencies
npm update

# Security audit
npm audit fix

# Test
npm test

# Deploy
npm run deploy
```

## Support

For deployment issues:
- Check logs: `railway logs` or Vercel dashboard
- Review documentation
- Open GitHub issue
- Contact support

---

**Ready to deploy? Start with the Vercel + Railway option for the easiest setup!**
