
import React, { useState, useEffect, useCallback } from 'react';
import { Loader } from './components/Loader';
import { BottomNav } from './components/BottomNav';
import { WeatherScreen } from './screens/WeatherScreen';
import { ForecastScreen } from './screens/ForecastScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import type { WeatherData, ForecastData, Units } from './types';
import { weatherService } from './services/weatherService';

type PermissionStatus = 'granted' | 'denied' | 'prompt';

const App: React.FC = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [city, setCity] = useState<string>('London');
    const [lastUpdated, setLastUpdated] = useState<string>('');
    const [activeTab, setActiveTab] = useState<string>('weather');
    const [units, setUnits] = useState<Units>('metric');
    const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('prompt');


    const fetchWeatherData = useCallback(async (searchCity: string, currentUnits: Units, isRefresh = false) => {
        if (!isRefresh) setLoading(true);
        else setIsRefreshing(true);
        setError(null);
        try {
            const [weatherResponse, forecastResponse] = await Promise.all([
                weatherService.getCurrentWeather(searchCity, currentUnits),
                weatherService.getForecast(searchCity, currentUnits)
            ]);
            setWeather(weatherResponse);
            setForecast(forecastResponse);
            setCity(weatherResponse.name);
            setLastUpdated(new Date().toLocaleTimeString());
        } catch (err) {
            if (err instanceof Error) {
                 if (err.message.toLowerCase().includes('city not found')) {
                    setError(`Sorry, we couldn't find weather data for "${searchCity}".`);
                } else {
                    setError(err.message);
                }
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
            if (!isRefresh) setLoading(false);
            else setIsRefreshing(false);
        }
    }, []);

    const fetchWeatherByCoords = useCallback(async (lat: number, lon: number, currentUnits: Units) => {
        setLoading(true);
        setError(null);
        try {
            const [weatherResponse, forecastResponse] = await Promise.all([
                weatherService.getCurrentWeatherByCoords(lat, lon, currentUnits),
                weatherService.getForecastByCoords(lat, lon, currentUnits)
            ]);
            setWeather(weatherResponse);
            setForecast(forecastResponse);
            setCity(weatherResponse.name);
            setLastUpdated(new Date().toLocaleTimeString());
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
            setWeather(null);
            setForecast(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Handle Geolocation permission status
        if (navigator.permissions) {
            navigator.permissions.query({ name: 'geolocation' }).then((permission) => {
                setPermissionStatus(permission.state as PermissionStatus);
                permission.onchange = () => {
                    setPermissionStatus(permission.state as PermissionStatus);
                };
            });
        }

        // Fetch initial weather data
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude, units);
            },
            (err) => {
                console.warn(`Geolocation error (${err.code}): ${err.message}`);
                setError('Geolocation denied. Showing weather for London.');
                fetchWeatherData(city, units);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = (searchCity: string) => {
        if (searchCity && searchCity.trim().toLowerCase() !== city.toLowerCase()) {
            fetchWeatherData(searchCity, units);
        }
    };

    const handleRefresh = () => {
        if (city) {
            fetchWeatherData(city, units, true);
        }
    };

    const handleUnitsChange = (newUnits: Units) => {
        setUnits(newUnits);
        if(city) {
            fetchWeatherData(city, newUnits, true);
        }
    }
    
    const getBackgroundClass = (): string => {
        if (!weather) return 'from-gray-500 to-gray-700';
        const icon = weather.weather[0].icon;
        const isDay = icon.endsWith('d');
        if (isDay) {
            switch (weather.weather[0].main) {
                case 'Clear': return 'from-sky-500 to-indigo-600';
                case 'Clouds': return 'from-sky-600 to-slate-700';
                case 'Drizzle': return 'from-slate-500 to-slate-700';
                case 'Rain': return 'from-slate-600 to-slate-800';
                case 'Thunderstorm': return 'from-gray-800 to-indigo-900';
                case 'Snow': return 'from-sky-200 to-blue-400';
                default: return 'from-cyan-500 to-blue-600';
            }
        } else {
            switch (weather.weather[0].main) {
                case 'Clear': return 'from-indigo-800 to-slate-900';
                case 'Clouds': return 'from-gray-700 to-gray-900';
                case 'Drizzle': return 'from-gray-700 to-slate-800';
                case 'Rain': return 'from-gray-800 to-slate-900';
                case 'Thunderstorm': return 'from-slate-900 to-black';
                case 'Snow': return 'from-slate-600 to-gray-800';
                default: return 'from-gray-800 to-black';
            }
        }
    };

    const renderContent = () => {
        if (loading) {
            return <Loader />;
        }
        switch (activeTab) {
            case 'weather':
                return (
                    <WeatherScreen
                        weather={weather}
                        forecast={forecast}
                        error={error}
                        isRefreshing={isRefreshing}
                        lastUpdated={lastUpdated}
                        units={units}
                        onSearch={handleSearch}
                        onRefresh={handleRefresh}
                    />
                );
            case 'forecast':
                return <ForecastScreen forecast={forecast} units={units} />;
            case 'settings':
                return <SettingsScreen currentUnits={units} onUnitsChange={handleUnitsChange} permissionStatus={permissionStatus} />;
            default:
                return null;
        }
    };

    return (
        <div className={`min-h-screen w-screen flex flex-col bg-gradient-to-br text-white transition-colors duration-500 ${getBackgroundClass()}`}>
            <div className="flex-grow overflow-y-auto">
                <div className="mx-auto max-w-md p-4 pt-8 md:p-8 pb-28">
                    {renderContent()}
                </div>
            </div>
            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    );
};

export default App;
