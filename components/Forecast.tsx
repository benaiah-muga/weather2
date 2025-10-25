
import React from 'react';
import type { ForecastData, Units } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { getTempColorClassName } from '../utils/colors';

interface ForecastProps {
    data: ForecastData;
    units: Units;
}

interface DailyForecast {
    day: string;
    minTemp: number;
    maxTemp: number;
    icon: string;
}

export const Forecast: React.FC<ForecastProps> = ({ data, units }) => {
    const unitSymbol = units === 'metric' ? 'C' : 'F';
    
    const aggregateDailyForecasts = (): DailyForecast[] => {
        const dailyData: { [key: string]: { temps: number[], icons: { [key: string]: number } } } = {};

        data.list.forEach(item => {
            const day = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });

            if (!dailyData[day]) {
                dailyData[day] = { temps: [], icons: {} };
            }
            dailyData[day].temps.push(item.main.temp);
            const icon = item.weather[0].icon;
            dailyData[day].icons[icon] = (dailyData[day].icons[icon] || 0) + 1;
        });

        return Object.entries(dailyData).map(([day, values]) => {
            const minTemp = Math.round(Math.min(...values.temps));
            const maxTemp = Math.round(Math.max(...values.temps));
            
            const mostFrequentIcon = Object.keys(values.icons).reduce((a, b) => values.icons[a] > values.icons[b] ? a : b);

            return { day, minTemp, maxTemp, icon: mostFrequentIcon };
        }).slice(0, 5); // Ensure only 5 days are shown
    };
    
    const dailyForecasts = aggregateDailyForecasts();

    return (
        <div className="p-6 bg-black/20 backdrop-blur-sm rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-white/80">5-Day Forecast</h2>
            <div className="flex flex-col gap-4">
                {dailyForecasts.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <p className="w-1/3 font-medium">
                            {item.day}
                        </p>
                        <div className="w-1/3 flex justify-center">
                             <WeatherIcon iconCode={item.icon} size={40} />
                        </div>
                        <p className="w-1/3 text-right font-medium">
                            <span className={`transition-colors duration-300 ${getTempColorClassName(item.maxTemp)}`}>{item.maxTemp}&deg;{unitSymbol}</span>
                            <span className={`transition-colors duration-300 ml-2 opacity-60 ${getTempColorClassName(item.minTemp)}`}>{item.minTemp}&deg;{unitSymbol}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
