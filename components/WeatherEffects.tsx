import React, { useMemo } from 'react';
// FIX: Import the Transition type from framer-motion to resolve type errors.
import { motion, Transition } from 'framer-motion';
import type { WeatherConditionStyle } from '../types';

interface WeatherEffectsProps {
    condition: WeatherConditionStyle | null;
}

const Particle: React.FC<{ type: 'rain' | 'snow' | 'star' }> = ({ type }) => {
    const style = useMemo(() => {
        const top = '-10%';
        const left = `${Math.random() * 100}%`;
        
        if (type === 'rain') {
            return {
                top,
                left,
                height: `${Math.random() * 40 + 20}px`,
                width: '1.5px',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.5))',
            };
        }
        if (type === 'snow') {
             return {
                top,
                left,
                height: `${Math.random() * 8 + 4}px`,
                width: `${Math.random() * 8 + 4}px`,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '50%',
                opacity: Math.random() * 0.7 + 0.3,
             };
        }
        // star
        return {
            top: `${Math.random() * 60}%`,
            left: `${Math.random() * 100}%`,
            height: `${Math.random() * 2 + 1}px`,
            width: `${Math.random() * 2 + 1}px`,
            backgroundColor: 'white',
            borderRadius: '50%',
        }
    }, [type]);

    const animation = useMemo(() => {
        // FIX: Explicitly typing the transition objects resolves a TypeScript error where the `ease`
        // property was inferred as a generic `string` instead of a specific Easing type.
        if (type === 'rain') {
            const transition: Transition = {
                duration: Math.random() * 0.4 + 0.2,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random() * 2,
            };
            return {
                y: '120vh',
                transition,
            };
        }
        if (type === 'snow') {
            const transition: Transition = {
                duration: Math.random() * 6 + 6,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random() * 10,
            };
            return {
                y: '120vh',
                x: [0, Math.random() * 80 - 40, 0],
                rotate: Math.random() * 360,
                transition,
            };
        }
        // star
        const transition: Transition = {
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
        };
        return {
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.2, 0.8],
            transition,
        };
    }, [type]);

    return (
        <motion.div
            className="absolute"
            style={style}
            animate={animation}
        />
    );
};


const WeatherEffects: React.FC<WeatherEffectsProps> = ({ condition }) => {
    const effects = useMemo(() => {
        if (!condition) return null;

        const { code, isDay } = condition;

        // Rain
        if ((code >= 1063 && code <= 1072) || (code >= 1150 && code <= 1201) || (code >= 1240 && code <= 1252)) {
            return Array.from({ length: 150 }).map((_, i) => <Particle key={i} type="rain" />);
        }
        // Snow
        if ((code >= 1066 && code <= 1069) || (code >= 1204 && code <= 1237) || (code >= 1255 && code <= 1264)) {
            return Array.from({ length: 150 }).map((_, i) => <Particle key={i} type="snow" />);
        }
        // Stars at night
        if (code === 1000 && !isDay) {
            return Array.from({ length: 150 }).map((_, i) => <Particle key={i} type="star" />);
        }
        
        return null;
    }, [condition]);
    
    const isThunderstorm = condition && (condition.code >= 1087 && condition.code <= 1282);

    return (
        <div className="fixed top-0 left-0 w-full h-full -z-0 pointer-events-none overflow-hidden">
            {effects}
            {isThunderstorm && (
                <motion.div 
                  className="absolute top-0 left-0 w-full h-full bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0, 0.2, 0] }}
                  transition={{ duration: 5, repeat: Infinity, repeatDelay: 7 }}
                />
            )}
        </div>
    );
};

export default WeatherEffects;