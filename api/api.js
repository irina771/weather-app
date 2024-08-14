import axios from 'axios';

const api_key = process.env.EXPO_PUBLIC_API_KEY;
const openWeatherMapApiKey =process.env.EXPO_PUBLIC_OPEN_WEATHER_MAP_API_KEY;

const forecastEndpoint = params => `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;
const openWeatherMapEndpoint = params => `https://api.openweathermap.org/data/2.5/forecast?lat=${params.lat}&lon=${params.lon}&appid=${params.apiKey}&units=metric`;
const locationEndpoint = params => `https://api.weatherapi.com/v1/search.json?key=${api_key}&q=${params.cityName}`;

const getOpenWeatherMapForecast = async (lat, lon) => {
    const endpoint = openWeatherMapEndpoint({ lat, lon, apiKey: openWeatherMapApiKey });
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (err) {
        console.log('Error fetching OpenWeatherMap data:', err);
        return null;
    }
}

const api = async (endpoint) => {
    const options = {
        method: 'GET',
        url: endpoint
    }
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (err) {
        console.log('error: ', err);
        return null;
    }
}

export const forecast = params => {
    return api(forecastEndpoint(params));
}

export const locationsfetch = params => {
    return api(locationEndpoint(params));
}

export default getOpenWeatherMapForecast; // Exporta la función para obtener el pronóstico de OpenWeatherMap
