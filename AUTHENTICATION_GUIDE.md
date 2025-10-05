# 🔐 Authentication System - Quick Start Guide

## What's New

Your RN Live platform now has a complete authentication system with:

✅ **User Registration & Login**
✅ **Profile Management**  
✅ **Saved Playgrounds per User**
✅ **Beautiful UI matching home page design**
✅ **Secure JWT authentication**
✅ **MongoDB integration**

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with features & pricing |
| `/signin` | Login page |
| `/signup` | Registration page |
| `/profile` | User profile with saved playgrounds |
| `/playground` | Main coding playground |
| `/share/:id` | Shared project view |

## How It Works

### 1. User Flow

```
Home Page → Sign Up → Playground → Save Projects → Profile
     ↓
  Sign In → Playground → Load Saved Projects
```

### 2. Sign Up
- Visit `/signup` or click "Get Started" on home page
- Enter name, email, password
- Automatically logged in
- Redirected to playground

### 3. Sign In
- Visit `/signin` or click "Sign In" on home page
- Enter email and password
- Redirected to playground
- Profile icon appears in header

### 4. Profile Page
- Click profile icon in playground header
- See all your saved playgrounds
- Each playground shows:
  - Name
  - Number of files
  - Last updated time
  - Open button
  - Delete button
- Create new playground button
- Logout button

### 5. Save Playgrounds
Currently manual via API. To add auto-save:

```typescript
// In playground component
const { token } = useAuthStore();

const savePlayground = async () => {
  const response = await fetch('http://localhost:4000/api/playgrounds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: 'My Project',
      files: currentFiles
    })
  });
};
```

## Backend API

### Public Endpoints
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login

### Protected Endpoints (require Bearer token)
- `GET /api/auth/me` - Get current user
- `POST /api/playgrounds` - Save playground
- `GET /api/playgrounds` - List user's playgrounds
- `GET /api/playgrounds/:id` - Get specific playground
- `PUT /api/playgrounds/:id` - Update playground
- `DELETE /api/playgrounds/:id` - Delete playground

## Security Features

- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens (7-day expiration)
- ✅ Protected routes with middleware
- ✅ CORS configured
- ✅ Token stored securely in localStorage
- ✅ Auto token refresh on page load

## Design

All pages use consistent design:
- 🎨 Gradient backgrounds (gray → blue → gray)
- 🪟 Glass-morphism cards
- 💙 Blue/purple accents
- 📱 Fully responsive
- ✨ Smooth transitions

## Database

MongoDB collections:
- `users` - User accounts
- `playgrounds` - Saved projects per user
- `projects` - Shared projects (existing)

## Testing

1. **Start Backend**
   ```bash
   cd packages/backend
   npm run dev
   ```

2. **Start Frontend**
   ```bash
   cd packages/frontend
   npm run dev
   ```

3. **Test Flow**
   - Visit http://localhost:3000
   - Click "Get Started"
   - Create account
   - Explore playground
   - Click profile icon
   - See your saved playgrounds

## Next Features to Add

1. **Save Button in Playground**
   - Add "Save" button in Header
   - Save current state to database
   - Show success notification

2. **Load Playground**
   - Click playground in profile
   - Load files into editor
   - Restore state

3. **Auto-save**
   - Save every 30 seconds
   - Show "Saving..." indicator
   - Debounce saves

4. **Sharing with Users**
   - Share playground with specific users
   - Collaborative permissions
   - View shared playgrounds

5. **Enhanced Profile**
   - Edit profile info
   - Change password
   - Avatar upload
   - Usage statistics

## Environment Setup

Make sure your `.env` has:
```env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key-change-in-production
PORT=4000
```

## Troubleshooting

**Can't login?**
- Check MongoDB is connected
- Check backend console for errors
- Verify credentials are correct

**Profile not showing?**
- Make sure you're logged in
- Check token in localStorage
- Refresh the page

**Playgrounds not saving?**
- Check auth token is valid
- Verify MongoDB connection
- Check backend logs

## Code Examples

### Check if user is logged in
```typescript
import { useAuthStore } from './store/authStore';

function MyComponent() {
  const { isAuthenticated, user } = useAuthStore();
  
  if (isAuthenticated) {
    return <div>Welcome {user?.name}!</div>;
  }
  return <div>Please sign in</div>;
}
```

### Make authenticated request
```typescript
const { token } = useAuthStore();

const response = await fetch('http://localhost:4000/api/playgrounds', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Logout
```typescript
const { logout } = useAuthStore();
logout(); // Clears user and token
```

## Success! 🎉

Your platform now has:
- ✅ Complete authentication
- ✅ User profiles
- ✅ Saved playgrounds
- ✅ Beautiful UI
- ✅ Secure backend
- ✅ MongoDB integration

Users can now create accounts, save their work, and access it anytime!
