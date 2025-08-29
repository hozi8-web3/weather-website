import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { WeatherData, Unit } from './types';
import { fetchWeatherData } from './services/weatherService';
import AnimatedBackground from './components/AnimatedBackground';
import WeatherEffects from './components/WeatherEffects';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import WeatherAlerts from './components/WeatherAlerts';
import SearchBar from './components/SearchBar';
import UnitToggle from './components/UnitToggle';
import ThemeToggle from './components/ThemeToggle';
import Loader from './components/Loader';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [city, setCity] = useState<string>(localStorage.getItem('lastCity') || 'New York');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [unit, setUnit] = useState<Unit>((localStorage.getItem('unit') as Unit) || 'c');
    const [theme, setTheme] = useState<'light' | 'dark'>((localStorage.getItem('theme') as 'light' | 'dark') || 'dark');
    const [isLocating, setIsLocating] = useState<boolean>(false);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    useEffect(() => {
        localStorage.setItem('unit', unit);
    }, [unit]);

    const getWeatherData = useCallback(async (location: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchWeatherData(location);
            setWeatherData(data);
            localStorage.setItem('lastCity', data.location.name);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    }, []);
    
    const handleUseMyLocation = useCallback(() => {
        setIsLocating(true);
        setError(null);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeatherData(`${latitude},${longitude}`);
                setIsLocating(false);
            },
            (err) => {
                console.error("Geolocation error:", err);
                setError("Unable to retrieve your location. Please grant permission or search for a city.");
                setIsLocating(false);
            }
        );
    }, [getWeatherData]);

    useEffect(() => {
        const lastCity = localStorage.getItem('lastCity');
        if (lastCity) {
            getWeatherData(lastCity);
        } else {
           handleUseMyLocation();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = (newCity: string) => {
        setCity(newCity);
        getWeatherData(newCity);
    };

    const weatherCondition = useMemo(() => {
        if (!weatherData) return null;
        return {
            code: weatherData.current.condition.code,
            isDay: weatherData.current.is_day === 1
        };
    }, [weatherData]);

    return (
        <div className={`min-h-screen w-full font-sans transition-colors duration-500 flex flex-col`}>
            <AnimatedBackground condition={weatherCondition} />
            <WeatherEffects condition={weatherCondition} />
            <main className="relative z-10 p-4 sm:p-6 lg:p-8 flex flex-col items-center flex-grow">
                <div className="w-full max-w-5xl">
                    <header className="flex flex-wrap justify-between items-center gap-4 mb-8">
                        <div className="w-full md:flex-1 md:max-w-md">
                           <SearchBar onSearch={handleSearch} onLocate={handleUseMyLocation} isLocating={isLocating} />
                        </div>
                        <div className="flex items-center gap-4 ml-auto">
                            <UnitToggle unit={unit} setUnit={setUnit} />
                            <ThemeToggle theme={theme} setTheme={setTheme} />
                        </div>
                    </header>

                    <AnimatePresence>
                        {loading && !isLocating && <Loader />}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="bg-red-500/30 text-white p-4 rounded-lg text-center backdrop-blur-sm border border-red-500/50"
                            >
                                <p>Error: {error}</p>
                                <p>Please check the city name or your API key.</p>
                            </motion.div>
                        )}
                        {weatherData && !loading && !error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col gap-8"
                            >
                                <CurrentWeather data={weatherData} unit={unit} />
                                <Forecast data={weatherData.forecast} unit={unit} />
                                <WeatherAlerts data={weatherData.alerts} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
            <footer className="relative z-10 text-center py-4 text-white/60 text-sm">
                <p>MADE BY HOZAIFA ALI aka HOZI</p>
            </footer>
        </div>
    );
};

export default App;