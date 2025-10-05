import { useState } from 'react';
import { Play, Share2, Download, Settings, Sun, Moon, Monitor, User, Save } from 'lucide-react';
import { usePlaygroundStore } from '../store/playgroundStore';
import { useThemeStore } from '../store/themeStore';
import { useAuthStore } from '../store/authStore';
import ShareModal from './ShareModal';
import DownloadModal from './DownloadModal';
import SettingsModal from './SettingsModal';
import ScreenRecorder from './ScreenRecorder';

export default function Header() {
  const { isConnected, files, openTabs } = usePlaygroundStore();
  const { mode, setMode } = useThemeStore();
  const { isAuthenticated, user, token } = useAuthStore();
  const [showShare, setShowShare] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const currentShareId = localStorage.getItem('currentShareId');

  const savePlayground = async () => {
    if (!isAuthenticated || !token) {
      alert('Please sign in to save playgrounds');
      return;
    }

    const name = prompt('Enter playground name:', 'My Playground');
    if (!name) return;

    setIsSaving(true);
    try {
      const response = await fetch('http://localhost:4000/api/playgrounds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, files }),
      });
      const data = await response.json();
      if (data.success) {
        setTimeout(() => setIsSaving(false), 1500);
      } else {
        alert('Failed to save: ' + data.error);
        setIsSaving(false);
      }
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Failed to save playground');
      setIsSaving(false);
    }
  };

  const quickSync = async () => {
    if (!currentShareId) return;
    setIsSyncing(true);
    try {
      const response = await fetch('http://localhost:4000/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shareId: currentShareId,
          projectData: { files, openTabs },
        }),
      });
      const data = await response.json();
      if (data.success) {
        // Show success briefly
        setTimeout(() => setIsSyncing(false), 1000);
      }
    } catch (error) {
      console.error('Failed to sync:', error);
      setIsSyncing(false);
    }
  };

  const getThemeIcon = () => {
    switch (mode) {
      case 'light': return <Sun className="w-5 h-5" />;
      case 'dark': return <Moon className="w-5 h-5" />;
      case 'auto': return <Monitor className="w-5 h-5" />;
    }
  };

  return (
    <>
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
          <ScreenRecorder />
          
          {isAuthenticated && (
            <button
              onClick={savePlayground}
              disabled={isSaving}
              className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                isSaving 
                  ? 'bg-green-600 text-white' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
              title="Save to your account"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saved!' : 'Save'}
            </button>
          )}
          
          {currentShareId && (
            <button
              onClick={quickSync}
              disabled={isSyncing}
              className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                isSyncing 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
              title="Sync shared project"
            >
              <Share2 className="w-4 h-4" />
              {isSyncing ? '✓ Synced' : 'Sync'}
            </button>
          )}
          
          <button
            onClick={() => setShowShare(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
            title="Share Project"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>

          <button
            onClick={() => setShowDownload(true)}
            className="p-2 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
            title="Download Project"
          >
            <Download className="w-5 h-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-2 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
              title="Change Theme"
            >
              {getThemeIcon()}
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 top-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 min-w-[150px]">
                <button
                  onClick={() => {
                    setMode('light');
                    setShowThemeMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-2 text-gray-300"
                >
                  <Sun className="w-4 h-4" />
                  Light
                </button>
                <button
                  onClick={() => {
                    setMode('dark');
                    setShowThemeMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-2 text-gray-300"
                >
                  <Moon className="w-4 h-4" />
                  Dark
                </button>
                <button
                  onClick={() => {
                    setMode('auto');
                    setShowThemeMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-2 text-gray-300"
                >
                  <Monitor className="w-4 h-4" />
                  Auto
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowSettings(true)}
            className="p-2 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>

          {isAuthenticated ? (
            <a
              href="/profile"
              className="p-2 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors flex items-center gap-2"
              title={`Profile - ${user?.name}`}
            >
              <User className="w-5 h-5" />
            </a>
          ) : (
            <a
              href="/signin"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Sign In
            </a>
          )}
        </div>
      </header>

      <ShareModal
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        projectData={{ files, openTabs }}
      />

      <DownloadModal
        isOpen={showDownload}
        onClose={() => setShowDownload(false)}
        projectData={{ files, openTabs }}
      />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
}
