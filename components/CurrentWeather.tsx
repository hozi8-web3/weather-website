import React from 'react';
import { motion } from 'framer-motion';
import type { WeatherData, Unit } from '../types';
import WeatherIcon from './WeatherIcon';

interface CurrentWeatherProps {
    data: WeatherData;
    unit: Unit;
}

const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-black/20 shadow-2xl ${className}`}
    >
        {children}
    </motion.div>
);

const aqiDescription = (index: number) => {
    switch (index) {
        case 1: return 'Good';
        case 2: return 'Moderate';
        case 3: return 'Unhealthy for sensitive groups';
        case 4: return 'Unhealthy';
        case 5: return 'Very Unhealthy';
        case 6: return 'Hazardous';
        default: return 'Unknown';
    }
};

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, unit }) => {
    const { location, current } = data;
    const temp = unit === 'c' ? current.temp_c : current.temp_f;
    const windSpeed = unit === 'c' ? `${current.wind_kph} kph` : `${current.wind_mph} mph`;

    return (
        <GlassCard>
            <div className="flex flex-col lg:flex-row justify-between items-center text-white text-center lg:text-left gap-8">
                <div className="flex flex-col items-center lg:items-start">
                    <h1 className="text-4xl md:text-5xl font-bold">{location.name}</h1>
                    <p className="text-xl opacity-80">{location.region}, {location.country}</p>
                    <p className="text-md opacity-60 mt-1">{new Date(location.localtime).toLocaleString()}</p>
                </div>
                <div className="flex flex-col-reverse sm:flex-row items-center gap-2 sm:gap-6">
                    <div className="text-6xl md:text-8xl font-light tracking-tighter">{Math.round(temp)}°{unit.toUpperCase()}</div>
                    <div className="flex flex-col items-center">
                        <WeatherIcon code={current.condition.code} isDay={current.is_day === 1} size={100} />
                        <p className="capitalize opacity-80 max-w-[150px]">{current.condition.text}</p>
                    </div>
                </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/20 dark:border-black/20 grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-4 text-white">
                <div className="text-center">
                    <p className="text-sm opacity-70">Humidity</p>
                    <p className="text-2xl font-semibold">{current.humidity}%</p>
                </div>
                <div className="text-center">
                    <p className="text-sm opacity-70">Wind Speed</p>
                    <p className="text-2xl font-semibold">{windSpeed}</p>
                </div>
                <div className="text-center col-span-2 sm:col-span-1">
                    <p className="text-sm opacity-70">Air Quality (US EPA)</p>
                    <p className="text-2xl font-semibold">{aqiDescription(current.air_quality['us-epa-index'])}</p>
                </div>
            </div>
        </GlassCard>
    );
};

export default CurrentWeather;