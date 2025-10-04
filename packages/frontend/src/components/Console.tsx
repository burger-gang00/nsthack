import { Terminal, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { usePlaygroundStore } from '../store/playgroundStore';

export default function Console() {
  const { logs, clearLogs, socket } = usePlaygroundStore();
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<'console' | 'terminal'>('console');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: string }>>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [currentDir, setCurrentDir] = useState('~/project');
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  useEffect(() => {
    if (!socket) return;

    socket.on('terminal:output', ({ output, cwd }: any) => {
      setTerminalHistory(prev => {
        const newHistory = [...prev];
        if (newHistory.length > 0) {
          newHistory[newHistory.length - 1].output = output;
        }
        return newHistory;
      });
      if (cwd) setCurrentDir(cwd);
    });

    return () => {
      socket.off('terminal:output');
    };
  }, [socket]);

  const executeCommand = () => {
    if (!currentCommand.trim() || !socket) return;

    setTerminalHistory(prev => [...prev, { command: currentCommand, output: '' }]);
    socket.emit('terminal:command', { command: currentCommand });
    setCurrentCommand('');
  };

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
      isExpanded ? 'h-64' : 'h-10'
    }`}>
      <div className="h-10 flex items-center justify-between px-4 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-gray-400" />
            <button
              onClick={() => setActiveTab('console')}
              className={`text-sm transition-colors ${
                activeTab === 'console' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Console
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className={`text-sm transition-colors ${
                activeTab === 'terminal' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Terminal
            </button>
          </div>
          {activeTab === 'console' && logs.length > 0 && (
            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
              {logs.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => activeTab === 'console' ? clearLogs() : setTerminalHistory([])}
            className="p-1 hover:bg-gray-700 text-gray-400 rounded transition-colors"
            title="Clear"
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
        <>
          {activeTab === 'console' ? (
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
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-2 font-mono text-sm">
                {terminalHistory.length === 0 ? (
                  <div className="text-gray-500">
                    <div>React Native Playground Terminal</div>
                    <div className="mt-2 text-xs">
                      Available commands: npm install, ls, cat, pwd, echo, clear, etc.
                    </div>
                  </div>
                ) : (
                  terminalHistory.map((entry, idx) => (
                    <div key={idx} className="mb-2">
                      <div className="text-green-400">
                        $ {entry.command}
                      </div>
                      {entry.output && (
                        <div className="text-gray-300 whitespace-pre-wrap">{entry.output}</div>
                      )}
                    </div>
                  ))
                )}
                <div ref={terminalEndRef} />
              </div>
              <div className="border-t border-gray-700 p-2 flex items-center gap-2 font-mono text-sm">
                <span className="text-blue-400">{currentDir}</span>
                <span className="text-green-400">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') executeCommand();
                  }}
                  className="flex-1 bg-transparent text-gray-300 outline-none"
                  placeholder="Type a command..."
                  autoFocus
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
