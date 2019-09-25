import {getForecastTable, getTodaysTemplate} from '../utils/parser';

export const renderCity = ({today, forecast}) => {
  const domElement = document.querySelector('.js-city-weather');
  const todayData = getTodaysTemplate(today);
  const forecastData = getForecastTable(forecast)(0, 4);

  domElement.innerHTML = `${todayData}${forecastData}`;
};
