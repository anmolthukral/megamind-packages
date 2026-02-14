import { useState, useMemo, memo } from 'react';
import { Brain, Boxes, RotateCw, Lightbulb, Clock } from 'lucide-react';
import '../index.css';

// Helper Component for React.memo demo
const SlowComponent = ({ label }: { label: string }) => {
    // Artificial delay to make re-renders noticeable
    const start = Date.now();
    while (Date.now() - start < 20) {
        // Burn CPU for 20ms per render
    }
    
    return (
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex items-center justify-between">
             <div>
                <span className="font-bold text-gray-700">{label}</span>
                <div className="text-xs text-red-500 font-mono mt-1 flex items-center gap-1">
                    <Clock size={12}/> Rendered: {new Date().toLocaleTimeString().split(' ')[0]}
                </div>
            </div>
            <span className="px-2 py-1 bg-gray-200 rounded text-xs text-gray-600 font-medium">I am slow 🐌</span>
        </div>
    );
};

// The Optimized Version
const MemoizedSlowComponent = memo(SlowComponent);

export const MemoizationLab: React.FC = () => {
    const [parentCount, setParentCount] = useState(0);
    const [isMemoEnabled, setIsMemoEnabled] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [computeNumber, setComputeNumber] = useState(10);
    const [isUseMemoEnabled, setIsUseMemoEnabled] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

    // Expensive Calculation Function
    const expensiveCalculation = (num: number) => {
        const start = Date.now();
        while (Date.now() - start < 100) {
            // Occupy CPU for 100ms
        }
        return num * 2;
    };

    // Calculate value: Always use useMemo to follow Rules of Hooks
    const calculatedValue = useMemo(() => {
        return expensiveCalculation(computeNumber);
    }, [computeNumber, isUseMemoEnabled ? 'enabled' : Date.now()]);

    return (
        <section className="space-y-8 font-sans">
             <div className="flex items-center justify-between bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                <div>
                     <h3 className="text-xl font-bold text-indigo-900 mb-2 flex items-center gap-2">
                        <Brain className="text-indigo-600" size={24} /> Interactive Optimizations
                    </h3>
                    <p className="text-indigo-700 text-sm">
                        Memoization is about <strong>Caching</strong>. Don't re-do work if the inputs haven't changed.
                    </p>
                </div>
                 <button 
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-white px-4 py-2 rounded-lg shadow-sm border border-indigo-200"
                >
                    {showExplanation ? '▼ Hide Logic' : '▶ How It Works'}
                </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
                {/* React.memo Demo */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col h-full">
                    <div className="mb-6">
                        <h4 className="text-xl font-bold text-purple-600 mb-2 flex items-center gap-2">
                            <Boxes size={20} /> React.memo
                        </h4>
                        <p className="text-gray-600 text-sm">
                            Prevents a child component from re-rendering if its props haven't changed.
                        </p>
                    </div>

                    <div className="space-y-6 flex-1">
                        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                            <div>
                                <div className="text-sm font-bold text-purple-900">Parent State Updates</div>
                                <div className="text-xs text-purple-700">Clicking button forces Parent render</div>
                            </div>
                            <button 
                                onClick={() => setParentCount(c => c + 1)}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold shadow hover:bg-purple-700 active:scale-95 transition-all flex items-center gap-2"
                            >
                                <RotateCw size={16}/> Force Render ({parentCount})
                            </button>
                        </div>

                        <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-purple-100 cursor-pointer" onClick={() => setIsMemoEnabled(!isMemoEnabled)}>
                            <input 
                                type="checkbox" 
                                checked={isMemoEnabled}
                                readOnly
                                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 cursor-pointer"
                            />
                            <div className="text-sm font-bold text-gray-700 select-none">
                                Enable <code className="bg-gray-100 px-1 rounded text-purple-600">React.memo</code>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">CHILD COMPONENT</p>
                            {isMemoEnabled ? (
                                <MemoizedSlowComponent label="I am Memoized (Stable)" />
                            ) : (
                                <SlowComponent label="I am NOT Memoized" />
                            )}
                        </div>
                    </div>
                    
                    {showExplanation && (
                        <div className="mt-4 bg-gray-900 rounded-lg p-3 text-xs font-mono text-gray-300">
{`const Child = React.memo((props) => {
  // Only re-renders if 
  // prevProps !== nextProps
  return <div>{props.label}</div>;
});`}
                        </div>
                    )}
                </div>

                {/* useMemo Demo */}
                <div className={`p-8 rounded-2xl shadow-sm border transition-colors duration-300 flex flex-col h-full ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="mb-6">
                        <h4 className={`text-xl font-bold mb-2 flex items-center gap-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                            <Brain size={20}/> useMemo
                        </h4>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Caches a heavy calculation result. It only re-runs if dependencies change.
                        </p>
                    </div>

                    <div className="space-y-6 flex-1">
                        {/* Unrelated State Change */}
                        <div className={`p-4 rounded-xl flex items-center justify-between ${darkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
                            <div>
                                <div className={`text-sm font-bold ${darkMode ? 'text-gray-200' : 'text-blue-900'}`}>Unrelated State</div>
                                <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-blue-700'}`}>Toggling theme triggers render.</div>
                            </div>
                            <button 
                                onClick={() => setDarkMode(!darkMode)}
                                className={`px-4 py-2 rounded-lg font-bold shadow transition-all flex items-center gap-2 ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-blue-600 hover:bg-blue-100'}`}
                            >
                                {darkMode ? <><Lightbulb size={16}/> Light</> : <><Brain size={16}/> Dark</>}
                            </button>
                        </div>

                         <div className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`} onClick={() => setIsUseMemoEnabled(!isUseMemoEnabled)}>
                            <input 
                                type="checkbox" 
                                checked={isUseMemoEnabled}
                                readOnly
                                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                            />
                            <div className={`text-sm font-bold select-none ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Enable <code className={`px-1 rounded ${darkMode ? 'bg-gray-700 text-blue-400' : 'bg-gray-100 text-blue-600'}`}>useMemo</code>
                            </div>
                        </div>

                        <div className={`pt-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">EXPENSIVE CALCULATION</p>
                            <div className={`p-4 rounded-lg flex flex-col gap-2 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Input: {computeNumber}</span>
                                        <button 
                                            onClick={() => setComputeNumber(c => c + 1)}
                                            className="px-2 py-0.5 bg-gray-200 rounded text-xs hover:bg-gray-300 font-bold text-gray-700"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="font-mono font-bold text-green-500">Result: {calculatedValue}</span>
                                </div>
                                <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                    (Simulated 100ms lag on calculation)
                                </div>
                                {!isUseMemoEnabled && (
                                    <div className="text-xs text-red-500 bg-red-50 p-2 rounded border border-red-100 font-bold">
                                        ⚠️ Lagged during Theme Toggle!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {showExplanation && (
                        <div className="mt-4 bg-gray-900 rounded-lg p-3 text-xs font-mono text-gray-300">
{`const value = useMemo(() => {
  // 🐢 Heavy Math (100ms)
  return calculate(input);
}, [input]); // 👈 Only runs if 'input' changes`}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
