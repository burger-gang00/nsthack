import { transform } from '@babel/standalone';

export class BundlerService {
  async bundle(code: string): Promise<string> {
    try {
      // Transform React Native code to web-compatible code
      const webCode = this.transformToWeb(code);

      // Transpile with Babel (don't transform imports/exports)
      const result = transform(webCode, {
        presets: [
          ['react', { runtime: 'classic' }],
          ['typescript', { onlyRemoveTypeImports: true }]
        ],
        filename: 'App.tsx',
        // Keep ES modules (don't transform import/export)
        sourceType: 'module',
      });

      if (!result.code) {
        throw new Error('Transpilation failed');
      }

      // Return the bundled code without wrapping (imports must stay at top level)
      return this.wrapInModule(result.code);
    } catch (error: any) {
      console.error('Bundle error:', error);
      throw new Error(`Bundle failed: ${error.message}`);
    }
  }

  private transformToWeb(code: string): string {
    // Remove React Native imports since we'll provide polyfills
    let webCode = code.replace(
      /import\s*{[^}]*}\s*from\s*['"]react-native['"]\s*;?/g,
      ''
    );

    // Replace bare React imports with CDN URLs
    webCode = webCode.replace(
      /import\s+React\s+from\s+['"]react['"]\s*;?/gi,
      "import React from 'https://esm.sh/react@18.3.1';"
    );

    // Add React Native Web polyfills
    const polyfills = `
      import ReactDOM from 'https://esm.sh/react-dom@18.3.1';
      
      // Helper to convert React Native styles to web styles
      const convertStyle = (rnStyle) => {
        if (!rnStyle) return {};
        
        // Handle array of styles
        if (Array.isArray(rnStyle)) {
          return Object.assign({}, ...rnStyle.map(s => convertStyle(s)));
        }
        
        const webStyle = {};
        for (const key in rnStyle) {
          const value = rnStyle[key];
          
          // Convert flex: 1 to flex: '1 1 0%'
          if (key === 'flex' && typeof value === 'number') {
            webStyle.flex = value === 1 ? '1 1 0%' : \`\${value} 1 0%\`;
          }
          // Convert fontWeight numbers to strings
          else if (key === 'fontWeight' && typeof value === 'number') {
            webStyle.fontWeight = String(value);
          }
          // Convert numeric values to px (except unitless properties)
          else if (typeof value === 'number' && !['opacity', 'zIndex', 'fontWeight', 'lineHeight', 'flex', 'flexGrow', 'flexShrink'].includes(key)) {
            webStyle[key] = \`\${value}px\`;
          }
          // Pass through everything else
          else {
            webStyle[key] = value;
          }
        }
        return webStyle;
      };
      
      // React Native Web polyfills
      const View = ({ style, children, ...props }) => {
        const webStyle = {
          display: 'flex',
          flexDirection: 'column',
          ...convertStyle(style)
        };
        return React.createElement('div', { style: webStyle, ...props }, children);
      };

      const Text = ({ style, children, ...props }) => {
        const webStyle = {
          fontFamily: 'system-ui, -apple-system, sans-serif',
          ...convertStyle(style)
        };
        return React.createElement('span', { style: webStyle, ...props }, children);
      };

      const TouchableOpacity = ({ style, onPress, children, activeOpacity, ...props }) => {
        const [isPressed, setIsPressed] = React.useState(false);
        
        const webStyle = {
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'opacity 0.2s',
          opacity: isPressed ? (activeOpacity || 0.7) : 1,
          ...convertStyle(style)
        };
        
        const handleMouseDown = () => setIsPressed(true);
        const handleMouseUp = () => setIsPressed(false);
        const handleMouseLeave = () => setIsPressed(false);
        
        return React.createElement('div', { 
          style: webStyle, 
          onClick: onPress,
          onMouseDown: handleMouseDown,
          onMouseUp: handleMouseUp,
          onMouseLeave: handleMouseLeave,
          ...props 
        }, children);
      };

      const StyleSheet = {
        create: (styles) => styles,
        flatten: (style) => style,
        compose: (...styles) => Object.assign({}, ...styles)
      };

      // Platform API polyfill for web
      const Platform = {
        OS: 'web',
        Version: 1,
        select: (obj) => {
          if (obj.web !== undefined) return obj.web;
          if (obj.default !== undefined) return obj.default;
          return undefined;
        },
        isTV: false,
        isTesting: false
      };
    `;

    return polyfills + '\n' + webCode;
  }

  private wrapInModule(code: string): string {
    // Extract all import statements (must be at top level)
    const importRegex = /import\s+.*?from\s+['"][^'"]+['"];?\s*\n?/g;
    const imports = code.match(importRegex) || [];
    const codeWithoutImports = code.replace(importRegex, '').trim();

    // Ensure we have the required imports
    const hasReactImport = imports.some(imp => imp.includes('react@18.3.1'));
    const hasReactDOMImport = imports.some(imp => imp.includes('react-dom@18.3.1'));

    // Build final module with imports at top
    return `
${imports.join('\n')}

${codeWithoutImports}

// Render the app to the DOM
(function() {
  const root = document.getElementById('root');
  if (root && typeof App !== 'undefined') {
    try {
      const appElement = React.createElement(App);
      ReactDOM.createRoot(root).render(appElement);
    } catch (error) {
      console.error('Render error:', error);
      root.innerHTML = '<div style="padding: 20px; color: red;">Error rendering app: ' + error.message + '</div>';
    }
  } else {
    console.error('Root element or App not found', { root, App: typeof App });
  }
})();
    `.trim();
  }
}
