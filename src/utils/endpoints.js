import {WEATHER_API_KEY} from '../constants/const';

export const getParamString = (params = {}) =>
    Object.entries(params).reduce((acc, param) =>
    `${acc}&${param[0]}=${param[1]}`, '');

export const getOpenWeatherMapUrl =
    endpoint =>
        params =>
            city =>
                `https://api.openweathermap.org/data/2.5/` +
                `${endpoint}?q=${city}&appid=${WEATHER_API_KEY}` +
                getParamString(params);
