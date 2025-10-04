import { Terminal, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { usePlaygroundStore } from '../store/playgroundStore';

export default function Console() {
  const { logs, clearLogs } = usePlaygroundStore();
  const [isExpanded, setIsExpanded] = useState(true);

  const getLogColor = (type: string) => {
    switch (type) {
      case 'error': return 'text-red-400';
      case 'warn': return 'text-yellow-400';
      case 'info': return 'text-blue-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className={`bg-gray-800 border-t border-gray-700 flex flex-col transition-all ${
      isExpanded ? 'h-48' : 'h-10'
    }`}>
      <div className="h-10 flex items-center justify-between px-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">Console</span>
          {logs.length > 0 && (
            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
              {logs.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearLogs}
            className="p-1 hover:bg-gray-700 text-gray-400 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-700 text-gray-400 rounded transition-colors"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="flex-1 overflow-y-auto p-2 font-mono text-sm">
          {logs.length === 0 ? (
            <div className="text-gray-500 text-center py-8">No console output</div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="py-1 px-2 hover:bg-gray-700/50 rounded">
                <span className={getLogColor(log.type)}>[{log.type}]</span>{' '}
                <span className="text-gray-300">{log.message}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
