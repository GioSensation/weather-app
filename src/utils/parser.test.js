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

    xit('should return the sunrise and sunset time', () => {

    });

    it('should full template for today', () => {
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
                country: 'COUNTRY_CODE'
            },
            name: 'City'
        };

        const response = `
<div>City, COUNTRY_CODE: Clouds (scattered clouds)</div>
<div>Temperature (min, average, max): 18, 20, 22</div>
<div>Sunrise: hh:mm, Sunset: hh:mm</div>`.trim();

        expect(getTodaysTemplate(input)).to.equal(response);
    });

    it('should return a forecast row', () => {

    });

    it('should return the full forecast table', () => {

    });
});
