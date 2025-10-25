
import React from 'react';

interface WeatherIconProps {
    iconCode: string;
    size?: number;
    className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode, size = 64, className }) => {
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    
    return (
        <img 
            src={iconUrl} 
            alt="Weather icon" 
            width={size} 
            height={size} 
            className={`drop-shadow-lg ${className}`} 
        />
    );
};
