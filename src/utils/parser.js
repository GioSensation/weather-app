import {getDate, getTime} from './timezone';

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

const getSunriseSunset = ({sys: {sunrise, sunset}, timezone}) =>
    `Sunrise: ${getTime(sunrise, timezone)}, Sunset: ${getTime(sunset, timezone)}`;

const getTodaysTemplate = response => `
<div>${getCity(response)}, ${getCountry(response)}: ${getWeatherData(response)}</div>
<div>${getTodaysTemperatures(response)}</div>
<div>${getSunriseSunset(response)}</div>`.trim();

const getForecastRow = forecast => rowNumber => {
    const row = forecast.list[rowNumber];
    if (!row) return '';
    
    const date = getDate(row.dt, forecast.city.timezone);
    return `
<tr>
    <td>${date}</td>
    <td>${row.temp.day}</td>
    <td>${row.weather[0].main} (${row.weather[0].description})</td>
</tr>
`.trim();
};

const getForecastTableBody = (rowTemplateFunction, currentRow, lastRow, accumulator) =>
  currentRow > lastRow ? accumulator :
    getForecastTableBody(
      rowTemplateFunction,
      currentRow + 1,
      lastRow,
      `${accumulator}\n${rowTemplateFunction(currentRow)}`
    );

const getForecastTable = forecast => (firstRow, lastRow) => {
    const rowTemplate = getForecastRow(forecast);
    const tableBody = getForecastTableBody(rowTemplate, firstRow, lastRow, '');
    return `
<table>
<tr>
    <td>Date</td>
    <td>Temperature (C)</td>
    <td>WeatherDescription</td>
</tr>
${tableBody}
</table>
    `.trim();
};

export {
    getCity,
    getCountry,
    getWeatherData,
    getTodaysTemperatures,
    getSunriseSunset,
    getTodaysTemplate,
    getForecastRow,
    getForecastTable
};
