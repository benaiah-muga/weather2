
import React from 'react';

interface IconProps {
    className?: string;
}

export const FeelsLikeIcon: React.FC<IconProps> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

export const HumidityIcon: React.FC<IconProps> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.25a6.25 6.25 0 01-6.25-6.25c0-3.45 2.8-6.25 6.25-6.25s6.25 2.8 6.25 6.25A6.25 6.25 0 0112 18.25zM12 5.75v.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.25a6.25 6.25 0 01-6.25-6.25c0-3.45 2.8-6.25 6.25-6.25s6.25 2.8 6.25 6.25A6.25 6.25 0 0112 18.25z" transform="rotate(180 12 12)" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5a.5.5 0 01-.5-.5 4 4 0 014-4 .5.5 0 010 1 3 3 0 00-3 3 .5.5 0 01-.5.5z" />
    </svg>
);

export const WindIcon: React.FC<IconProps> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l-2-2m0 0l2-2m-2 2h10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5l-2 2m0 0l2 2m-2-2h10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h10l-2-2m2 2l-2 2" />
    </svg>
);

export const SunriseIcon: React.FC<IconProps> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m-6.36 2.64l1.42 1.42M2 12h2m16 0h2m-4.64-6.36l1.42-1.42M12 18.5V22m-8-3.5h16M5 15l7-7 7 7" />
    </svg>
);

export const SunsetIcon: React.FC<IconProps> = ({ className = "h-6 w-6" }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8V6m-6.36 2.64l1.42-1.42M2 12h2m16 0h2m-4.64 6.36l1.42 1.42M12 18.5V22m-8-3.5h16M5 12l7 7 7-7" />
    </svg>
);

export const RefreshIcon: React.FC<IconProps> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4a12 12 0 0116 16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 4a12 12 0 00-16 16" />
    </svg>
);


export const WeatherNavIcon: React.FC<IconProps> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h1m16 0h1m-8.5-9.5V2M12 22v-1.5M4.929 4.929l.707.707M18.364 18.364l.707.707M4.929 19.071l.707-.707M18.364 5.636l.707-.707M15.5 12a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" />
    </svg>
);

export const ForecastNavIcon: React.FC<IconProps> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

export const SettingsNavIcon: React.FC<IconProps> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
