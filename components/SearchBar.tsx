
import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (city: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city);
            setCity('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search for a city..."
                className="w-full bg-black/30 placeholder-white/70 text-white rounded-full py-3 pl-5 pr-12 text-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-300"
            />
            <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
                aria-label="Search"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        </form>
    );
};
