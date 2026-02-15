import React, { useState } from 'react';
import '../index.css';

export const JankSimulator: React.FC = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

    // Sync Blocking Logic (The "Freeze")
    const freezeThread = () => {
        setIsProcessing(true);
        // Force a layout/paint before blocking so the button state updates visually
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const start = Date.now();
                while (Date.now() - start < 3000) {
                    // Synchronously block for 3 seconds
                    // The Event Loop is STUCK here.
                }
                setIsProcessing(false);
            });
        });
    };

    return (
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden font-sans">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                        <i className="fas fa-coffee"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">The "Starbucks Queue" Simulator</h3>
                </div>
                <p className="text-gray-600 text-sm">
                    JavaScript is <strong>Single Threaded</strong>. If a task takes too long, the "Event Loop" queue gets backed up.
                </p>
            </div>
            
            <div className="p-6 grid lg:grid-cols-2 gap-8 items-start">
                {/* Controls Area */}
                <div className="space-y-6">
                    <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                        <div className="flex flex-col gap-3 mb-6">
                            <button 
                                onClick={freezeThread}
                                disabled={isProcessing}
                                className="w-full py-4 px-4 bg-rose-600 text-white font-bold rounded-xl shadow-sm hover:bg-rose-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isProcessing ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i> Thread Blocked...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-snowflake"></i> Freeze for 3 Seconds
                                    </>
                                )}
                            </button>
                            <p className="text-xs text-center text-amber-700 font-medium">
                                💡 Click "Freeze", then IMMEDIATELY try to type below.
                            </p>
                        </div>

                        {/* Interactive Test */}
                        <div className="bg-white p-4 rounded-lg border border-amber-200 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    INTERACTIVITY TEST
                                </label>
                                {isProcessing && <span className="text-[10px] font-bold text-rose-500 animate-pulse">● EVENTS QUEUED</span>}
                            </div>
                            <input 
                                type="text" 
                                placeholder="Type here while frozen..."
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all text-sm font-medium"
                            />
                            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                                If the thread is blocked, your keystrokes go into the <strong>Queue</strong>. They will appear all at once when the block finishes!
                            </p>
                        </div>
                    </div>

                    {/* How It Works Button */}
                    <button 
                        onClick={() => setShowExplanation(!showExplanation)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-2 px-2"
                    >
                        <i className={`fas fa-chevron-${showExplanation ? 'down' : 'right'}`}></i>
                        How It Works (Code)
                    </button>
                    
                    {showExplanation && (
                        <div className="bg-gray-900 rounded-lg p-4 text-xs font-mono text-gray-300 overflow-x-auto border border-gray-800 shadow-inner">
{`// ❌ The Freeze:
function freeze() {
  const start = Date.now();
  // Synchronous Loop = BLOCKED MAIN THREAD
  while (Date.now() - start < 3000) {
     // CPU is stuck here.
     // Cannot Painting. Cannot Handle Clicks.
  }
  // ...3 seconds later, Queue flushes!
}`}
                        </div>
                    )}
                </div>

                {/* Visualizer */}
                <div className="h-full flex flex-col">
                     <div className={`flex-1 flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border border-gray-100 transition-colors duration-300 ${isProcessing ? 'bg-rose-50 border-rose-100' : ''}`}>
                        <div className="relative mb-6">
                            <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center bg-white shadow-sm transition-all duration-300 ${isProcessing ? 'border-rose-200 scale-110' : 'border-gray-100'}`}>
                                <div className={`text-6xl transition-all duration-300 ${isProcessing ? 'grayscale' : 'grayscale-0'}`}>
                                    {isProcessing ? '🛑' : '☕'}
                                </div>
                            </div>
                            {isProcessing && (
                                <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce shadow-md">
                                    BLOCKED
                                </div>
                            )}
                        </div>

                        <div className="text-center">
                            <h4 className={`text-lg font-bold mb-1 transition-colors ${isProcessing ? 'text-rose-700' : 'text-gray-900'}`}>
                                {isProcessing ? 'Main Thread Stuck' : 'Main Thread Free'}
                            </h4>
                            <p className="text-sm text-gray-500">
                                {isProcessing 
                                    ? 'Browser is unresponsive. Events are queuing.' 
                                    : 'Browser is ready for interaction.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
