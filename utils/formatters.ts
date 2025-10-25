
export const formatTime = (timestamp: number, timezone: number): string => {
    // The timezone from OpenWeatherMap is a shift in seconds from UTC
    const date = new Date((timestamp * 1000) + (timezone * 1000));
    
    // Use toLocaleTimeString with a specific timeZone ('UTC') to prevent double-offsetting
    // and format it according to local conventions but based on the calculated time.
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: 'UTC'
    });
};
