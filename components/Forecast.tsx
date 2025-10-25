
import React, { useState } from 'react';
import type { ForecastData, Units } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { getTempColorClassName } from '../utils/colors';
import { ChevronDownIcon, HumidityIcon, WindIcon } from './icons';

interface ForecastProps {
    data: ForecastData;
    units: Units;
}

interface DailyForecast {
    day: string;
    minTemp: number;
    maxTemp: number;
    icon: string;
    description: string;
    humidity: number;
    pop: number; // Probability of precipitation
    windSpeed: number;
}

export const Forecast: React.FC<ForecastProps> = ({ data, units }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const unitSymbol = units === 'metric' ? '°C' : '°F';
    const speedUnit = units === 'metric' ? 'km/h' : 'mph';

    const aggregateDailyForecasts = (): DailyForecast[] => {
        const dailyData: { [key: string]: { temps: number[], icons: { [key: string]: number }, descriptions: { [key: string]: number }, humidities: number[], pops: number[], winds: number[] } } = {};

        data.list.forEach(item => {
            const day = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });

            if (!dailyData[day]) {
                dailyData[day] = { temps: [], icons: {}, descriptions: {}, humidities: [], pops: [], winds: [] };
            }
            dailyData[day].temps.push(item.main.temp);
            dailyData[day].humidities.push(item.main.humidity);
            dailyData[day].pops.push(item.pop);
            dailyData[day].winds.push(item.wind.speed);

            const icon = item.weather[0].icon;
            const description = item.weather[0].description;
            dailyData[day].icons[icon] = (dailyData[day].icons[icon] || 0) + 1;
            dailyData[day].descriptions[description] = (dailyData[day].descriptions[description] || 0) + 1;
        });

        return Object.entries(dailyData).map(([day, values]) => {
            const minTemp = Math.round(Math.min(...values.temps));
            const maxTemp = Math.round(Math.max(...values.temps));
            
            const mostFrequentIcon = Object.keys(values.icons).reduce((a, b) => values.icons[a] > values.icons[b] ? a : b);
            const mostFrequentDescription = Object.keys(values.descriptions).reduce((a, b) => values.descriptions[a] > values.descriptions[b] ? a : b);
            
            const avgHumidity = Math.round(values.humidities.reduce((a, b) => a + b, 0) / values.humidities.length);
            const maxPop = Math.round(Math.max(...values.pops) * 100);
            const maxWind = Math.max(...values.winds);
            const windSpeed = units === 'metric' ? Math.round(maxWind * 3.6) : Math.round(maxWind);

            return { day, minTemp, maxTemp, icon: mostFrequentIcon, description: mostFrequentDescription, humidity: avgHumidity, pop: maxPop, windSpeed };
        }).slice(0, 5);
    };
    
    const dailyForecasts = aggregateDailyForecasts();

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="p-6 bg-black/20 backdrop-blur-sm rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-white/80">5-Day Forecast</h2>
            <div className="flex flex-col gap-2">
                {dailyForecasts.map((item, index) => (
                    <div key={index} className="bg-white/10 rounded-lg transition-all duration-300">
                        <button 
                            onClick={() => handleToggle(index)}
                            className="flex items-center justify-between w-full p-3"
                        >
                            <p className="w-1/4 text-left font-medium">{item.day}</p>
                            <div className="w-1/4 flex justify-center">
                                <WeatherIcon iconCode={item.icon} size={40} />
                            </div>
                            <p className="w-1/4 text-right font-medium">
                                <span className={getTempColorClassName(item.maxTemp)}>{item.maxTemp}{unitSymbol}</span>
                                <span className={`ml-2 opacity-60 ${getTempColorClassName(item.minTemp)}`}>{item.minTemp}{unitSymbol}</span>
                            </p>
                            <div className="w-1/12 flex justify-end">
                                <ChevronDownIcon className={`h-5 w-5 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                            </div>
                        </button>
                        {openIndex === index && (
                             <div className="px-4 pb-4 animate-[fade-in_0.5s_ease-in-out]">
                                <div className="border-t border-white/20 pt-3">
                                    <p className="text-center capitalize mb-3 text-white/90">{item.description}</p>
                                    <div className="grid grid-cols-3 gap-2 text-center">
                                        <div className="flex flex-col items-center">
                                            <HumidityIcon className="h-5 w-5 text-white/80" />
                                            <span className="text-sm mt-1">{item.humidity}%</span>
                                            <span className="text-xs text-white/60">Humidity</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-1.414v.001M9 12h.01M15 12h.01M12 15h.01M12 9h.01" /></svg>
                                            <span className="text-sm mt-1">{item.pop}%</span>
                                            <span className="text-xs text-white/60">Rain</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <WindIcon className="h-5 w-5 text-white/80" />
                                            <span className="text-sm mt-1">{item.windSpeed} {speedUnit}</span>
                                            <span className="text-xs text-white/60">Wind</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
