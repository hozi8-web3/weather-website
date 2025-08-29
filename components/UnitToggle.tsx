import React from 'react';
import type { Unit } from '../types';

interface UnitToggleProps {
    unit: Unit;
    setUnit: (unit: Unit) => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ unit, setUnit }) => {
    return (
        <div className="flex items-center p-1 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 shadow-lg">
            <button
                onClick={() => setUnit('c')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${unit === 'c' ? 'bg-white/30 text-white' : 'text-white/70 hover:bg-white/10'}`}
            >
                °C
            </button>
            <button
                onClick={() => setUnit('f')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${unit === 'f' ? 'bg-white/30 text-white' : 'text-white/70 hover:bg-white/10'}`}
            >
                °F
            </button>
        </div>
    );
};

export default UnitToggle;