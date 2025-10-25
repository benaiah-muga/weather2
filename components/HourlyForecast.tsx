
import React from 'react';
import type { ForecastData, Units } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { formatTime } from '../utils/formatters';
import { getTempColorClassName } from '../utils/colors';

interface HourlyForecastProps {
    data: ForecastData['list'];
    timezone: number;
    units: Units;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ data, timezone, units }) => {
    const unitSymbol = units === 'metric' ? 'C' : 'F';
    return (
        <div className="p-6 bg-black/20 backdrop-blur-sm rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-white/80">Hourly Forecast</h2>
            <div className="flex overflow-x-auto space-x-6 pb-2 -mb-2">
                {data.map((item, index) => {
                    const tempColorClass = getTempColorClassName(item.main.temp);
                    return (
                        <div key={index} className="flex flex-col items-center flex-shrink-0">
                            <p className="text-sm text-white/80">
                                {formatTime(item.dt, timezone)}
                            </p>
                            <div className="my-1">
                                <WeatherIcon iconCode={item.weather[0].icon} size={48} />
                            </div>
                            <p className={`font-semibold text-lg transition-colors duration-300 ${tempColorClass}`}>{Math.round(item.main.temp)}&deg;{unitSymbol}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
