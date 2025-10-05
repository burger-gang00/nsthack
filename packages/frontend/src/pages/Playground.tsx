import { useEffect } from 'react';
import { usePlaygroundStore } from '../store/playgroundStore';
import Header from '../components/Header';
import Editor from '../components/Editor';
import Preview from '../components/Preview';
import Console from '../components/Console';
import Sidebar from '../components/Sidebar';
import AIChat from '../components/AIChat';
import Notifications from '../components/Notifications';
import CollaborationPanel from '../components/CollaborationPanel';
import LivePresence from '../components/LivePresence';
import CursorPresence from '../components/CursorPresence';
import FileLock from '../components/FileLock';

function Playground() {
  const { connect, isConnected, socket } = usePlaygroundStore();

  // Detect if mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isShareURL = window.location.pathname.startsWith('/share/');
  const showMobilePreview = isMobile && isShareURL;

  useEffect(() => {
    connect();
  }, [connect]);

  // Auto-load shared project (but don't auto-join - let user join manually)
  useEffect(() => {
    const loadSharedProject = async () => {
      const path = window.location.pathname;
      const match = path.match(/^\/share\/([a-zA-Z0-9_-]+)$/);
      
      if (match && socket) {
        const shareId = match[1];
        console.log('Loading shared project:', shareId);
        try {
          const response = await fetch(`http://localhost:4000/api/share/${shareId}`);
          const data = await response.json();
          
          console.log('Loaded project data:', data);
          
          if (data.success && data.project) {
            // Load project files into the store
            const store = usePlaygroundStore.getState();
            
            if (data.project.files && Array.isArray(data.project.files)) {
              console.log('Setting files:', data.project.files.length, 'files');
              // Use the store's setter to properly update files
              usePlaygroundStore.setState({ files: data.project.files });
              
              // Open the first file if available
              const firstFile = data.project.files.find((f: any) => f.type === 'file');
              if (firstFile) {
                store.openFile(firstFile.id);
              }
            }
            
            // Store the share ID for auto-sync
            localStorage.setItem('currentShareId', shareId);
            console.log('✓ Shared project loaded successfully');
          } else {
            console.error('No project data found');
          }
        } catch (error) {
          console.error('Failed to load shared project:', error);
        }
      }
    };

    if (socket?.connected) {
      loadSharedProject();
    }
  }, [socket]);

  // Mobile fullscreen preview mode
  if (showMobilePreview) {
    return (
      <div className="h-screen flex flex-col bg-gray-900">
        <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
              <span className="text-white text-xs">▶</span>
            </div>
            <span className="text-white text-sm font-medium">Live Preview</span>
          </div>
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
        </div>
        <div className="flex-1 overflow-hidden">
          <Preview />
        </div>
      </div>
    );
  }

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
      <LivePresence />
      <CursorPresence />
      <FileLock />
      <Notifications />
      {!isConnected && (
        <div className="fixed top-16 right-4 bg-yellow-500 text-black px-4 py-2 rounded shadow-lg z-50">
          Connecting to server...
        </div>
      )}
    </div>
  );
}

export default Playground;
