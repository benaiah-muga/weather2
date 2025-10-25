
import React from 'react';
import { Forecast } from '../components/Forecast';
import type { ForecastData, Units } from '../types';

interface ForecastScreenProps {
    forecast: ForecastData | null;
    units: Units;
}

export const ForecastScreen: React.FC<ForecastScreenProps> = ({ forecast, units }) => {
    return (
        <div className="flex flex-col gap-6 animate-[fade-in_0.5s_ease-in-out]">
             {forecast ? (
                <Forecast data={forecast} units={units} />
             ) : (
                <div className="text-center p-6 bg-black/20 backdrop-blur-sm rounded-2xl shadow-lg">
                    <p>Forecast data is not available.</p>
                </div>
             )}
        </div>
    );
};
