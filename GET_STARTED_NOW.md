# 🚀 GET STARTED NOW!

## ⚡ Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
npm install
cd packages/frontend && npm install
cd ../backend && npm install
cd ../..
```

### Step 2: Start Servers
```bash
npm run dev
```

### Step 3: Open Browser
```
http://localhost:3000
```

**That's it! You're ready to code! 🎉**

---

## 🎯 What You'll See

```
┌──────────────────────────────────────────────────────────────┐
│  🎮 RN Playground  ● Connected    ▶ Run  🔗 Share  ⚙️       │
├──────────┬───────────────────────┬───────────────────────────┤
│          │                       │                           │
│  📁      │  [App.tsx] [×]        │    ┌─────────────────┐   │
│  Files   │  ┌─────────────────┐  │    │                 │   │
│          │  │ import React...  │  │    │   iPhone 15     │   │
│  📦      │  │                  │  │    │                 │   │
│  Pkgs    │  │ export default   │  │    │  ┌───────────┐  │   │
│          │  │   function App() │  │    │  │  Counter  │  │   │
│  📚      │  │   {              │  │    │  │           │  │   │
│  Temps   │  │     return (     │  │    │  │    42     │  │   │
│          │  │       <View>     │  │    │  │           │  │   │
│  📖      │  │         ...      │  │    │  │ [+] [-]   │  │   │
│  Exmpl   │  │       </View>    │  │    │  └───────────┘  │   │
│          │  │     )            │  │    │                 │   │
│          │  │   }              │  │    └─────────────────┘   │
│          │  └─────────────────┘  │                           │
├──────────┴───────────────────────┴───────────────────────────┤
│  💻 Console                                  🗑️  ⬇️          │
│  [info] Connected to server                                 │
│  [log] Bundle compiled successfully                         │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎨 Try These Features

### 1. Create a New File
```
1. Click the Files tab (📁)
2. Click the + button
3. Type: Button.tsx
4. Press Enter
5. Start coding!
```

### 2. Create a Folder
```
1. Click the folder icon
2. Type: components
3. Press Enter
4. Drag files into it (coming soon)
```

### 3. Open Multiple Files
```
1. Click on App.tsx
2. Click on Button.tsx
3. Both open in tabs
4. Switch between them
```

### 4. Try Different Devices
```
1. Click the device dropdown
2. Select "iPhone 15 Pro"
3. See your app on iPhone
4. Try iPad, Android, Web
```

### 5. Load a Template
```
1. Click Templates tab (📚)
2. Click "Counter App"
3. Code loads instantly
4. Preview updates automatically
```

---

## 💡 Quick Tips

### Keyboard Shortcuts
```
Cmd/Ctrl + S        Save file
Cmd/Ctrl + W        Close tab
Cmd/Ctrl + Tab      Switch tabs
F2                  Rename file
Delete              Delete file
Cmd/Ctrl + /        Toggle comment
```

### File Operations
```
Right-click file    → Context menu
Click file          → Open in tab
Click X on tab      → Close tab
Blue dot on tab     → Unsaved changes
```

### Device Controls
```
Web/iOS/Android     → Device type
Dropdown            → Device model
Rotate button       → Landscape mode
+/- buttons         → Zoom in/out
```

---

## 📚 Example: Build a Multi-File App

### Step 1: Create Structure
```
1. Create folder: components
2. Create file: components/Button.tsx
3. Create file: components/Header.tsx
4. Keep: App.tsx
```

### Step 2: Write Button Component
```typescript
// components/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

export const Button = ({ title, onPress }: ButtonProps) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4ecca3',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

### Step 3: Use in App
```typescript
// App.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from './components/Button';

export default function App() {
  const [count, setCount] = React.useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My App</Text>
      <Text style={styles.count}>{count}</Text>
      <Button 
        title="Increment" 
        onPress={() => setCount(count + 1)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  count: {
    fontSize: 64,
    color: '#4ecca3',
    marginBottom: 20,
  },
});
```

### Step 4: See It Live!
- Preview updates automatically
- Try different devices
- Test on iPhone, iPad, Android
- Zoom in for details

---

## 🎯 Common Tasks

### Task 1: Rename a File
```
1. Right-click the file
2. Click "Rename"
3. Type new name
4. Press Enter
```

### Task 2: Delete a File
```
1. Right-click the file
2. Click "Delete"
3. Confirm deletion
```

### Task 3: Switch Devices
```
1. Click device type (iOS/Android/Web)
2. Select model from dropdown
3. Preview updates instantly
```

### Task 4: Close All Tabs
```
1. Click X on each tab
2. Or close browser tab
3. Reopen to start fresh
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 4000
lsof -ti:4000 | xargs kill -9

# Restart
npm run dev
```

### WebSocket Not Connecting
```
1. Check backend is running (port 4000)
2. Check browser console for errors
3. Refresh the page
4. Check firewall settings
```

### Preview Not Updating
```
1. Check console for errors
2. Try refreshing preview
3. Check code for syntax errors
4. Restart servers
```

### Files Not Saving
```
1. Check for syntax errors
2. Look for red underlines
3. Check console for errors
4. Try closing and reopening file
```

---

## 📖 Learn More

### Documentation
- [README.md](./README.md) - Project overview
- [WHATS_NEW.md](./WHATS_NEW.md) - New features
- [ADVANCED_FEATURES.md](./ADVANCED_FEATURES.md) - Future features
- [COMPLETE_FEATURE_LIST.md](./COMPLETE_FEATURE_LIST.md) - All features

### Guides
- [QUICKSTART.md](./QUICKSTART.md) - Quick setup
- [ARCHITECTURE.md](./ARCHITECTURE.md) - How it works
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deploy to production
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribute code

### Visual
- [SHOWCASE.md](./SHOWCASE.md) - Visual tour
- [PROJECT_TREE.md](./PROJECT_TREE.md) - File structure
- [WELCOME.md](./WELCOME.md) - Welcome page

---

## 🎉 You're Ready!

You now have:
✅ A professional React Native playground
✅ Multi-file support
✅ 15+ device presets
✅ Real-time preview
✅ Beautiful UI
✅ Complete documentation

**Start building amazing React Native apps!** 🚀

---

## 🆘 Need Help?

### Quick Links
- 📖 [Full Documentation](./INDEX.md)
- 🐛 [Report Issues](https://github.com/yourusername/rn-playground/issues)
- 💬 [Discussions](https://github.com/yourusername/rn-playground/discussions)
- 📧 [Email Support](mailto:support@example.com)

### Community
- Discord Server (coming soon)
- Twitter: @rnplayground
- YouTube: RN Playground Tutorials

---

**Happy Coding! 💻✨**

*Built with ❤️ for the React Native community*
