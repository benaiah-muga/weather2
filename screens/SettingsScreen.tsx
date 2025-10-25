
import React from 'react';
import type { Units } from '../types';
import { LocationMarkerIcon, TrashIcon } from '../components/icons';

type PermissionStatus = 'granted' | 'denied' | 'prompt';

interface SettingsScreenProps {
    currentUnits: Units;
    onUnitsChange: (units: Units) => void;
    permissionStatus: PermissionStatus;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ currentUnits, onUnitsChange, permissionStatus }) => {
    
    const handleClearCache = () => {
        // In a real app, this would clear localStorage, sessionStorage, or other caches.
        alert('Cached data has been cleared!');
    };

    const getLocationStatusText = () => {
        switch(permissionStatus) {
            case 'granted': return { text: 'Active', color: 'text-green-400' };
            case 'denied': return { text: 'Denied', color: 'text-red-400' };
            case 'prompt': return { text: 'Ask on next use', color: 'text-yellow-400' };
            default: return { text: 'Unknown', color: 'text-white/70' };
        }
    };
    const locationStatus = getLocationStatusText();

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

            {/* Data & Privacy Section */}
            <div className="p-6 bg-black/20 backdrop-blur-sm rounded-2xl shadow-lg">
                 <h2 className="text-sm font-semibold text-white/70 mb-4 uppercase tracking-wider">Data &amp; Privacy</h2>
                 <div className="flex items-center justify-between text-lg mb-4">
                    <div className="flex items-center gap-3">
                        <LocationMarkerIcon className="h-6 w-6 text-white/80" />
                        <span>Location Services</span>
                    </div>
                    <span className={`font-semibold capitalize ${locationStatus.color}`}>{locationStatus.text}</span>
                 </div>
                 <div className="w-full h-[1px] bg-white/20 my-4" />
                 <button onClick={handleClearCache} className="flex items-center justify-between text-lg w-full text-red-400 hover:text-red-300 transition-colors">
                    <div className="flex items-center gap-3">
                         <TrashIcon className="h-6 w-6" />
                        <span>Clear Cached Data</span>
                    </div>
                 </button>
            </div>

            {/* About Section */}
            <div className="p-6 bg-black/20 backdrop-blur-sm rounded-2xl shadow-lg">
                <h2 className="text-sm font-semibold text-white/70 mb-4 uppercase tracking-wider">About</h2>
                <div className="flex items-center justify-between text-lg">
                    <span>App Version</span>
                    <span className="text-white/80">1.2.0</span>
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
