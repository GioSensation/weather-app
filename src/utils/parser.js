const getCity = response => response.name;
const getCountry = response => response.sys.country;
const getWeatherData = response => {
    const {main, description} = response.weather[0];
    return `${main} (${description})`;
};
const getTodaysTemperatures = response => {
    const {temp, temp_min, temp_max} = response.main;
    return `Temperature (min, average, max): ${[temp_min, temp, temp_max].join(', ')}`
};

const getSunriseSunset = response =>
    'Sunrise: hh:mm, Sunset: hh:mm';

const getTodaysTemplate = response => `
<div>${getCity(response)}, ${getCountry(response)}: ${getWeatherData(response)}</div>
<div>${getTodaysTemperatures(response)}</div>
<div>${getSunriseSunset(response)}</div>`.trim();

export {
    getCity,
    getCountry,
    getWeatherData,
    getTodaysTemperatures,
    getSunriseSunset,
    getTodaysTemplate,
    // getForecastRow,
    // getForecastTable
};
