import {getForecastTable, getTodaysTemplate} from '../utils/parser';

const renderForecast = (forecastTemplate, firstIndex, lastIndex) => {
    const tableMarkup = forecastTemplate(firstIndex, lastIndex);
    const containerNode = document.querySelector('.js-forecast');
    if (containerNode) containerNode.innerHTML = tableMarkup;
};

export const renderCity = ({today, forecast}) => {
    const domElement = document.querySelector('.js-city-weather');
    const todayData = getTodaysTemplate(today);
    let firstPage = 0;
    const numOfPages = 5;

    domElement.innerHTML = `
        ${todayData}
        <button class="up-button js-up">Up</button>
        <div class="js-forecast"></div>
        <button class="down-button js-down">Down</button>`;

    const forecastTemplate = getForecastTable(forecast);
    const wrappedRenderForecast = () =>
        renderForecast(forecastTemplate, firstPage, firstPage + numOfPages - 1);
    wrappedRenderForecast();

    const moveUp = () => {
        firstPage = Math.max(0, firstPage - 1);
        wrappedRenderForecast();
    };
    const moveDown = () => {
        firstPage = Math.min(10, firstPage + 1);
        wrappedRenderForecast();
    };

    document.querySelector('.js-up').addEventListener('click', moveUp);
    document.querySelector('.js-down').addEventListener('click', moveDown);
};
