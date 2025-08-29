
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { WeatherConditionStyle } from '../types';

interface AnimatedBackgroundProps {
    condition: WeatherConditionStyle | null;
}

const getGradient = (condition: WeatherConditionStyle | null) => {
    if (!condition) {
        return ['#0f172a', '#3b0764']; // Default dark
    }

    const { code, isDay } = condition;

    // Clear / Sunny
    if (code === 1000) {
        return isDay ? ['#87CEEB', '#FFD700'] : ['#000033', '#191970'];
    }
    // Cloudy
    if (code >= 1003 && code <= 1030) {
        return isDay ? ['#B0C4DE', '#778899'] : ['#2F4F4F', '#4682B4'];
    }
    // Rain
    if ((code >= 1063 && code <= 1072) || (code >= 1150 && code <= 1201) || (code >= 1240 && code <= 1252)) {
        return isDay ? ['#708090', '#4682B4'] : ['#1C2331', '#283541'];
    }
    // Snow / Sleet
    if ((code >= 1066 && code <= 1069) || (code >= 1204 && code <= 1237) || (code >= 1255 && code <= 1264)) {
        return isDay ? ['#E6E6FA', '#ADD8E6'] : ['#465069', '#6E7B91'];
    }
    // Thunderstorm
    if (code >= 1087 && code <= 1282) {
        return ['#2C1E3A', '#4A2F5D', '#160B20'];
    }
    // Fog / Mist
    if (code >= 1135 && code <= 1147) {
        return isDay ? ['#D3D3D3', '#A9A9A9'] : ['#3E495A', '#536072'];
    }
    
    return isDay ? ['#4A90E2', '#8ED6FF'] : ['#0f172a', '#3b0764'];
};


const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ condition }) => {
    const gradientColors = useMemo(() => getGradient(condition), [condition]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-full h-full -z-10"
            animate={{ background: `linear-gradient(to bottom right, ${gradientColors.join(', ')})` }}
            transition={{ duration: 2, ease: "easeInOut" }}
        />
    );
};

export default AnimatedBackground;
