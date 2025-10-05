import { useRef, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { X, FileCode } from 'lucide-react';
import { usePlaygroundStore } from '../store/playgroundStore';

export default function Editor() {
  const { openTabs, activeTabId, updateFileContent, closeTab, setActiveTab } = usePlaygroundStore();
  const isRemoteUpdate = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const activeTab = openTabs.find((tab) => tab.id === activeTabId);

  // Detect remote updates
  useEffect(() => {
    if (activeTab) {
      isRemoteUpdate.current = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        isRemoteUpdate.current = false;
      }, 100);
    }
  }, [activeTab?.content]);

  return (
    <div className="flex-1 flex flex-col glass-dark border-r border-white/10 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-lime-500/5 to-green-400/5 animate-pulse-slow"></div>
      
      {/* Tabs */}
      <div className="flex glass-dark border-b border-white/10 overflow-x-auto relative z-10">
        {openTabs.map((tab, index) => (
          <div
            key={tab.id}
            className={`flex items-center gap-3 px-5 py-3 border-r border-white/5 cursor-pointer group min-w-[140px] relative transition-all duration-300 ${
              tab.id === activeTabId
                ? 'glass bg-gradient-to-b from-green-500/20 to-transparent text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {/* File type indicator */}
            <div className={`w-2 h-2 rounded-full ${
              tab.language === 'typescript' || tab.language === 'javascript' 
                ? 'bg-green-400' 
                : tab.language === 'json' 
                  ? 'bg-lime-500'
                  : 'bg-green-500'
            }`} />
            
            <span className="text-sm font-medium truncate flex-1">{tab.name}</span>
            
            {tab.isDirty && (
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-glow-green" />
            )}
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
              className="opacity-0 group-hover:opacity-100 hover:bg-red-500/20 hover:text-red-400 rounded-md p-1 transition-all duration-200"
            >
              <X className="w-3 h-3" />
            </button>
            
            {/* Active tab indicator */}
            {tab.id === activeTabId && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-lime-500 rounded-full"></div>
            )}
          </div>
        ))}
      </div>

      {/* Editor */}
      {activeTab ? (
        <MonacoEditor
          key={activeTab.id}
          height="100%"
          language={activeTab.language}
          value={activeTab.content}
          onChange={(value) => {
            if (isRemoteUpdate.current) {
              return; // Skip if this is a remote update
            }
            const newContent = value || '';
            updateFileContent(activeTab.fileId, newContent, false);
          }}
          beforeMount={(monaco) => {
            // Disable annoying TypeScript errors
            monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
              noSemanticValidation: false,
              noSyntaxValidation: false,
              diagnosticCodesToIgnore: [1005, 2792, 2304, 7016, 7006, 2307, 2345]
            });

            monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
              target: monaco.languages.typescript.ScriptTarget.ES2020,
              allowNonTsExtensions: true,
              moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
              module: monaco.languages.typescript.ModuleKind.ESNext,
              noEmit: true,
              esModuleInterop: true,
              jsx: monaco.languages.typescript.JsxEmit.React,
              reactNamespace: 'React',
              allowJs: true,
              checkJs: false,
              strict: false,
              noImplicitAny: false,
              skipLibCheck: true,
              allowSyntheticDefaultImports: true
            });
          }}
          theme="vs-dark"
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            formatOnPaste: true,
            formatOnType: true,
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            folding: true,
            foldingStrategy: 'indentation',
            showFoldingControls: 'always',
          }}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500 relative z-10">
          <div className="text-center p-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-500/20 to-lime-500/20 rounded-full flex items-center justify-center animate-float">
              <FileCode className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-300 mb-2">No file open</h3>
            <p className="text-sm text-gray-400 max-w-md">Select a file from the sidebar to start editing, or create a new one to begin coding</p>
            <div className="mt-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs text-gray-400">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Ready to code
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
