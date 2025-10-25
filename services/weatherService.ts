
import { API_BASE_URL, API_KEY } from '../constants';
import type { WeatherData, ForecastData, Units } from '../types';

const handleResponse = async <T,>(response: Response): Promise<T> => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

const getCurrentWeather = async (city: string, units: Units): Promise<WeatherData> => {
    const response = await fetch(`${API_BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${units}`);
    return handleResponse<WeatherData>(response);
};

const getForecast = async (city: string, units: Units): Promise<ForecastData> => {
    const response = await fetch(`${API_BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${units}`);
    return handleResponse<ForecastData>(response);
};

const getCurrentWeatherByCoords = async (lat: number, lon: number, units: Units): Promise<WeatherData> => {
    const response = await fetch(`${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`);
    return handleResponse<WeatherData>(response);
};

const getForecastByCoords = async (lat: number, lon: number, units: Units): Promise<ForecastData> => {
    const response = await fetch(`${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`);
    return handleResponse<ForecastData>(response);
};

export const weatherService = {
    getCurrentWeather,
    getForecast,
    getCurrentWeatherByCoords,
    getForecastByCoords
};
