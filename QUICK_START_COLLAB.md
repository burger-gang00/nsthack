# 🚀 Quick Start: Real-Time Collaboration

## 30 Second Setup

### 1. Start App
```bash
npm run dev
```

### 2. Open Two Windows
- **Window 1**: Normal browser → http://localhost:3000
- **Window 2**: Incognito/Private → http://localhost:3000

### 3. Join Room

**Both Windows:**
1. Click 👥 icon (top-right)
2. Click "Join Room"
3. Enter name (Alice / Bob)
4. Enter room: **test123**
5. Click "Join"

### 4. Start Coding Together!

**Window 1 (Alice):** Type `// Hello`
**Window 2 (Bob):** See it appear instantly! ✨

## Features You Can Try

### 💬 Chat
1. Click "Chat" tab
2. Type message
3. Press Enter
4. See it in both windows!

### 📁 Create Files
1. Right-click folder
2. "New File"
3. Type code
4. Other user sees it!

### 👥 See Who's Online
- Top-left shows user avatars
- Shows "X users online"
- Join/leave notifications

### 🎨 Multiple Files
- Create multiple files
- All sync in real-time
- Switch between files
- Changes persist

## Visual Guide

```
┌─────────────────────────────────────┐
│  React Native Playground    [👥]   │  ← Click here
├─────────────────────────────────────┤
│                                     │
│  Collaboration Panel                │
│  ┌───────────────────────────────┐ │
│  │ Room: test123                 │ │
│  │                               │ │
│  │ 👤 Alice (You)                │ │
│  │ 👤 Bob                        │ │
│  │                               │ │
│  │ [Users] [Chat]                │ │
│  │                               │ │
│  │ Alice: Hey Bob!               │ │
│  │ Bob: Hi Alice!                │ │
│  │                               │ │
│  │ [Type message...]      [Send] │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

## What You'll See

### When Someone Joins:
```
System: Bob joined the room
```

### When Someone Types:
```
// Hello from Alice  ← Appears instantly
```

### When Someone Chats:
```
Alice: Can you see my code?
Bob: Yes! It's working!
```

### When Someone Leaves:
```
System: Bob left the room
```

## Troubleshooting

### Not syncing?
- ✅ Check both in same room ID
- ✅ Check backend is running
- ✅ Refresh both windows

### Can't join room?
- ✅ Make sure server is running on port 4000
- ✅ Check browser console for errors
- ✅ Try different room name

### Seeing duplicates?
- ✅ This was the bug we fixed!
- ✅ Make sure you have latest code
- ✅ Clear cache and reload

## Success Checklist

After testing, you should see:

- ✅ Code appears instantly in both windows
- ✅ Chat messages work
- ✅ User count shows "2 users online"
- ✅ Join/leave notifications appear
- ✅ Multiple files sync
- ✅ No lag or delay
- ✅ No duplicate characters

## That's It!

You now have a fully functional real-time collaborative code editor! 🎉

**Next:** Invite friends, code together, build amazing apps!

---

**Pro Tips:**
- Use descriptive room names
- Share room ID with teammates
- Use chat to coordinate
- Create multiple files for organization
- Test with 3-5 users for more fun!

**Have fun coding together! 🚀👥💻**
