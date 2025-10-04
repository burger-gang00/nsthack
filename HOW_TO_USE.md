# 📖 How to Use - Complete Guide

## 🎯 Quick Start

### Starting the Playground
```bash
npm run dev
```
Open: http://localhost:3000

---

## 📁 File Management

### Creating Files

#### Method 1: In Root Folder
```
1. Click Files tab (📁)
2. Click + button
3. Type: MyComponent.tsx
4. Press Enter
5. File opens automatically!
```

#### Method 2: Inside Any Folder ⭐ NEW!
```
1. Right-click on a folder
2. Select "New File"
3. Type: Button.tsx
4. Press Enter
5. File created inside folder!
```

### Creating Folders

#### Method 1: In Root
```
1. Click Files tab
2. Click folder icon
3. Type: components
4. Press Enter
```

#### Method 2: Inside Any Folder ⭐ NEW!
```
1. Right-click on a folder
2. Select "New Folder"
3. Type: screens
4. Press Enter
5. Folder created inside!
```

### Renaming Files/Folders
```
1. Right-click on file/folder
2. Select "Rename"
3. Type new name
4. Press Enter (or click outside)
```

### Deleting Files/Folders
```
1. Right-click on file/folder
2. Select "Delete"
3. Confirm deletion
```

---

## 📑 Working with Tabs

### Opening Files
```
Click any file → Opens in new tab
```

### Switching Tabs
```
Click tab → Switches to that file
Cmd/Ctrl + Tab → Next tab
```

### Closing Tabs
```
Click X on tab → Closes that tab
Cmd/Ctrl + W → Close current tab
```

### Unsaved Changes
```
Blue dot on tab → File has unsaved changes
```

---

## 📱 Device Preview

### Selecting Device Type
```
Click icons:
💻 Web
📱 iOS
📱 Android
```

### Choosing Device Model
```
1. Click device dropdown
2. Select from 15+ devices:
   - iPhone 15 Pro/Max
   - iPhone 14/SE
   - iPad Pro/Air/Mini
   - Pixel 8/7
   - Galaxy S24/Fold
   - Web sizes
```

### Orientation
```
Click rotate button → Toggle landscape/portrait
```

### Zoom
```
Click + → Zoom in
Click - → Zoom out
Range: 50% - 200%
```

---

## 📚 Using Templates

### Loading Templates
```
1. Click Templates tab (📚)
2. Click any template:
   - Counter App
   - Todo List
   - Animation Demo
3. Code loads into App.tsx
4. Preview updates automatically
```

---

## 💻 Code Editing

### Editor Features
- ✅ Syntax highlighting
- ✅ Auto-completion
- ✅ Error detection
- ✅ Minimap
- ✅ Code folding
- ✅ Format on paste

### Keyboard Shortcuts
```
Cmd/Ctrl + S        → Save
Cmd/Ctrl + /        → Toggle comment
Cmd/Ctrl + D        → Duplicate line
Cmd/Ctrl + F        → Find
Cmd/Ctrl + H        → Replace
Cmd/Ctrl + Z        → Undo
Cmd/Ctrl + Shift + Z → Redo
```

---

## 🎨 Building a Multi-File App

### Step-by-Step Example

#### 1. Create Folder Structure
```
1. Create folder: "components"
2. Create folder: "screens"
3. Create folder: "utils"
```

#### 2. Create Button Component
```
1. Right-click "components"
2. Select "New File"
3. Type: Button.tsx
4. Add code:
```

```typescript
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
}

export const Button = ({ title, onPress }: Props) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4ecca3',
    padding: 16,
    borderRadius: 8,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
```

#### 3. Create Home Screen
```
1. Right-click "screens"
2. Select "New File"
3. Type: HomeScreen.tsx
4. Add code:
```

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../components/Button';

export const HomeScreen = () => {
  const [count, setCount] = React.useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.count}>{count}</Text>
      <Button 
        title="Increment" 
        onPress={() => setCount(count + 1)} 
      />
    </View>
  );
};

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

#### 4. Update App.tsx
```
1. Click App.tsx
2. Update code:
```

```typescript
import React from 'react';
import { HomeScreen } from './screens/HomeScreen';

export default function App() {
  return <HomeScreen />;
}
```

#### 5. See It Live!
```
Preview updates automatically
Try different devices
Test interactions
```

---

## 🎯 Common Workflows

### Workflow 1: Quick Prototype
```
1. Load a template
2. Modify the code
3. See instant results
4. Try different devices
5. Share with team
```

### Workflow 2: Build Feature
```
1. Create component folder
2. Create component file
3. Write component code
4. Import in App.tsx
5. Test in preview
```

### Workflow 3: Organize Project
```
1. Create folder structure
2. Move files to folders (drag-drop coming soon)
3. Update imports
4. Test everything works
5. Continue development
```

---

## 🐛 Troubleshooting

### Preview Not Updating
```
1. Check console for errors
2. Fix syntax errors
3. Save file (Cmd/Ctrl + S)
4. Refresh if needed
```

### File Not Opening
```
1. Check file exists in tree
2. Try closing other tabs
3. Click file again
4. Check console for errors
```

### Context Menu Not Showing
```
1. Right-click directly on folder
2. Wait for menu to appear
3. Click outside to close
4. Try again
```

### Folder Not Expanding
```
1. Click chevron icon
2. Or double-click folder name
3. Check if folder has children
```

---

## 💡 Pro Tips

### Tip 1: Organize Early
```
Create folder structure before writing code:
- components/
- screens/
- utils/
- hooks/
- types/
```

### Tip 2: Use TypeScript
```
Name files with .tsx or .ts
Get type checking and autocomplete
Catch errors before running
```

### Tip 3: Test on Multiple Devices
```
Switch between devices frequently
Check responsive behavior
Test on iPhone, iPad, Android
```

### Tip 4: Use Templates
```
Start with a template
Modify to your needs
Learn from examples
Save time
```

### Tip 5: Keep Files Small
```
One component per file
Extract reusable logic
Use meaningful names
Keep it organized
```

---

## 🎨 Best Practices

### File Naming
```
✅ PascalCase for components: Button.tsx
✅ camelCase for utilities: helpers.ts
✅ Descriptive names: UserProfile.tsx
❌ Avoid: comp1.tsx, file.tsx
```

### Folder Structure
```
✅ Group by feature or type
✅ Keep nesting shallow (2-3 levels)
✅ Use clear folder names
❌ Avoid deep nesting
```

### Code Organization
```
✅ One component per file
✅ Export at bottom
✅ Imports at top
✅ Styles at bottom
```

### Import Paths
```
✅ Relative imports: './components/Button'
✅ Clear paths: '../utils/helpers'
❌ Avoid: '../../../../../../utils'
```

---

## 🚀 Advanced Usage

### Multi-Tab Workflow
```
1. Open multiple related files
2. Switch between them
3. Copy/paste between files
4. See changes in real-time
```

### Component Development
```
1. Create component file
2. Write component code
3. Export component
4. Import in parent
5. Test in preview
```

### Rapid Prototyping
```
1. Load template
2. Duplicate and modify
3. Test variations
4. Pick best version
5. Refine and polish
```

---

## 📊 Keyboard Shortcuts Reference

### File Operations
```
F2                  → Rename
Delete              → Delete
Enter               → Confirm
Escape              → Cancel
```

### Editor
```
Cmd/Ctrl + S        → Save
Cmd/Ctrl + /        → Comment
Cmd/Ctrl + D        → Duplicate
Cmd/Ctrl + F        → Find
Cmd/Ctrl + Z        → Undo
```

### Tabs
```
Cmd/Ctrl + W        → Close tab
Cmd/Ctrl + Tab      → Next tab
Cmd/Ctrl + Shift + Tab → Previous tab
```

### Navigation
```
Cmd/Ctrl + P        → Quick open (coming soon)
Cmd/Ctrl + B        → Toggle sidebar (coming soon)
```

---

## 🎉 You're Ready!

You now know how to:
✅ Create files and folders
✅ Organize your project
✅ Work with multiple tabs
✅ Use device preview
✅ Load templates
✅ Build multi-file apps

**Start building amazing React Native apps!** 🚀

---

## 🆘 Need More Help?

### Documentation
- [README.md](./README.md) - Overview
- [LATEST_UPDATES.md](./LATEST_UPDATES.md) - Latest features
- [NEXT_GEN_FEATURES.md](./NEXT_GEN_FEATURES.md) - Future features
- [GET_STARTED_NOW.md](./GET_STARTED_NOW.md) - Quick start

### Support
- GitHub Issues
- Discussions
- Discord (coming soon)
- Email support

**Happy Coding! 💻✨**
