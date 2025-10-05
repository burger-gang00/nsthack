import { useEffect, useRef } from 'react';
import { usePlaygroundStore } from '../store/playgroundStore';
import DeviceSelector from './DeviceSelector';

export default function Preview() {
  const { bundledCode, previewMode } = usePlaygroundStore();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (bundledCode && iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html style="height: 100%; margin: 0; padding: 0;">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
              <style>
                * { 
                  margin: 0; 
                  padding: 0; 
                  box-sizing: border-box; 
                }
                html, body { 
                  width: 100%;
                  height: 100%;
                  overflow: hidden;
                  margin: 0;
                  padding: 0;
                }
                #root { 
                  width: 100%;
                  height: 100%;
                  display: flex;
                  overflow: hidden;
                }
              </style>
            </head>
            <body>
              <div id="root"></div>
              <script type="module">
                ${bundledCode}
              </script>
            </body>
          </html>
        `);
        iframeDoc.close();
      }
    }
  }, [bundledCode]);

  return (
    <div className="flex-1 flex flex-col bg-slate-900 border-l border-slate-700/50">
      <div className="h-14 bg-slate-800/80 backdrop-blur-xl border-b border-slate-700/50 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-slate-300">Live Preview</span>
        </div>
        <DeviceSelector />
      </div>
      <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {previewMode === 'web' ? (
          // Web Preview - Full Screen Browser Window
          <div className="w-full h-full bg-slate-800 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="h-12 bg-slate-700/50 border-b border-slate-600/50 flex items-center justify-between px-4 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-lime-400 rounded-full"></div>
                </div>
                <div className="text-xs text-slate-400">localhost:3001</div>
              </div>
              <div className="text-xs text-slate-400">Web Preview</div>
            </div>
            <div className="flex-1 bg-white overflow-hidden">
              <iframe
                ref={iframeRef}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin"
                title="Preview"
              />
            </div>
          </div>
        ) : (
          // Mobile Device Frame - Realistic iPhone
          <div className="relative">
            {/* iPhone Device Frame */}
            <div className="bg-gradient-to-b from-white via-slate-800 to-slate-800 rounded-[3rem] p-2 shadow-2xl shadow-black/50 border border-slate-600/30 relative">
              {/* Device Screen Container */}
              <div className="bg-black rounded-[2.5rem] overflow-hidden relative flex flex-col" style={{ width: '375px', height: '812px' }}>
                
                {/* Dynamic Island (iPhone 15 Pro style) */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black rounded-full z-20 border border-slate-800"></div>
                
                {/* iOS Status Bar */}
                <div className="h-12 bg-black text-white text-sm font-medium flex items-center justify-between px-6 relative z-10">
                  {/* Left side - Time */}
                  <div className="flex items-center">
                    <span className="font-semibold">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                  </div>
                  
                  {/* Right side - Status indicators */}
                  <div className="flex items-center gap-1">
                    {/* Signal strength dots (iOS style) */}
                    <div className="flex items-center gap-0.5">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                    </div>
                    
                    {/* Carrier */}
                    <span className="text-xs ml-2">5G</span>
                    
                    {/* WiFi icon */}
                    <svg className="w-4 h-4 ml-2 fill-white" viewBox="0 0 24 24">
                      <path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"/>
                    </svg>
                    
                    {/* Battery */}
                    <div className="flex items-center ml-2">
                      <div className="w-6 h-3 border border-white rounded-sm relative">
                        <div className="absolute inset-0.5 bg-white rounded-sm" style={{ width: '90%' }}></div>
                      </div>
                      <div className="w-0.5 h-1.5 bg-white rounded-r ml-0.5"></div>
                    </div>
                  </div>
                </div>

                {/* App Content Area - Full Height */}
                <div className="flex-1 bg-white overflow-hidden">
                  <iframe
                    ref={iframeRef}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin"
                    title="Mobile Preview"
                  />
                </div>

                {/* iOS Home Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
              </div>
              
              {/* Device Info Labels */}
              <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 text-center">
                <div className="text-sm text-lime-400 font-semibold">iPhone 15 Pro</div>
                <div className="text-xs text-slate-500 mt-1">375 × 812 • iOS Preview</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
