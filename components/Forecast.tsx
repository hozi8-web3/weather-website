import React from 'react';
import { motion } from 'framer-motion';
import type { Forecast, Unit } from '../types';
import WeatherIcon from './WeatherIcon';

interface ForecastProps {
    data: Forecast;
    unit: Unit;
}

const ForecastCard: React.FC<{ day: any, unit: Unit, index: number }> = ({ day, unit, index }) => {
    const date = new Date(day.date);
    const dayName = index === 0 ? "Today" : date.toLocaleDateString('en-US', { weekday: 'short' });

    const maxTemp = unit === 'c' ? day.day.maxtemp_c : day.day.maxtemp_f;
    const minTemp = unit === 'c' ? day.day.mintemp_c : day.day.mintemp_f;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center gap-2 p-4 bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-black/20 shadow-lg text-white flex-1 min-w-[120px]"
        >
            <p className="font-bold text-lg">{dayName}</p>
            <WeatherIcon code={day.day.condition.code} isDay={true} size={50} />
            <div className="flex gap-2 text-md">
                <span className="font-semibold">{Math.round(maxTemp)}°</span>
                <span className="opacity-70">{Math.round(minTemp)}°</span>
            </div>
        </motion.div>
    );
};

const Forecast: React.FC<ForecastProps> = ({ data, unit }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-4">5-Day Forecast</h2>
            <div className="flex flex-row gap-4 overflow-x-auto pb-4 -mx-4 px-4">
                {data.forecastday.map((day, index) => (
                    <ForecastCard key={day.date} day={day} unit={unit} index={index} />
                ))}
            </div>
        </div>
    );
};

export default Forecast;