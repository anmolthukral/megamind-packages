import React, { useState, useRef } from 'react';
import '../index.css';

export const JankSimulator: React.FC = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const shouldStopProcessing = useRef(false);
    const [showExplanation, setShowExplanation] = useState(false);

    // Chunked Blocking Logic
    const startHeavyProcess = async () => {
        setIsProcessing(true);
        shouldStopProcessing.current = false;

        while (!shouldStopProcessing.current) {
            const start = Date.now();
            // Randomize blocking duration (300ms to 1000ms) to make it feel "jankier"
            const duration = Math.random() * 700 + 300; 
            while (Date.now() - start < duration) {
                // Burn CPU
            }
            // Yield to main thread for a split second to allow React to handle clicks
            await new Promise(r => setTimeout(r, 0));
        }
        
        setIsProcessing(false);
    };

    const stopHeavyProcess = () => {
        shouldStopProcessing.current = true;
    };

    return (
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden font-sans">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    ☕ The "Starbucks Queue" Simulator
                </h3>
                <p className="text-gray-600 text-sm">
                    JavaScript is <strong>Single Threaded</strong>. If a heavy task blocks the main thread, 
                    the browser cannot respond to clicks, typing, or rendering updates.
                </p>
            </div>
            
            <div className="p-6 grid lg:grid-cols-2 gap-8 items-start">
                {/* Controls Area */}
                <div className="space-y-6">
                    <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                        <div className="flex gap-4 mb-4">
                            {!isProcessing ? (
                                <button 
                                    onClick={startHeavyProcess}
                                    className="flex-1 py-3 px-4 bg-green-600 text-white font-bold rounded-lg shadow-sm hover:bg-green-700 transition-all active:scale-95"
                                >
                                    ▶️ Start Heavy Process
                                </button>
                            ) : (
                                <button 
                                    onClick={stopHeavyProcess}
                                    className="flex-1 py-3 px-4 bg-red-600 text-white font-bold rounded-lg shadow-sm hover:bg-red-700 transition-all active:scale-95 animate-pulse"
                                >
                                    ⏹️ Stop Process
                                </button>
                            )}
                        </div>

                        {/* Interactive Test */}
                        <div className="bg-white p-4 rounded-lg border border-amber-200">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                                INTERACTIVITY TEST
                            </label>
                            <input 
                                type="text" 
                                placeholder={isProcessing ? "🚫 I can't type..." : "✍️ Type here to test responsiveness..."}
                                className={`w-full px-3 py-2 rounded border transition-colors text-sm ${
                                    isProcessing 
                                    ? 'bg-red-50 border-red-200 cursor-not-allowed placeholder-red-400' 
                                    : 'bg-white border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                                }`}
                            />
                            <p className="text-xs text-gray-400 mt-2 text-center">
                                {isProcessing ? "Notice the lag? The Main Thread is busy!" : "Silky smooth. The Main Thread is free."}
                            </p>
                        </div>
                    </div>

                    {/* How It Works Button */}
                    <button 
                        onClick={() => setShowExplanation(!showExplanation)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                        {showExplanation ? '▼ Hide Explanation' : '▶ How It Works (Pseudo-code)'}
                    </button>
                    
                    {showExplanation && (
                        <div className="bg-gray-900 rounded-lg p-4 text-xs font-mono text-gray-300 overflow-x-auto">
{`// ❌ The Problem: Blocking the Main Thread
function heavyTask() {
  while (true) {
    // This loop never ends!
    // Browser cannot Paint, Click, or Type.
  }
}

// ✅ The Simulator (What's happening now):
async function energeticJank() {
  while (shouldContinue) {
    const start = Date.now();
    // 1. Block thread for 500ms
    while (Date.now() - start < 500) {
       // Burn CPU 🔥
    }
    // 2. Yield briefly (allows you to click Stop)
    await new Promise(r => setTimeout(r, 0));
  }
}`}
                        </div>
                    )}
                </div>

                {/* Visualizer */}
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-gray-100 min-h-[300px]">
                     <div className="relative w-48 h-48 flex items-center justify-center bg-white rounded-full border-4 border-gray-100 shadow-sm">
                        
                        {/* The Gear Animation */}
                        <div className={`text-8xl transition-all duration-300 ${isProcessing ? 'text-red-200 rotate-12' : 'text-amber-400 animate-spin'}`}>
                            ⚙️
                        </div>

                        {/* Status Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                            {isProcessing ? (
                                <>
                                    <div className="text-4xl mb-1 animate-pulse">🛑</div>
                                    <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded-full border border-red-200">
                                        BLOCKED
                                    </span>
                                </>
                            ) : (
                                <>
                                    <div className="text-4xl mb-1">☕</div>
                                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full border border-green-200">
                                        IDLE
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">THREAD STATUS</div>
                        <div className={`font-mono font-bold text-lg ${isProcessing ? 'text-red-600' : 'text-green-600'}`}>
                            {isProcessing ? 'FPS: ~1 (Laggy)' : 'FPS: 60 (Smooth)'}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
