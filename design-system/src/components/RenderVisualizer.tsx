import React, { useState, useEffect } from 'react';
import { Activity, Zap, Code, AlertTriangle } from 'lucide-react';
import '../index.css';

export const RenderVisualizer: React.FC = () => {
    const [count, setCount] = useState(0);
    const [isFastRendering, setIsFastRendering] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

    // Fast Render Logic (60fps updates)
    useEffect(() => {
        if (!isFastRendering) return;
        let animationFrameId: number;

        const animate = () => {
            setCount(c => c + 1);
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => cancelAnimationFrame(animationFrameId);
    }, [isFastRendering]);

    return (
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden font-sans">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Activity className="text-blue-600" size={24} /> The "Renders are Bad" Myth
                </h3>
                <p className="text-gray-600 text-sm">
                    React is fast. JavaScript blocking the main thread is what makes it feel slow.
                    Let's prove that updating state <strong>60 times per second</strong> provides a smooth experience.
                </p>
            </div>
            
            <div className="p-6 grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                    <div className="flex items-baseline gap-2">
                        <div className={`text-7xl font-mono font-bold tabular-nums tracking-tighter transition-colors ${isFastRendering ? 'text-blue-600' : 'text-gray-300'}`}>
                            {count}
                        </div>
                        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Renders</span>
                    </div>
                    
                    <button 
                        onClick={() => setIsFastRendering(!isFastRendering)}
                        className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all shadow-lg transform hover:-translate-y-1 flex items-center justify-center gap-2 ${
                            isFastRendering 
                            ? 'bg-red-500 text-white shadow-red-500/30' 
                            : 'bg-blue-600 text-white shadow-blue-500/30'
                        }`}
                    >
                        {isFastRendering ? <><AlertTriangle size={20}/> Stop The Madness</> : <><Zap size={20}/> Start Fast Renders</>}
                    </button>
                    
                    <p className="text-xs text-gray-500 text-center">
                        Updating state via <code>requestAnimationFrame</code> (~16ms)
                    </p>

                     <button 
                        onClick={() => setShowExplanation(!showExplanation)}
                        className="text-sm font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1 mx-auto"
                    >
                        {showExplanation ? '▼ Hide Code' : '▶ How It Works'}
                    </button>
                </div>

                <div className="space-y-4">
                    {showExplanation ? (
                         <div className="bg-gray-900 rounded-lg p-5 text-xs font-mono text-gray-300 shadow-inner overflow-hidden relative">
                            <div className="absolute top-2 right-2 text-gray-600"><Code size={16}/></div>
{`// 🚀 This runs 60 times/sec
// React handles this EASILY.

useEffect(() => {
  const animate = () => {
    // 1. Update State
    setCount(c => c + 1); 
    
    // 2. Schedule next frame
    requestAnimationFrame(animate);
  };
  animate(); 
}, []);`}
                        </div>
                    ) : (
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-blue-800 text-sm leading-relaxed relative">
                             <div className="absolute -top-3 -right-3 bg-blue-100 p-2 rounded-full"><Activity size={20} className="text-blue-600"/></div>
                            <p className="mb-2"><strong>Wait, isn't re-rendering bad?</strong></p>
                            <p className="mb-2">
                                Not necessarily! React's Virtual DOM diffing is extremely optimized. 
                            </p>
                            <p>
                                The problem usually isn't <em>rendering</em> - it's <strong>Computation</strong>. 
                                If `render()` takes 50ms, then 60fps is impossible. But if `render()` is cheap, you can do it all day.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
