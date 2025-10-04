import { useState } from 'react';
import { X, Copy, Check, QrCode, Twitter, Linkedin, MessageCircle, Lock, Globe, Eye } from 'lucide-react';
import { nanoid } from 'nanoid';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectData: any;
}

export default function ShareModal({ isOpen, onClose, projectData }: ShareModalProps) {
  const [shareId] = useState(() => nanoid(10));
  const [visibility, setVisibility] = useState<'public' | 'unlisted' | 'private'>('unlisted');
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}/share/${shareId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareToSocial = (platform: string) => {
    const text = 'Check out my React Native project!';
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      discord: shareUrl, // Copy for Discord
    };

    if (platform === 'discord') {
      copyToClipboard();
    } else {
      window.open(urls[platform as keyof typeof urls], '_blank');
    }
  };

  const getEmbedCode = () => {
    return `<iframe src="${shareUrl}" width="100%" height="600" frameborder="0"></iframe>`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Share Project</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Share Link */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">🔗 Share Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 bg-gray-700 text-white px-3 py-2 rounded text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* QR Code */}
          <div>
            <button
              onClick={() => setShowQR(!showQR)}
              className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
            >
              <QrCode className="w-4 h-4" />
              {showQR ? 'Hide' : 'Show'} QR Code
            </button>
            {showQR && (
              <div className="mt-2 p-4 bg-white rounded flex items-center justify-center">
                <div className="text-center">
                  <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">QR Code</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Scan to open on mobile</p>
                </div>
              </div>
            )}
          </div>

          {/* Visibility */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">🌐 Visibility</label>
            <div className="flex gap-2">
              <button
                onClick={() => setVisibility('public')}
                className={`flex-1 px-3 py-2 rounded text-sm transition-colors ${
                  visibility === 'public'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Globe className="w-4 h-4 mx-auto mb-1" />
                Public
              </button>
              <button
                onClick={() => setVisibility('unlisted')}
                className={`flex-1 px-3 py-2 rounded text-sm transition-colors ${
                  visibility === 'unlisted'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Eye className="w-4 h-4 mx-auto mb-1" />
                Unlisted
              </button>
              <button
                onClick={() => setVisibility('private')}
                className={`flex-1 px-3 py-2 rounded text-sm transition-colors ${
                  visibility === 'private'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Lock className="w-4 h-4 mx-auto mb-1" />
                Private
              </button>
            </div>
          </div>

          {/* Password Protection */}
          {visibility === 'private' && (
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">🔒 Password Protection</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Optional password"
                className="w-full bg-gray-700 text-white px-3 py-2 rounded text-sm"
              />
            </div>
          )}

          {/* Social Sharing */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">📱 Share to Social</label>
            <div className="flex gap-2">
              <button
                onClick={() => shareToSocial('twitter')}
                className="flex-1 px-3 py-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </button>
              <button
                onClick={() => shareToSocial('linkedin')}
                className="flex-1 px-3 py-2 bg-[#0A66C2] hover:bg-[#095196] text-white rounded text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </button>
              <button
                onClick={() => shareToSocial('discord')}
                className="flex-1 px-3 py-2 bg-[#5865F2] hover:bg-[#4752c4] text-white rounded text-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Discord
              </button>
            </div>
          </div>

          {/* Embed Code */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">💻 Embed Code</label>
            <div className="bg-gray-900 p-3 rounded text-xs font-mono text-gray-300 overflow-x-auto">
              {getEmbedCode()}
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(getEmbedCode());
              }}
              className="mt-2 text-sm text-blue-400 hover:text-blue-300"
            >
              Copy embed code
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
