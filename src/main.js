import {fetchWeather} from './models/weatherModel';
import {renderCity} from './presenters/cityPresenter';

document.querySelector('.js-search-city').addEventListener('click', searchCity);

function searchCity() {
    const textField = document.querySelector('.js-city-field');
    const city = textField.value;
    fetchWeather(city).then(response => {
        renderCity(response);
    });
    textField.value = '';
}
