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
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { overflow: hidden; }
                #root { width: 100vw; height: 100vh; }
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
    <div className="flex-1 flex flex-col bg-gray-800">
      <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
        <span className="text-sm font-medium text-gray-400">Preview</span>
        <DeviceSelector />
      </div>
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-900">
        <div className={`bg-white rounded-lg shadow-2xl overflow-hidden transition-all ${
          previewMode === 'web' ? 'w-full h-full' : 'w-96 h-[800px]'
        }`}>
          <iframe
            ref={iframeRef}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin"
            title="Preview"
          />
        </div>
      </div>
    </div>
  );
}
