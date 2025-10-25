
export const getTempColorClassName = (temp: number): string => {
    if (temp <= 0) {
        return 'text-cyan-300';
    }
    if (temp > 0 && temp <= 10) {
        return 'text-blue-300';
    }
    if (temp > 10 && temp <= 18) {
        return 'text-green-300';
    }
    if (temp > 18 && temp <= 25) {
        return 'text-yellow-300';
    }
    if (temp > 25 && temp <= 32) {
        return 'text-orange-400';
    }
    if (temp > 32) {
        return 'text-red-500';
    }
    return 'text-white'; // Default
};
