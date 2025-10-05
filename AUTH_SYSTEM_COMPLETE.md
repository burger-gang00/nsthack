# Authentication System Implementation

## Overview
Complete authentication system with user registration, login, profile management, and saved playgrounds.

## Features Implemented

### Backend (packages/backend)

1. **Auth Service** (`src/services/auth.ts`)
   - User registration with bcrypt password hashing
   - Login with JWT token generation
   - Token verification middleware
   - User profile management
   - Playground CRUD operations per user

2. **Database Integration** (`src/services/database.ts`)
   - MongoDB collections for users and playgrounds
   - Indexed for performance
   - Integrated with auth service

3. **API Endpoints** (`src/index.ts`)
   - `POST /api/auth/register` - Register new user
   - `POST /api/auth/login` - Login user
   - `GET /api/auth/me` - Get current user (protected)
   - `POST /api/playgrounds` - Save playground (protected)
   - `GET /api/playgrounds` - Get user's playgrounds (protected)
   - `GET /api/playgrounds/:id` - Get specific playground (protected)
   - `PUT /api/playgrounds/:id` - Update playground (protected)
   - `DELETE /api/playgrounds/:id` - Delete playground (protected)

### Frontend (packages/frontend)

1. **Auth Store** (`src/store/authStore.ts`)
   - Zustand store with persistence
   - Login/register/logout functions
   - Token management
   - User state management

2. **Sign In Page** (`src/pages/SignIn.tsx`)
   - Beautiful gradient design matching home page
   - Email/password login
   - Error handling
   - Link to sign up
   - Redirects to playground on success

3. **Sign Up Page** (`src/pages/SignUp.tsx`)
   - Registration form with name, email, password
   - Password confirmation
   - Validation (min 6 chars, matching passwords)
   - Error handling
   - Link to sign in
   - Redirects to playground on success

4. **Profile Page** (`src/pages/Profile.tsx`)
   - User info display with avatar
   - List of saved playgrounds
   - Playground cards with:
     - Name and file count
     - Last updated timestamp
     - Open and delete actions
   - Create new playground button
   - Logout button
   - Empty state for no playgrounds

5. **Updated Components**
   - **Header** - Shows profile icon when logged in, sign in button when not
   - **Home** - Sign In/Sign Up buttons link to auth pages
   - **App** - Routes for /signin, /signup, /profile

## Design

All auth pages match the home page aesthetic:
- Gradient background (gray-900 → blue-900 → gray-900)
- Glass-morphism cards
- Blue/purple gradient accents
- Consistent typography and spacing
- Responsive design

## Security

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens with 7-day expiration
- Protected API routes with auth middleware
- Token stored in localStorage with Zustand persist
- CORS configured for credentials

## Usage

### Register New User
1. Go to `/signup`
2. Enter name, email, password
3. Automatically logged in and redirected to playground

### Login
1. Go to `/signin`
2. Enter email and password
3. Redirected to playground

### Save Playground
```typescript
// In playground, call API to save
const response = await fetch('http://localhost:4000/api/playgrounds', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    name: 'My Project',
    files: [...] // file tree
  })
});
```

### View Profile
1. Click profile icon in header (when logged in)
2. See all saved playgrounds
3. Click to open or delete

## Database Schema

### Users Collection
```typescript
{
  _id: ObjectId,
  email: string (unique),
  password: string (hashed),
  name: string,
  createdAt: number,
  lastLogin: number
}
```

### Playgrounds Collection
```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref to users),
  name: string,
  files: any[], // file tree structure
  createdAt: number,
  updatedAt: number
}
```

## Environment Variables

Add to `packages/backend/.env`:
```
JWT_SECRET=your-secret-key-change-in-production
MONGODB_URI=your-mongodb-connection-string
```

## Next Steps

To fully integrate:
1. Add "Save Playground" button in playground header
2. Auto-save functionality
3. Load playground from profile page
4. Share playgrounds with other users
5. Collaborative editing with user permissions
6. Password reset functionality
7. Email verification
8. OAuth providers (Google, GitHub)

## Testing

1. Start backend: `cd packages/backend && npm run dev`
2. Start frontend: `cd packages/frontend && npm run dev`
3. Visit `http://localhost:3000`
4. Click "Get Started" → Sign up
5. Create account
6. Go to profile to see saved playgrounds
