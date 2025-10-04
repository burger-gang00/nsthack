import { Play, Share2, Download, Settings } from 'lucide-react';
import { usePlaygroundStore } from '../store/playgroundStore';

export default function Header() {
  const { isConnected } = usePlaygroundStore();

  return (
    <header className="h-14 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Play className="w-5 h-5 text-white" fill="white" />
          </div>
          <h1 className="text-xl font-bold text-white">RN Playground</h1>
        </div>
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
      </div>

      <div className="flex items-center gap-2">
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors">
          <Play className="w-4 h-4" />
          Run
        </button>
        <button className="p-2 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors">
          <Download className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
