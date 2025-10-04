import { useEffect } from 'react';
import { usePlaygroundStore } from './store/playgroundStore';
import Header from './components/Header';
import Editor from './components/Editor';
import Preview from './components/Preview';
import Console from './components/Console';
import Sidebar from './components/Sidebar';
import AIChat from './components/AIChat';
import Notifications from './components/Notifications';
import CollaborationPanel from './components/CollaborationPanel';

function App() {
  const { connect, isConnected } = usePlaygroundStore();

  useEffect(() => {
    connect();
  }, [connect]);

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex">
          <Editor />
          <Preview />
        </div>
      </div>
      <Console />
      <AIChat />
      <CollaborationPanel />
      <Notifications />
      {!isConnected && (
        <div className="fixed top-16 right-4 bg-yellow-500 text-black px-4 py-2 rounded shadow-lg z-50">
          Connecting to server...
        </div>
      )}
    </div>
  );
}

export default App;
