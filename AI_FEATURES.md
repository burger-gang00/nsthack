# 🤖 AI-Powered Features - Gemini Integration

## 🎯 Overview

The React Native Playground now includes a powerful AI assistant powered by **Google's Gemini 2.5 Flash** model! Get intelligent coding help, generate components, debug issues, and more - all within your development environment.

## ✨ Features

### 1. **AI Chat Assistant** 💬
- Natural conversation with context awareness
- Understands your current code
- Remembers conversation history
- Provides detailed explanations
- Suggests best practices

### 2. **Code Generation** 🎨
- **Components**: Generate React Native components from descriptions
- **Screens**: Create complete screen layouts
- **Hooks**: Generate custom React hooks
- **Utilities**: Create helper functions
- **TypeScript**: Full TypeScript support with proper types

### 3. **Code Explanation** 📖
- Explain any code in detail
- Break down complex logic
- Identify patterns and best practices
- Learn while you code

### 4. **Debugging Assistant** 🐛
- Identify bugs and issues
- Explain error messages
- Provide fixes with explanations
- Suggest preventive measures

### 5. **Code Improvement** 💡
- Performance optimization suggestions
- Readability improvements
- Best practices recommendations
- TypeScript type improvements
- Error handling enhancements

### 6. **Test Generation** 🧪
- Generate Jest tests
- React Testing Library integration
- Comprehensive test coverage
- Proper assertions and mocks

### 7. **Refactoring Suggestions** 🔄
- Identify code smells
- Suggest better patterns
- Extract reusable components
- Improve code organization

## 🚀 How to Use

### Opening the AI Assistant

The AI assistant appears as a floating button in the bottom-right corner:
```
1. Click the bot icon (🤖)
2. Chat window opens
3. Start asking questions!
```

### Quick Actions

Use one-click buttons for common tasks:

#### **Explain Code**
```
1. Open a file
2. Click "Explain" button
3. Get detailed explanation
```

#### **Debug Code**
```
1. Open file with issues
2. Click "Debug" button
3. Get bug fixes and explanations
```

#### **Improve Code**
```
1. Open any file
2. Click "Improve" button
3. Get optimization suggestions
```

#### **Generate Tests**
```
1. Open component file
2. Click "Test" button
3. Get complete test suite
```

#### **Refactor Code**
```
1. Open file to refactor
2. Click "Refactor" button
3. Get refactoring suggestions
```

### Chat Interface

#### **Ask Questions**
```
Type: "How do I create a custom hook?"
AI: Provides detailed explanation with examples
```

#### **Generate Components**
```
Type: "Create a button component with loading state"
AI: Generates complete component code
```

#### **Debug Issues**
```
Type: "Why is my component not re-rendering?"
AI: Analyzes code and explains the issue
```

#### **Learn Concepts**
```
Type: "Explain React hooks"
AI: Provides clear explanation with examples
```

## 💡 Example Use Cases

### Use Case 1: Generate a Component

**You:**
```
Create a card component with image, title, description, and action button
```

**AI Response:**
```typescript
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  onPress: () => void;
  buttonText?: string;
}

export const Card = ({ 
  imageUrl, 
  title, 
  description, 
  onPress,
  buttonText = 'Learn More' 
}: CardProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

### Use Case 2: Debug an Issue

**You:**
```
My component is not updating when state changes
```

**AI Response:**
```
This is likely due to one of these common issues:

1. **Mutating state directly**: Always use setState or state updater functions
2. **Missing dependencies**: Check useEffect dependency array
3. **Stale closure**: Function captures old state value

Here's how to fix it:

// ❌ Wrong
const increment = () => {
  count++; // Direct mutation
};

// ✅ Correct
const increment = () => {
  setCount(count + 1); // Using setState
};

// Or better with functional update:
const increment = () => {
  setCount(prev => prev + 1);
};
```

### Use Case 3: Improve Code

**You:** (Click "Improve" on this code)
```typescript
function MyComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);
  
  return <Text>{data?.name}</Text>;
}
```

**AI Response:**
```
Here are improvements for your code:

1. **Add error handling**
2. **Add loading state**
3. **Add TypeScript types**
4. **Handle cleanup**
5. **Add try-catch**

Improved version:

```typescript
interface Data {
  name: string;
}

function MyComponent() {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.example.com/data');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const result = await response.json();
        
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, []);
  
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  if (!data) return <Text>No data</Text>;
  
  return <Text>{data.name}</Text>;
}
```

## 🎨 UI Features

### Minimized Mode
- Floating bot icon in corner
- Click to expand
- Doesn't block your work

### Normal Mode
- Chat window (400x600px)
- Quick action buttons
- Message history
- Input field

### Expanded Mode
- Full-screen chat
- More space for code
- Better readability
- Toggle anytime

### Quick Actions Bar
```
[Explain] [Debug] [Improve] [Test] [Refactor]
```
One-click access to common tasks

## 🔧 Technical Details

### API Integration
- **Model**: Gemini 2.5 Flash
- **Provider**: Google GenAI
- **Thinking**: Disabled for faster responses
- **Temperature**: 0.7 (balanced creativity)
- **Max Tokens**: 2048 (responses)
- **Context**: Includes current code and files

### Features
- **Conversation History**: Last 10 messages
- **Context Awareness**: Knows your current code
- **File Context**: Aware of project structure
- **Real-time**: WebSocket communication
- **Persistent**: Per-session agent

### Security
- API key stored server-side
- No code sent to third parties (except Gemini)
- Secure WebSocket connection
- Rate limiting (coming soon)

## 💡 Pro Tips

### Tip 1: Be Specific
```
❌ "Fix my code"
✅ "Why is my useEffect running infinitely?"
```

### Tip 2: Provide Context
```
❌ "Create a button"
✅ "Create a button with loading state, disabled state, and custom colors"
```

### Tip 3: Ask Follow-ups
```
You: "Create a form component"
AI: [generates code]
You: "Add validation"
AI: [adds validation]
You: "Add error messages"
AI: [adds error handling]
```

### Tip 4: Learn While Coding
```
"Explain why we use useCallback here"
"What's the difference between useMemo and useCallback?"
"When should I use useRef?"
```

### Tip 5: Use Quick Actions
```
Open file → Click "Explain" → Instant explanation
Open file → Click "Improve" → Get suggestions
Open file → Click "Test" → Generate tests
```

## 🎯 Best Practices

### For Code Generation
1. Be descriptive about requirements
2. Specify TypeScript if needed
3. Mention styling preferences
4. Include edge cases

### For Debugging
1. Describe the expected behavior
2. Explain what's actually happening
3. Include error messages
4. Share relevant code

### For Learning
1. Ask "why" questions
2. Request examples
3. Ask for best practices
4. Compare approaches

## 🚀 Advanced Usage

### Generate Complete Features
```
"Create a login screen with email/password, validation, loading state, and error handling"
```

### Refactor Entire Components
```
"Refactor this component to use custom hooks and separate concerns"
```

### Generate Test Suites
```
"Generate comprehensive tests including edge cases and error scenarios"
```

### Architecture Advice
```
"How should I structure a large React Native app?"
"What's the best state management for my use case?"
```

## 📊 Capabilities

### What AI Can Do ✅
- Generate React Native components
- Explain code and concepts
- Debug issues and errors
- Suggest improvements
- Generate tests
- Refactor code
- Answer questions
- Provide examples
- Teach best practices

### What AI Cannot Do ❌
- Run your code
- Access external APIs
- Install packages
- Modify files directly
- Access your file system
- Remember across sessions

## 🎉 Coming Soon

### Phase 2 Features
- [ ] Code completion in editor
- [ ] Inline suggestions
- [ ] Auto-fix on save
- [ ] Voice input
- [ ] Code search
- [ ] Documentation generation

### Phase 3 Features
- [ ] Multi-file refactoring
- [ ] Architecture suggestions
- [ ] Performance analysis
- [ ] Security scanning
- [ ] Accessibility checks
- [ ] Custom AI training

## 🆘 Troubleshooting

### AI Not Responding
```
1. Check internet connection
2. Verify API key is set
3. Check console for errors
4. Refresh the page
```

### Slow Responses
```
1. Normal for complex requests
2. Gemini is processing
3. Wait for response
4. Don't send multiple requests
```

### Incorrect Responses
```
1. Rephrase your question
2. Provide more context
3. Be more specific
4. Try again with details
```

## 📚 Learn More

### Resources
- [Gemini API Docs](https://ai.google.dev/docs)
- [React Native Docs](https://reactnative.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Examples
- See EXAMPLES.md for more use cases
- Check templates for patterns
- Explore community projects

## 🎊 Summary

The AI Assistant brings the power of Gemini to your React Native development:

✅ **Intelligent code generation**  
✅ **Context-aware assistance**  
✅ **Real-time debugging help**  
✅ **Code improvement suggestions**  
✅ **Test generation**  
✅ **Learning resource**  
✅ **Always available**  

**Start using AI to code faster and smarter!** 🚀

---

**Powered by Google Gemini 2.5 Flash** ⚡
