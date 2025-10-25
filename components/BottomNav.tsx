
import React from 'react';
import { WeatherNavIcon, ForecastNavIcon, SettingsNavIcon } from './icons';

interface BottomNavProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const navItems = [
    { id: 'weather', label: 'Weather', icon: WeatherNavIcon },
    { id: 'forecast', label: 'Forecast', icon: ForecastNavIcon },
    { id: 'settings', label: 'Settings', icon: SettingsNavIcon },
];

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto">
            <div className="bg-black/20 backdrop-blur-lg rounded-t-2xl shadow-lg mx-2">
                <div className="flex justify-around items-center h-20">
                    {navItems.map((item) => {
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onTabChange(item.id)}
                                className={`flex flex-col items-center justify-center gap-1 w-full transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <item.icon className="h-6 w-6" />
                                <span className="text-xs font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
