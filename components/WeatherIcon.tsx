import React from 'react';
import { motion } from 'framer-motion';

interface WeatherIconProps {
    code: number;
    isDay: boolean;
    size?: number;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ code, isDay, size = 100 }) => {
    const icon = getIcon(code, isDay);
    return <div style={{ width: size, height: size }}>{icon}</div>;
};

// Animated SVG components
const Sun = () => (
    <motion.g animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <circle cx="25" cy="25" r="10" fill="#FFD700" style={{ filter: 'drop-shadow(0 0 10px #FFD700)' }} />
    </motion.g>
);

const Moon = () => (
    <motion.g animate={{ rotate: -10 }} transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}>
        <path d="M25 5 A20 20 0 1 0 25 45 A15 15 0 1 1 25 5" fill="#F0E68C" style={{ filter: 'drop-shadow(0 0 5px #F0E68C)' }} />
    </motion.g>
);

const Cloud = ({ opacity = 1, x = 0, y = 0 }: { opacity?: number; x?: number; y?: number }) => (
    <motion.g
        animate={{ x: [-2 + x, 2 + x, -2 + x] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'drop-shadow(0 5px 5px rgba(0,0,0,0.1))' }}
    >
        <path d="M10 30 Q10 20 20 20 Q30 10 40 20 Q50 20 50 30 L10 30 Z" fill={`rgba(255, 255, 255, ${opacity})`} transform={`translate(${x}, ${y})`} />
    </motion.g>
);

const Rain = () => (
    <g>
        {[15, 25, 35, 20, 30].map((x, i) => (
            <motion.line key={x} x1={x} y1="35" x2={x + 2} y2="45" stroke="#ADD8E6" strokeWidth="2" strokeLinecap="round"
                animate={{ y: [35, 45], opacity: [1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
        ))}
    </g>
);

const Drizzle = () => (
    <g>
        {[18, 28, 38].map((x, i) => (
            <motion.line key={x} x1={x} y1="35" x2={x + 1} y2="42" stroke="rgba(173, 216, 230, 0.7)" strokeWidth="1.5" strokeLinecap="round"
                animate={{ y: [35, 42], opacity: [1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
        ))}
    </g>
);

const Snow = () => (
    <g>
        {[15, 25, 35, 20, 30].map((x, i) => (
            <motion.circle key={x} cx={x} cy="35" r="1.5" fill="#FFFFFF"
                animate={{ y: [30, 45], opacity: [1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: i * 0.4 }}
            />
        ))}
    </g>
);

const Lightning = () => (
    <motion.g
        animate={{ opacity: [0, 1, 0, 0, 1, 0, 0] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
    >
        <polygon points="25,30 20,40 30,40 25,50" fill="#FFD700" style={{ filter: 'drop-shadow(0 0 5px #FFD700)' }} />
    </motion.g>
);

const Fog = () => (
    <g>
        {[15, 25, 35].map((y, i) => (
             <motion.line key={y} x1="10" y1={y} x2="40" y2={y} stroke="rgba(255,255,255,0.4)" strokeWidth="4" strokeLinecap="round"
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
             />
        ))}
    </g>
)

const getIcon = (code: number, isDay: boolean) => {
    const renderBase = () => isDay ? <Sun /> : <Moon />;

    switch (code) {
        // Clear
        case 1000:
            return isDay ? <Sun /> : <Moon />;
        // Partly Cloudy
        case 1003:
            return <svg viewBox="0 0 50 50">{renderBase()}<Cloud opacity={0.8} y={5} /></svg>;
        // Cloudy / Overcast
        case 1006:
        case 1009:
            return <svg viewBox="0 0 50 50"><Cloud x={-5} /><Cloud x={5} y={3} opacity={0.7} /></svg>;
        // Mist / Fog
        case 1030:
        case 1135:
        case 1147:
            return <svg viewBox="0 0 50 50"><Fog /></svg>;
        // Drizzle / Light Rain
        case 1063:
        case 1150:
        case 1153:
        case 1180:
        case 1183:
            return <svg viewBox="0 0 50 50"><Cloud /><Drizzle /></svg>;
        // Moderate to Heavy Rain
        case 1186:
        case 1189:
        case 1192:
        case 1195:
        case 1240:
        case 1243:
        case 1246:
            return <svg viewBox="0 0 50 50"><Cloud opacity={0.8} /><Rain /></svg>;
        // Light/Heavy Freezing Rain, Sleet
        case 1069:
        case 1072:
        case 1198:
        case 1201:
        case 1204:
        case 1207:
        case 1249:
        case 1252:
            return <svg viewBox="0 0 50 50"><Cloud /><Drizzle /><Snow /></svg>;
        // Snow
        case 1066:
        case 1114:
        case 1210:
        case 1213:
        case 1216:
        case 1219:
        case 1222:
        case 1225:
        case 1255:
        case 1258:
            return <svg viewBox="0 0 50 50"><Cloud /><Snow /></svg>;
        // Thunder
        case 1087:
            return <svg viewBox="0 0 50 50"><Cloud /><Lightning /></svg>;
        // Thunder with Rain/Snow
        case 1273:
        case 1276:
            return <svg viewBox="0 0 50 50"><Cloud /><Rain /><Lightning /></svg>;
        case 1279:
        case 1282:
            return <svg viewBox="0 0 50 50"><Cloud /><Snow /><Lightning /></svg>;
        // Default
        default:
            return <svg viewBox="0 0 50 50"><Cloud opacity={0.7} /></svg>;
    }
}

export default WeatherIcon;