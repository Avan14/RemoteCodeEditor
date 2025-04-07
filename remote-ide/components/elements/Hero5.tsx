import React, { useState, useEffect } from 'react';
import { Code, Eye, Play, CheckCircle, AlertCircle, Activity, RefreshCw } from 'lucide-react';

const LivePreviewFeature = () => {
  const [previewActive, setPreviewActive] = useState(true);
  const [componentStatus, setComponentStatus] = useState('stable');
  const [lastUpdate, setLastUpdate] = useState('2 seconds ago');
  const [changeCount, setChangeCount] = useState(8);
  
  // Simulate changes coming in
  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdate('just now');
      setChangeCount(prev => prev + 1);
      setComponentStatus('updating');
      
      setTimeout(() => {
        setComponentStatus('stable');
      }, 1500);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  const changedComponents = [
    { name: 'Button.tsx', additions: 12, deletions: 4, status: 'modified' },
    { name: 'Card.tsx', additions: 8, deletions: 0, status: 'added' },
    { name: 'Navbar.tsx', additions: 6, deletions: 6, status: 'modified' },
    { name: 'ThemeToggle.tsx', additions: 4, deletions: 0, status: 'added' }
  ];
  
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-xl w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Eye className="text-blue-500" size={24} /> {/* Adjusted color */}
          <h2 className="text-xl font-bold">Live Preview</h2>
        </div>
        <div className="flex space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
            <RefreshCw size={16} className="mr-2" />
            Sync Changes
          </button>
          <button 
            className={`${previewActive ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'} text-white px-4 py-2 rounded-md flex items-center`}
            onClick={() => setPreviewActive(!previewActive)}
          >
            <Play size={16} className="mr-2" />
            {previewActive ? 'Preview Active' : 'Start Preview'}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Preview panel */}
        <div className="bg-gray-800 rounded-lg p-4 relative">
          <div className="absolute -top-3 -right-3">
            {componentStatus === 'stable' ? (
              <CheckCircle size={24} className="text-green-500" />
            ) : (
              <Activity size={24} className="text-yellow-500 animate-pulse" />
            )}
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-300">Live Preview</span>
            </div>
            <span className="text-xs text-gray-400">Updated {lastUpdate}</span>
          </div>
          
          {/* Preview content */}
          <div className="border border-gray-700 rounded-lg p-4 h-64 flex items-center justify-center bg-gray-950 relative">
            <div className="absolute -top-2 -left-2 animate-bounce">
              <Code size={20} className="text-blue-400" /> {/* Adjusted color */}
            </div>
            <div className="absolute top-6 right-6 animate-pulse delay-300">
              <AlertCircle size={18} className="text-blue-400" /> {/* Adjusted color */}
            </div>
            <div className={`text-center transition-all duration-300 ${componentStatus === 'updating' ? 'scale-110 text-yellow-300' : 'text-white'}`}>
              <div className={`w-24 h-24 rounded-lg mx-auto mb-4 ${componentStatus === 'updating' ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'} flex items-center justify-center`}>
                <span className="text-2xl font-bold">{changeCount}</span>
              </div>
              <p className="text-sm text-gray-300">Components Rendered</p>
            </div>
            <div className="absolute bottom-6 left-8 animate-pulse delay-150">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
            </div>
            <div className="absolute right-10 bottom-12 animate-bounce delay-500">
              <Code size={16} className="text-orange-400" /> {/* Adjusted color */}
            </div>
          </div>
        </div>
        
        {/* Component list panel */}
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Code size={18} className="text-blue-400" /> {/* Adjusted color */}
              <span className="font-medium">React Components</span>
            </div>
            <span className="bg-blue-600 text-xs px-2 py-1 rounded-full">{changedComponents.length} changed</span>
          </div>
          
          <div className="space-y-3">
            {changedComponents.map((component, index) => (
              <div key={index} className={`border-l-4 ${component.status === 'added' ? 'border-green-500' : 'border-yellow-500'} bg-gray-850 p-3 rounded-r-lg hover:bg-gray-700 transition-colors`}>
                <div className="flex justify-between items-center">
                  <span className="font-mono">{component.name}</span>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-green-400">+{component.additions}</span>
                    {component.deletions > 0 && <span className="text-red-400">-{component.deletions}</span>}
                  </div>
                </div>
                <div className="mt-2 flex space-x-2">
                  {component.status === 'added' ? (
                    <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded">New</span>
                  ) : (
                    <span className="text-xs bg-yellow-900 text-yellow-300 px-2 py-1 rounded">Modified</span>
                  )}
                  <span className={`text-xs px-2 py-1 rounded ${componentStatus === 'updating' && index === 0 ? 'bg-blue-900 text-blue-300 animate-pulse' : 'bg-gray-700 text-gray-300'}`}>
                    {componentStatus === 'updating' && index === 0 ? 'Rendering...' : 'Rendered'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md flex items-center justify-center">
            <RefreshCw size={14} className="mr-2" />
            <span>Refresh Components</span>
          </button>
        </div>
      </div>
      
      <div className="mt-6 bg-gray-800 p-3 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity size={16} className="text-blue-400" /> {/* Adjusted color */}
            <span className="text-sm">Live sync active</span>
          </div>
          <div className="text-xs text-gray-400">
            {componentStatus === 'updating' ? 'Syncing changes...' : 'All components in sync'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreviewFeature;
