
import React from 'react';
import type { WeatherData, Units } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { getTempColorClassName } from '../utils/colors';

interface CurrentWeatherProps {
    data: WeatherData;
    units: Units;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, units }) => {
    const { name, main, weather, sys } = data;
    const weatherInfo = weather[0];
    const tempColorClass = getTempColorClassName(main.temp);
    const unitSymbol = units === 'metric' ? 'C' : 'F';

    return (
        <div className="flex flex-col items-center text-center p-6 bg-black/20 backdrop-blur-sm rounded-2xl shadow-lg">
            <h1 className="text-4xl font-bold tracking-wide">{name}, {sys.country}</h1>
            <div className="my-4">
                 <WeatherIcon iconCode={weatherInfo.icon} size={128} />
            </div>
            <p className={`text-7xl font-light transition-colors duration-500 ${tempColorClass}`}>{Math.round(main.temp)}&deg;{unitSymbol}</p>
            <p className="text-2xl capitalize mt-2">{weatherInfo.description}</p>
        </div>
    );
};
