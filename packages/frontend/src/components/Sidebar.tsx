import { FileCode, Package, BookOpen, Layers } from 'lucide-react';
import { useState } from 'react';
import FileTree from './FileTree';
import { usePlaygroundStore } from '../store/playgroundStore';
import { counterTemplate } from '../templates/counter';
import { todoTemplate } from '../templates/todo';
import { animationTemplate } from '../templates/animation';

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState<'files' | 'packages' | 'templates' | 'examples'>('files');
  const { updateFileContent, openFile, files } = usePlaygroundStore();

  const loadTemplate = (_name: string, content: string) => {
    // Find or create App.tsx
    const findAppFile = (nodes: any[]): any => {
      for (const node of nodes) {
        if (node.name === 'App.tsx' && node.type === 'file') return node;
        if (node.children) {
          const found = findAppFile(node.children);
          if (found) return found;
        }
      }
      return null;
    };

    const appFile = findAppFile(files);
    if (appFile) {
      updateFileContent(appFile.id, content);
      openFile(appFile.id);
    }
  };

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => setActiveTab('files')}
          className={`flex-1 p-3 flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'files' ? 'bg-gray-900 text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:bg-gray-700'
          }`}
          title="Files"
        >
          <FileCode className="w-4 h-4" />
        </button>
        <button
          onClick={() => setActiveTab('packages')}
          className={`flex-1 p-3 flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'packages' ? 'bg-gray-900 text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:bg-gray-700'
          }`}
          title="Packages"
        >
          <Package className="w-4 h-4" />
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`flex-1 p-3 flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'templates' ? 'bg-gray-900 text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:bg-gray-700'
          }`}
          title="Templates"
        >
          <Layers className="w-4 h-4" />
        </button>
        <button
          onClick={() => setActiveTab('examples')}
          className={`flex-1 p-3 flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'examples' ? 'bg-gray-900 text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:bg-gray-700'
          }`}
          title="Examples"
        >
          <BookOpen className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab === 'files' && <FileTree />}

        {activeTab === 'packages' && (
          <div className="p-4 overflow-y-auto h-full">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Installed Packages</h3>
            <div className="space-y-3">
              <div className="bg-gray-900 p-3 rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white">react</span>
                  <span className="text-xs text-gray-400">^18.3.1</span>
                </div>
                <p className="text-xs text-gray-500">JavaScript library for building UIs</p>
              </div>
              <div className="bg-gray-900 p-3 rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white">react-native</span>
                  <span className="text-xs text-gray-400">^0.74.0</span>
                </div>
                <p className="text-xs text-gray-500">Framework for building native apps</p>
              </div>
              <div className="bg-gray-900 p-3 rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white">zustand</span>
                  <span className="text-xs text-gray-400">^4.5.2</span>
                </div>
                <p className="text-xs text-gray-500">State management solution</p>
              </div>
              <div className="bg-gray-900 p-3 rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white">axios</span>
                  <span className="text-xs text-gray-400">^1.12.2</span>
                </div>
                <p className="text-xs text-gray-500">HTTP client for the browser</p>
              </div>
              <div className="bg-gray-900 p-3 rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white">expo</span>
                  <span className="text-xs text-gray-400">~49.0.0</span>
                </div>
                <p className="text-xs text-gray-500">Platform for universal React apps</p>
              </div>
              <div className="bg-gray-900 p-3 rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white">@babel/standalone</span>
                  <span className="text-xs text-gray-400">^7.24.4</span>
                </div>
                <p className="text-xs text-gray-500">Babel compiler for JavaScript</p>
              </div>
              <div className="bg-gray-900 p-3 rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white">socket.io-client</span>
                  <span className="text-xs text-gray-400">^4.7.5</span>
                </div>
                <p className="text-xs text-gray-500">Real-time communication</p>
              </div>
              <div className="bg-gray-900 p-3 rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white">nanoid</span>
                  <span className="text-xs text-gray-400">^5.0.7</span>
                </div>
                <p className="text-xs text-gray-500">Unique ID generator</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-900 rounded text-xs text-gray-400">
              💡 Install more packages using terminal:<br/>
              <code className="text-green-400">npm install &lt;package-name&gt;</code>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="p-4 overflow-y-auto h-full">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Quick Start Templates</h3>
            <div className="space-y-2">
              <button
                onClick={() => loadTemplate('Counter App', counterTemplate)}
                className="w-full p-3 text-left bg-gray-900 hover:bg-gray-700 rounded transition-colors group"
              >
                <div className="text-sm font-medium text-white mb-1">Counter App</div>
                <p className="text-xs text-gray-400">Simple counter with increment/reset</p>
              </button>
              <button
                onClick={() => loadTemplate('Todo List', todoTemplate)}
                className="w-full p-3 text-left bg-gray-900 hover:bg-gray-700 rounded transition-colors group"
              >
                <div className="text-sm font-medium text-white mb-1">Todo List</div>
                <p className="text-xs text-gray-400">Task manager with add/delete</p>
              </button>
              <button
                onClick={() => loadTemplate('Animation', animationTemplate)}
                className="w-full p-3 text-left bg-gray-900 hover:bg-gray-700 rounded transition-colors group"
              >
                <div className="text-sm font-medium text-white mb-1">Animation Demo</div>
                <p className="text-xs text-gray-400">Scale and rotation animations</p>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="p-4 overflow-y-auto h-full">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Code Examples</h3>
            <div className="space-y-2">
              <button className="w-full p-3 text-left bg-gray-900 hover:bg-gray-700 rounded transition-colors">
                <div className="text-sm font-medium text-white mb-1">🎨 Animations</div>
                <p className="text-xs text-gray-400">Transform, opacity, and more</p>
              </button>
              <button className="w-full p-3 text-left bg-gray-900 hover:bg-gray-700 rounded transition-colors">
                <div className="text-sm font-medium text-white mb-1">🌐 API Calls</div>
                <p className="text-xs text-gray-400">Fetch data from REST APIs</p>
              </button>
              <button className="w-full p-3 text-left bg-gray-900 hover:bg-gray-700 rounded transition-colors">
                <div className="text-sm font-medium text-white mb-1">📝 Forms</div>
                <p className="text-xs text-gray-400">Input validation and handling</p>
              </button>
              <button className="w-full p-3 text-left bg-gray-900 hover:bg-gray-700 rounded transition-colors">
                <div className="text-sm font-medium text-white mb-1">🧭 Navigation</div>
                <p className="text-xs text-gray-400">Stack and tab navigation</p>
              </button>
              <button className="w-full p-3 text-left bg-gray-900 hover:bg-gray-700 rounded transition-colors">
                <div className="text-sm font-medium text-white mb-1">🎯 State Management</div>
                <p className="text-xs text-gray-400">Context, Redux, Zustand</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
