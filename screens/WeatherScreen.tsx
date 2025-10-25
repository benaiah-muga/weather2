
import React from 'react';
import { CurrentWeather } from '../components/CurrentWeather';
import { SearchBar } from '../components/SearchBar';
import { WeatherDetails } from '../components/WeatherDetails';
import { HourlyForecast } from '../components/HourlyForecast';
import { RefreshIcon } from '../components/icons';
import type { WeatherData, ForecastData, Units } from '../types';

interface WeatherScreenProps {
    weather: WeatherData | null;
    forecast: ForecastData | null;
    error: string | null;
    isRefreshing: boolean;
    lastUpdated: string;
    units: Units;
    onSearch: (city: string) => void;
    onRefresh: () => void;
}

export const WeatherScreen: React.FC<WeatherScreenProps> = ({
    weather,
    forecast,
    error,
    isRefreshing,
    lastUpdated,
    units,
    onSearch,
    onRefresh,
}) => {
    return (
        <>
            <header className="mb-6">
                <div className="flex items-center gap-2">
                    <SearchBar onSearch={onSearch} />
                    <button
                        onClick={onRefresh}
                        className="p-3 bg-black/30 rounded-full hover:bg-white/30 transition-colors disabled:opacity-50"
                        aria-label="Refresh weather"
                        disabled={isRefreshing}
                    >
                        <RefreshIcon className={`h-6 w-6 text-white ${isRefreshing ? 'animate-spin' : ''}`} />
                    </button>
                </div>
                {lastUpdated && (
                    <p className="text-center text-xs text-white/60 mt-2">
                        Last updated: {lastUpdated}
                    </p>
                )}
            </header>
            <main>
                {error && (
                    <div className="text-center bg-red-500/50 p-4 rounded-lg mb-4">
                        <p>{error}</p>
                    </div>
                )}
                {weather && forecast && (
                    <div className="flex flex-col gap-6 animate-[fade-in_0.5s_ease-in-out]">
                        <CurrentWeather data={weather} units={units} />
                        <WeatherDetails data={weather} units={units} />
                        <HourlyForecast data={forecast.list.slice(0, 8)} timezone={forecast.city.timezone} units={units} />
                    </div>
                )}
            </main>
        </>
    );
};
