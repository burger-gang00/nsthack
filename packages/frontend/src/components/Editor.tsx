import MonacoEditor from '@monaco-editor/react';
import { X } from 'lucide-react';
import { usePlaygroundStore } from '../store/playgroundStore';

export default function Editor() {
  const { openTabs, activeTabId, updateFileContent, closeTab, setActiveTab } = usePlaygroundStore();

  const activeTab = openTabs.find((tab) => tab.id === activeTabId);

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      {/* Tabs */}
      <div className="flex bg-gray-800 border-b border-gray-700 overflow-x-auto">
        {openTabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center gap-2 px-4 py-2 border-r border-gray-700 cursor-pointer group min-w-[120px] ${tab.id === activeTabId
                ? 'bg-gray-900 text-white'
                : 'text-gray-400 hover:bg-gray-700'
              }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="text-sm truncate flex-1">{tab.name}</span>
            {tab.isDirty && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
              className="opacity-0 group-hover:opacity-100 hover:bg-gray-600 rounded p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
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
          onChange={(value) => updateFileContent(activeTab.fileId, value || '')}
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
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <p className="text-lg mb-2">No file open</p>
            <p className="text-sm">Select a file from the sidebar to start editing</p>
          </div>
        </div>
      )}
    </div>
  );
}
