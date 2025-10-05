import { useState } from 'react';
import { Play, Share2, Download, Settings, Sun, Moon, Monitor, User, Save } from 'lucide-react';
import { usePlaygroundStore } from '../store/playgroundStore';
import { useThemeStore } from '../store/themeStore';
import { useAuthStore } from '../store/authStore';
import { API_URL } from '../config';
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
      const response = await fetch(`${API_URL}/api/playgrounds`, {
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
      const response = await fetch(`${API_URL}/api/share`, {
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
      <header className="h-16 glass-dark border-b border-white/10 flex items-center justify-between px-6 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-lime-500/10 to-green-400/10 animate-pulse-slow"></div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 via-lime-500 to-green-400 rounded-xl flex items-center justify-center shadow-glow-green animate-glow">
              <Play className="w-5 h-5 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text-green">RN Playground</h1>
              <div className="text-xs text-gray-400 font-medium">Real-time Collaboration</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'} shadow-lg`} />
            <span className={`text-xs font-medium ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <ScreenRecorder />
          
          {isAuthenticated && (
            <button
              onClick={savePlayground}
              disabled={isSaving}
              className={`px-4 py-2.5 rounded-xl flex items-center gap-2 font-medium transition-all duration-300 ${
                isSaving 
                  ? 'glass bg-green-500/20 text-green-400 shadow-glow-green animate-scale-in' 
                  : 'glass bg-green-500/20 hover:bg-green-500/30 text-green-300 hover:text-green-200 hover:shadow-glow-green hover:scale-105'
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
              className={`px-4 py-2.5 rounded-xl flex items-center gap-2 font-medium transition-all duration-300 ${
                isSyncing 
                  ? 'glass bg-green-500/20 text-green-400 shadow-glow animate-scale-in' 
                  : 'glass bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 hover:text-gray-200 hover:shadow-lg hover:scale-105'
              }`}
              title="Sync shared project"
            >
              <Share2 className="w-4 h-4" />
              {isSyncing ? '✓ Synced' : 'Sync'}
            </button>
          )}
          
          <button
            onClick={() => setShowShare(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-lime-600 hover:from-green-500 hover:to-lime-500 text-black rounded-xl flex items-center gap-2 font-medium transition-all duration-300 hover:scale-105 hover:shadow-glow-green shadow-lg"
            title="Share Project"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>

          <button
            onClick={() => setShowDownload(true)}
            className="p-3 glass hover:bg-white/10 text-gray-300 hover:text-white rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg"
            title="Download Project"
          >
            <Download className="w-5 h-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-3 glass hover:bg-white/10 text-gray-300 hover:text-white rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg"
              title="Change Theme"
            >
              {getThemeIcon()}
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 top-full mt-3 glass rounded-xl shadow-2xl z-50 min-w-[160px] animate-scale-in">
                <div className="p-2">
                  <button
                    onClick={() => {
                      setMode('light');
                      setShowThemeMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-white/10 rounded-lg flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-200"
                  >
                    <Sun className="w-4 h-4" />
                    <span className="font-medium">Light</span>
                  </button>
                  <button
                    onClick={() => {
                      setMode('dark');
                      setShowThemeMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-white/10 rounded-lg flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-200"
                  >
                    <Moon className="w-4 h-4" />
                    <span className="font-medium">Dark</span>
                  </button>
                  <button
                    onClick={() => {
                      setMode('auto');
                      setShowThemeMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-white/10 rounded-lg flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-200"
                  >
                    <Monitor className="w-4 h-4" />
                    <span className="font-medium">Auto</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowSettings(true)}
            className="p-3 glass hover:bg-white/10 text-gray-300 hover:text-white rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>

          {isAuthenticated ? (
            <a
              href="/profile"
              className="p-3 glass hover:bg-white/10 text-gray-300 hover:text-white rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center gap-2"
              title={`Profile - ${user?.name}`}
            >
              <User className="w-5 h-5" />
            </a>
          ) : (
            <a
              href="/signin"
              className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-lime-600 hover:from-green-500 hover:to-lime-500 text-black rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-glow-green shadow-lg"
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
