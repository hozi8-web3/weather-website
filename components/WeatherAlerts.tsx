import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WeatherAlerts as WeatherAlertsData } from '../types';

interface WeatherAlertsProps {
    data: WeatherAlertsData;
}

const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ data }) => {
    if (!data || data.alert.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col gap-4">
             <h2 className="text-2xl font-bold text-white">Active Alerts</h2>
            <AnimatePresence>
                {data.alert.map((alert, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="bg-yellow-500/30 text-white p-4 rounded-2xl backdrop-blur-xl border border-yellow-500/50 shadow-lg"
                    >
                        <h3 className="font-bold text-lg">{alert.event}</h3>
                        <p className="font-semibold mt-1">{alert.headline}</p>
                        <p className="mt-2 text-sm opacity-90">{alert.desc}</p>
                        {alert.instruction && <p className="mt-2 text-sm italic opacity-80">Instruction: {alert.instruction}</p>}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default WeatherAlerts;