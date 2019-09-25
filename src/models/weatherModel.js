import {getOpenWeatherMapUrl} from '../utils/endpoints';

const todaysWeatherUrl = getOpenWeatherMapUrl('weather')({units: 'metric'});
const forecastUrl = getOpenWeatherMapUrl('forecast')({units: 'metric', cnt: 16});

const getTodaysWeather = async city =>
    fetch(todaysWeatherUrl(city)).then(response => response.json());

const getWeatherForecast = async city =>
    fetch(forecastUrl(city)).then(response => response.json());

export const fetchWeather = async city => {
    const [today, forecast] = await Promise.all([
        getTodaysWeather(city),
        getWeatherForecast(city)
    ]);
    return {today, forecast};
};
