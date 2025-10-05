# 🚀 Deployment Guide

## Backend Deployment

### Environment Variables

Add these to your deployment platform (Render, Railway, Heroku, etc.):

```env
PORT=4000
NODE_ENV=production
MONGODB_URI=mongodb+srv://agnik:agnik%401234@cluster0.gxtgz3y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-to-random-32-chars
GEMINI_API_KEY=AIzaSyCTxQVOQshw8nYI-BZRFntov88bAOA-x3o
FRONTEND_URL=https://nsthack-frontend-azey.vercel.app
```

### Deploy to Render.com

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Configure:
   - **Name**: rn-playground-backend
   - **Root Directory**: `packages/backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Add Environment Variables (from above)
6. Click "Create Web Service"
7. Copy your backend URL (e.g., `https://rn-playground-backend.onrender.com`)

### Deploy to Railway.app

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repo
4. Configure:
   - **Root Directory**: `packages/backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Add Environment Variables
6. Deploy!

## Frontend Deployment (Already on Vercel)

Your frontend is at: `https://nsthack-frontend-azey.vercel.app`

### Update Frontend API URLs

After deploying backend, update these files to use your backend URL:

1. **packages/frontend/src/store/authStore.ts**
   - Replace `http://localhost:4000` with your backend URL

2. **packages/frontend/src/store/playgroundStore.ts**
   - Replace `http://localhost:4000` with your backend URL

3. **packages/frontend/src/pages/Profile.tsx**
   - Replace `http://localhost:4000` with your backend URL

4. **packages/frontend/src/pages/Playground.tsx**
   - Replace `http://localhost:4000` with your backend URL

5. **packages/frontend/src/components/Header.tsx**
   - Replace `http://localhost:4000` with your backend URL

6. **packages/frontend/src/components/ShareModal.tsx**
   - Replace `http://localhost:4000` with your backend URL

### Create Environment Variable for Frontend

Add to Vercel:
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

Then update all fetch calls to use:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
```

## CORS Configuration

Backend is already configured to accept requests from:
- `http://localhost:3000` (development)
- `https://nsthack-frontend-azey.vercel.app` (production)

## MongoDB Atlas

Your MongoDB is already configured:
- Connection string is in `.env.production`
- Make sure to whitelist your deployment platform's IP in MongoDB Atlas
- Or use `0.0.0.0/0` to allow all IPs (less secure but works)

## Testing Deployment

1. Deploy backend first
2. Get backend URL
3. Update frontend API URLs
4. Redeploy frontend on Vercel
5. Test:
   - Visit `https://nsthack-frontend-azey.vercel.app`
   - Sign up
   - Create a playground
   - Share it
   - Test collaboration

## Important Security Notes

1. **Change JWT_SECRET** to a random 32+ character string
2. **Whitelist IPs** in MongoDB Atlas for better security
3. **Use HTTPS** for all production URLs
4. **Never commit** `.env` files to git

## Troubleshooting

### CORS Errors
- Make sure backend CORS includes your frontend URL
- Check browser console for exact error
- Verify credentials: true is set

### MongoDB Connection Errors
- Check MongoDB Atlas IP whitelist
- Verify connection string is correct
- Check MongoDB Atlas cluster is running

### WebSocket Connection Errors
- Make sure deployment platform supports WebSockets
- Render.com: Works by default
- Railway: Works by default
- Heroku: May need additional config

## Quick Deploy Commands

```bash
# Backend
cd packages/backend
npm run build
npm start

# Frontend (Vercel will do this automatically)
cd packages/frontend
npm run build
```

## Environment Variables Checklist

Backend:
- ✅ PORT
- ✅ NODE_ENV
- ✅ MONGODB_URI
- ✅ JWT_SECRET
- ✅ GEMINI_API_KEY
- ✅ FRONTEND_URL

Frontend:
- ✅ VITE_API_URL (optional, can hardcode)

## Success! 🎉

Once deployed:
- Backend: `https://your-backend.onrender.com`
- Frontend: `https://nsthack-frontend-azey.vercel.app`
- MongoDB: Already configured
- CORS: Already configured

Your app is production-ready!
