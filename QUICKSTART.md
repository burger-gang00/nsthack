# Quick Start Guide

Get the React Native Playground running in 5 minutes!

## Option 1: Local Development (Recommended)

### Step 1: Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd packages/frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Return to root
cd ../..
```

### Step 2: Start Development Servers

```bash
# Start both frontend and backend concurrently
npm run dev
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:4000

### Step 3: Open in Browser

Navigate to http://localhost:3000 and start coding!

## Option 2: Docker (Alternative)

### Prerequisites
- Docker Desktop installed

### Step 1: Build and Run

```bash
docker-compose up --build
```

### Step 2: Open in Browser

Navigate to http://localhost:3000

## What You'll See

1. **Monaco Editor** (left) - Write your React Native code
2. **Live Preview** (right) - See your app running in real-time
3. **Console** (bottom) - View logs, errors, and warnings
4. **Sidebar** (left) - Access files, packages, templates

## Try It Out

The playground comes with a sample counter app. Try modifying:

1. Change the title text
2. Add a new button
3. Modify the styles
4. Add state with `useState`

Changes appear instantly in the preview!

## Keyboard Shortcuts

- `Cmd/Ctrl + S` - Format code
- `Cmd/Ctrl + /` - Toggle comment
- `Cmd/Ctrl + F` - Find
- `Cmd/Ctrl + H` - Find and replace

## Troubleshooting

### Port Already in Use

If port 3000 or 4000 is already in use:

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 4000
lsof -ti:4000 | xargs kill -9
```

### WebSocket Connection Failed

1. Check backend is running on port 4000
2. Check browser console for errors
3. Try refreshing the page

### Bundle Errors

1. Check console for syntax errors
2. Ensure all imports are valid
3. Try resetting to default code

## Next Steps

- Read [FEATURES.md](./FEATURES.md) for full feature list
- Read [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
- Check out example templates in the sidebar
- Share your creations with the community!

## Need Help?

- Open an issue on GitHub
- Check the documentation
- Join our Discord community

Happy coding! 🚀
