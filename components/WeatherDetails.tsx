
import React from 'react';
import type { WeatherData, Units } from '../types';
import { formatTime } from '../utils/formatters';
import { FeelsLikeIcon, HumidityIcon, SunriseIcon, SunsetIcon, WindIcon } from './icons';
import { getTempColorClassName } from '../utils/colors';

interface WeatherDetailsProps {
    data: WeatherData;
    units: Units;
}

interface DetailItemProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    unit?: string;
    valueClassName?: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value, unit, valueClassName }) => (
    <div className="flex items-center gap-3">
        <div className="text-white/80">{icon}</div>
        <div>
            <span className="text-sm text-white/80 block">{label}</span>
            <span className={`text-lg font-semibold ${valueClassName || ''}`}>{value}{unit}</span>
        </div>
    </div>
);

export const WeatherDetails: React.FC<WeatherDetailsProps> = ({ data, units }) => {
    const { main, wind, sys, timezone } = data;

    const tempUnit = units === 'metric' ? 'C' : 'F';
    const speedUnit = units === 'metric' ? ' km/h' : ' mph';
    const windSpeed = units === 'metric' ? Math.round(wind.speed * 3.6) : Math.round(wind.speed);

    return (
        <div className="p-6 bg-black/20 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                <DetailItem 
                    icon={<FeelsLikeIcon />} 
                    label="Feels Like" 
                    value={Math.round(main.feels_like)} 
                    unit={`°${tempUnit}`} 
                    valueClassName={`transition-colors duration-300 ${getTempColorClassName(main.feels_like)}`}
                />
                <DetailItem icon={<HumidityIcon />} label="Humidity" value={main.humidity} unit="%" />
                <DetailItem icon={<WindIcon />} label="Wind" value={windSpeed} unit={speedUnit} />
                <DetailItem icon={<SunriseIcon />} label="Sunrise" value={formatTime(sys.sunrise, timezone)} />
                <DetailItem icon={<SunsetIcon />} label="Sunset" value={formatTime(sys.sunset, timezone)} />
            </div>
        </div>
    );
};
