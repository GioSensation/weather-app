import {expect} from 'chai';
import {
    getCity,
    getCountry,
    getWeatherData,
    getTodaysTemperatures,
    getSunriseSunset,
    getTodaysTemplate,
    getForecastRow,
    getForecastTable
} from './parser';

describe('Parser util', () => {
    it('should return the city', () => {
        expect(getCity({name:'City'})).to.equal('City');
    });

    it('should return the country', () => {
        expect(getCountry({
            sys: {
                country: 'COUNTRY_CODE'
            }
        })).to.equal('COUNTRY_CODE');
    });

    it('should return the weather condition and description', () => {
        const input = {
            weather: [
                {
                    main: 'Clouds',
                    description: 'scattered clouds'
                }
            ]
        };
        const response = 'Clouds (scattered clouds)';

        expect(getWeatherData(input)).to.equal(response);
    });

    it('should return todays temperatures', () => {
        const input = {
            main: {
                temp: 20,
                temp_min: 18,
                temp_max: 22
            }
        };
        const response = 'Temperature (min, average, max): 18, 20, 22';
        expect(getTodaysTemperatures(input)).to.equal(response);
    });

    it('should return the sunrise and sunset time', () => {
        const weatherInputDallas = {
            sys: {
                sunrise: 1566474921,
                sunset: 1566522317
            },
            timezone: -18000
        };
        const response = 'Sunrise: 06:55, Sunset: 20:05';
        expect(getSunriseSunset(weatherInputDallas)).to.equal(response);
    });

    it('should return full template for today', () => {
        const input = {
            main: {
                temp: 20,
                temp_min: 18,
                temp_max: 22
            },
            weather: [
                {
                    main: 'Clouds',
                    description: 'scattered clouds'
                }
            ],
            sys: {
                country: 'COUNTRY_CODE',
                sunrise: 1566474921,
                sunset: 1566522317
            },
            name: 'City',
            timezone: -18000
        };

        const response = `
<div>City, COUNTRY_CODE: Clouds (scattered clouds)</div>
<div>Temperature (min, average, max): 18, 20, 22</div>
<div>Sunrise: 06:55, Sunset: 20:05</div>`.trim();

        expect(getTodaysTemplate(input)).to.equal(response);
    });

    it('should return a forecast row', () => {
        const forecastResponse = {
            list: [
                {
                    dt: 1569402000,
                    main: {temp: 20},
                    weather: [{
                        main: 'Sunny',
                        description: 'sky is clear'
                    }]
                },
                {
                    dt: 1569488400,
                    main: {temp: 16},
                    weather: [{
                        main: 'Clouds',
                        description: 'broken clouds'
                    }]
                }
            ],
            city: {
                timezone: -18000
            }
        };
        const firstRow = getForecastRow(forecastResponse)(0);
        const secondRow = getForecastRow(forecastResponse)(1);

        const expectedFirstRow = `
<tr>
    <td>Sep 25</td>
    <td>20</td>
    <td>Sunny (sky is clear)</td>
</tr>
`.trim();
        const expectedSecondRow = `
<tr>
    <td>Sep 26</td>
    <td>16</td>
    <td>Clouds (broken clouds)</td>
</tr>
`.trim();

        expect(firstRow).to.equal(expectedFirstRow);
        expect(secondRow).to.equal(expectedSecondRow);
    });

    it('should return an empty string if the forecast row does not exist', () => {
        const forecastResponse = {
            list: [],
            city: {
                timezone: -18000
            }
        };
        const firstRow = getForecastRow(forecastResponse)(0);
        expect(firstRow).to.equal('');
    });

    it('should return the full forecast table', () => {
        const forecastResponse = {
            list: [
                {
                    dt: 1569402000,
                    main: {temp: 20},
                    weather: [{
                        main: 'Sunny',
                        description: 'sky is clear'
                    }]
                },
                {
                    dt: 1569488400,
                    main: {temp: 16},
                    weather: [{
                        main: 'Clouds',
                        description: 'broken clouds'
                    }]
                }
            ],
            city: {
                timezone: -18000
            }
        };
        const table = getForecastTable(forecastResponse)(0, 1);

        const expectedResult = `
<table>
<tr>
    <td>Date</td>
    <td>Temperature (C)</td>
    <td>WeatherDescription</td>
</tr>

<tr>
    <td>Sep 25</td>
    <td>20</td>
    <td>Sunny (sky is clear)</td>
</tr>
<tr>
    <td>Sep 26</td>
    <td>16</td>
    <td>Clouds (broken clouds)</td>
</tr>
</table>`.trim();

        expect(table).to.equal(expectedResult);
    });
});
