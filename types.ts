
export type Unit = 'c' | 'f';

export interface WeatherCondition {
    text: string;
    icon: string;
    code: number;
}

export interface CurrentWeather {
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: WeatherCondition;
    wind_kph: number;
    wind_mph: number;
    humidity: number;
    air_quality: {
        'us-epa-index': number;
    };
}

export interface DayForecast {
    maxtemp_c: number;
    mintemp_c: number;
    maxtemp_f: number;
    mintemp_f: number;
    condition: WeatherCondition;
}

export interface ForecastDay {
    date: string;
    day: DayForecast;
}

export interface Forecast {
    forecastday: ForecastDay[];
}

export interface WeatherAlert {
    headline: string;
    event: string;
    desc: string;
    instruction: string;
}

export interface WeatherAlerts {
    alert: WeatherAlert[];
}

export interface WeatherData {
    location: {
        name: string;
        region: string;
        country: string;
        localtime: string;
    };
    current: CurrentWeather;
    forecast: Forecast;
    alerts: WeatherAlerts;
}

export interface WeatherConditionStyle {
    code: number;
    isDay: boolean;
}
