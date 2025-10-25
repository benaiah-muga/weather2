
import React from 'react';
import type { Units } from '../types';

interface SettingsScreenProps {
    currentUnits: Units;
    onUnitsChange: (units: Units) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ currentUnits, onUnitsChange }) => {
    return (
        <div className="flex flex-col gap-6 animate-[fade-in_0.5s_ease-in-out]">
            <h1 className="text-3xl font-bold text-center mb-2">Settings</h1>

            {/* Units Section */}
            <div className="p-6 bg-black/20 backdrop-blur-sm rounded-2xl shadow-lg">
                <h2 className="text-sm font-semibold text-white/70 mb-4 uppercase tracking-wider">Units</h2>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Temperature</span>
                    <div className="relative flex items-center bg-black/30 rounded-full p-1">
                        <button 
                            onClick={() => onUnitsChange('metric')}
                            className={`relative z-10 w-20 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${currentUnits === 'metric' ? 'text-black' : 'text-white'}`}
                        >
                            &deg;C
                        </button>
                        <button 
                            onClick={() => onUnitsChange('imperial')}
                            className={`relative z-10 w-20 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${currentUnits === 'imperial' ? 'text-black' : 'text-white'}`}
                        >
                            &deg;F
                        </button>
                        <div
                            className={`absolute top-1 bottom-1 w-20 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                                currentUnits === 'metric' ? 'translate-x-0' : 'translate-x-full'
                            }`}
                        />
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="p-6 bg-black/20 backdrop-blur-sm rounded-2xl shadow-lg">
                <h2 className="text-sm font-semibold text-white/70 mb-4 uppercase tracking-wider">About</h2>
                <div className="flex items-center justify-between text-lg">
                    <span>App Version</span>
                    <span className="text-white/80">1.1.0</span>
                </div>
                <div className="w-full h-[1px] bg-white/20 my-4" />
                <div className="flex items-center justify-between text-lg">
                    <span>Data Source</span>
                    <span className="text-white/80">OpenWeatherMap</span>
                </div>
            </div>
        </div>
    );
};
