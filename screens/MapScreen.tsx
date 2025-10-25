
import React from 'react';

export const MapScreen: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-black/20 backdrop-blur-sm rounded-2xl shadow-lg animate-[fade-in_0.5s_ease-in-out]">
            <h1 className="text-3xl font-bold mb-4">Map View</h1>
            <p className="text-lg text-white/80">
                Interactive weather map is coming soon!
            </p>
        </div>
    );
};
