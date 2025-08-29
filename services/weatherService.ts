import type { WeatherData } from '../types';

// The API key is sourced from an environment variable for security.
// This requires a build process (like Vite or Create React App) to inject the variable.
const apiKey = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
    const url = `${BASE_URL}/forecast.json?key=${apiKey}&q=${location}&days=5&aqi=yes&alerts=yes`;

    const response = await fetch(url);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'Failed to fetch weather data');
    }

    const data: WeatherData = await response.json();
    return data;
};