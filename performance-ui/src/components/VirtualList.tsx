import React, { useState } from 'react';
import { Layers, List, MousePointerClick, CheckCircle, XCircle } from 'lucide-react';
import '../index.css';

export const VirtualList: React.FC = () => {
    const [isVirtualListEnabled, setIsVirtualListEnabled] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden font-sans">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                 <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Layers className="text-blue-600" size={24} /> Virtualization Strategy
                </h3>
                <p className="text-gray-600 text-sm">
                    Rendering 10,000 items crashes the browser. Virtualization only renders what is currently visible 
                    matches the viewport (plus a small buffer).
                </p>
            </div>

            <div className="p-6 grid md:grid-cols-[280px_1fr] gap-8">
                {/* Controls & Explanation */}
                <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                           <List size={20} /> List Demo
                        </h4>
                        <p className="text-xs text-blue-700 mb-4">
                            Toggle between rendering <strong>10,000 Nodes</strong> (Laggy) vs <strong>~20 Nodes</strong> (Smooth).
                        </p>
                        
                        <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-blue-200 cursor-pointer hover:border-blue-300 transition-colors"
                             onClick={() => {
                                setIsVirtualListEnabled(!isVirtualListEnabled);
                                setScrollTop(0);
                             }}
                        >
                            <input 
                                type="checkbox" 
                                checked={isVirtualListEnabled}
                                readOnly
                                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-sm font-bold text-gray-700 select-none">Enable Virtualization</span>
                        </div>
                    </div>

                     <button 
                        onClick={() => setShowExplanation(!showExplanation)}
                        className="text-sm font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors"
                    >
                        {showExplanation ? '▼ Hide Code' : '▶ How It Works (Math)'}
                    </button>

                    {showExplanation && (
                        <div className="bg-gray-900 rounded-lg p-4 text-xs font-mono text-gray-300 overflow-x-auto shadow-inner">
{`// 🧮 The Math of Windowing:

// 1. Where are we?
const startIndex = Math.floor(scrollTop / 35px);

// 2. How many fit?
const visibleCount = Math.ceil(height / 35px);

// 3. Render ONLY that slice
const items = allItems.slice(
  startIndex, 
  startIndex + visibleCount + buffer
);

// 4. Fake the scroll height so scrollbar works
<div style={{ height: totalItems * 35px }} />`}
                        </div>
                    )}
                </div>

                {/* The List Visualizer */}
                <div>
                     <div className="flex items-center justify-between mb-2">
                        <h5 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                            {isVirtualListEnabled ? (
                                <span className="text-green-600 flex items-center gap-1"><CheckCircle size={16}/> Optimized</span>
                            ) : (
                                <span className="text-red-600 flex items-center gap-1"><XCircle size={16}/> Unoptimized</span>
                            )}
                        </h5>
                        <div className="text-xs font-mono text-gray-500">
                            {isVirtualListEnabled ? '~10 DOM Nodes' : '10,000 DOM Nodes'}
                        </div>
                     </div>
                     
                     <div 
                        className="border border-gray-200 rounded-lg h-80 overflow-auto relative bg-white shadow-inner scroll-smooth"
                        onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
                     >
                        {isVirtualListEnabled ? (
                            // VIRTUALIZED LIST
                            <div style={{ height: `${10000 * 35}px`, position: 'relative' }}>
                                {(() => {
                                    const itemHeight = 35;
                                    const startIndex = Math.floor(scrollTop / itemHeight);
                                    const endIndex = Math.min(10000, startIndex + Math.ceil(320 / itemHeight) + 2);
                                    const visibleItems = [];
                                    
                                    for (let i = startIndex; i < endIndex; i++) {
                                        visibleItems.push(
                                            <div 
                                                key={i}
                                                className="absolute top-0 left-0 w-full h-[35px] border-b border-gray-50 px-4 flex items-center justify-between text-sm text-gray-600 hover:bg-blue-50 transition-colors"
                                                style={{ transform: `translateY(${i * 35}px)` }}
                                            >
                                                <span>Item #{i + 1}</span>
                                                <span className="text-[10px] bg-gray-100 px-2 rounded-full text-gray-500">Virtual</span>
                                            </div>
                                        );
                                    }
                                    return visibleItems;
                                })()}
                            </div>
                        ) : (
                            // HEAVY LIST (Render All)
                            <div>
                                {Array.from({ length: 10000 }).map((_, i) => (
                                    <div 
                                        key={i} 
                                        className="h-[35px] border-b border-gray-50 px-4 flex items-center justify-between text-sm text-gray-600 hover:bg-red-50 transition-colors"
                                    >
                                        <span>Item #{i + 1}</span>
                                        <span className="text-[10px] bg-red-100 text-red-700 px-2 rounded-full">Heavy</span>
                                    </div>
                                ))}
                            </div>
                        )}
                     </div>
                     
                     <div className="mt-3 flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-2 text-xs">
                             <MousePointerClick size={14} className="text-gray-400"/>
                             <span className="text-gray-600">Try scrolling fast!</span>
                        </div>
                        <span className={`text-xs font-bold ${isVirtualListEnabled ? "text-green-600" : "text-red-500"}`}>
                            {isVirtualListEnabled ? "🚀 60 FPS Scrolling" : "🐌 Initial Lag / Scrolling Jitter"}
                        </span>
                     </div>
                </div>
            </div>
        </div>
    );
};
