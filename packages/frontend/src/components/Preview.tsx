import { useEffect, useRef } from 'react';
import { usePlaygroundStore } from '../store/playgroundStore';
import DeviceSelector from './DeviceSelector';

export default function Preview() {
  const { bundledCode, previewMode } = usePlaygroundStore();
  const webIframeRef = useRef<HTMLIFrameElement>(null);
  const mobileIframeRef = useRef<HTMLIFrameElement>(null);

  // Function to write content to iframe
  const writeToIframe = (iframe: HTMLIFrameElement) => {
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
                background: #1a1a2e;
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
  };

  // Update iframes when bundled code changes
  useEffect(() => {
    if (bundledCode) {
      if (previewMode === 'web' && webIframeRef.current) {
        writeToIframe(webIframeRef.current);
      } else if (previewMode !== 'web' && mobileIframeRef.current) {
        writeToIframe(mobileIframeRef.current);
      }
    }
  }, [bundledCode, previewMode]);

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
          // PC Monitor Frame - Realistic Computer Monitor
          <div className="relative flex flex-col items-center">
            
            {/* Monitor Frame */}
            <div className="bg-gradient-to-b from-slate-800 via-slate-900 to-black rounded-3xl p-6 shadow-2xl shadow-black/60 border border-slate-700/50 relative" 
                 style={{ width: '85%', height: '600px', maxWidth: '900px' }}>
              
              {/* Monitor Screen Bezel */}
              <div className="bg-black rounded-2xl p-4 h-full relative overflow-hidden border-4 border-slate-800">
                
                {/* Screen Content - Desktop Environment */}
                <div className="w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-lg overflow-hidden relative">
                  
                  {/* Desktop Wallpaper */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-blue-800/20"></div>
                  
                  {/* Desktop Icons */}
                  <div className="absolute top-4 left-4 flex flex-col gap-3">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 bg-lime-400 rounded-xl shadow-lg flex items-center justify-center">
                        <span className="text-slate-900 font-bold text-sm">RN</span>
                      </div>
                      <span className="text-xs text-white text-center">React Native</span>
                    </div>
                    
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 bg-slate-600 rounded-xl shadow-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v-2z"/>
                          <path d="M3 7l9 6 9-6"/>
                        </svg>
                      </div>
                      <span className="text-xs text-white text-center">Terminal</span>
                    </div>
                  </div>
                  
                  {/* Main Application Window */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4/5 h-4/5 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
                    
                    {/* Window Title Bar */}
                    <div className="h-8 bg-gradient-to-r from-slate-100 to-slate-200 border-b border-slate-300 flex items-center justify-between px-3 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <div className="w-2.5 h-2.5 bg-red-500 rounded-full hover:bg-red-600 cursor-pointer"></div>
                          <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full hover:bg-yellow-600 cursor-pointer"></div>
                          <div className="w-2.5 h-2.5 bg-green-500 rounded-full hover:bg-green-600 cursor-pointer"></div>
                        </div>
                        <span className="text-xs text-slate-700 font-medium">React Native App</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="text-xs text-slate-500">Live Preview</div>
                        <div className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* App Content */}
                    <div className="flex-1 bg-slate-50 overflow-hidden">
                      <iframe
                        ref={webIframeRef}
                        className="w-full h-full border-0"
                        sandbox="allow-scripts allow-same-origin"
                        title="Desktop Preview"
                      />
                    </div>
                  </div>
                  
                  {/* Desktop Taskbar */}
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-slate-900/80 backdrop-blur-xl border-t border-slate-700/50 flex items-center justify-between px-4">
                    
                    {/* Start Button */}
                    <div className="flex items-center gap-3">
                      <div className="bg-lime-400 hover:bg-lime-500 transition-colors duration-200 rounded-md px-3 py-1 flex items-center gap-1 cursor-pointer">
                        <div className="w-4 h-4 bg-slate-900 rounded-sm flex items-center justify-center">
                          <div className="w-2 h-2 bg-lime-400 rounded-sm"></div>
                        </div>
                        <span className="text-slate-900 font-semibold text-xs">Start</span>
                      </div>
                      
                      {/* Running Apps */}
                      <div className="bg-slate-800/60 hover:bg-slate-700/60 transition-colors duration-200 rounded-md px-2 py-1 cursor-pointer">
                        <span className="text-white text-xs">React Native App</span>
                      </div>
                    </div>
                    
                    {/* System Tray */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-white text-xs">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"/>
                        </svg>
                        <span>100%</span>
                      </div>
                      <div className="text-white text-xs font-medium">
                        {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Monitor Brand Label */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-slate-400 font-medium">
                DCODE Monitor
              </div>
              
              {/* Power LED */}
              <div className="absolute bottom-4 right-6 w-2 h-2 bg-lime-400 rounded-full animate-pulse shadow-lg shadow-lime-400/50"></div>
            </div>
            
            {/* Monitor Stand */}
            <div className="relative mt-4 flex flex-col items-center">
              {/* Stand Neck */}
              <div className="w-8 h-12 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-lg shadow-lg"></div>
              
              {/* Stand Base */}
              <div className="w-32 h-4 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-full shadow-xl relative">
                <div className="absolute inset-x-4 top-1 h-2 bg-gradient-to-r from-slate-600 to-slate-500 rounded-full"></div>
              </div>
            </div>
            
            {/* Desktop Label */}
            <div className="mt-6 text-center">
              <div className="text-sm text-lime-400 font-semibold">Desktop Preview</div>
              <div className="text-xs text-slate-500 mt-1">DCODE PC • Live Environment</div>
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
                    ref={mobileIframeRef}
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
