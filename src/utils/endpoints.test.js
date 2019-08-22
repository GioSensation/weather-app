import {WEATHER_API_KEY} from '../constants/const';
import {expect} from 'chai';
import {getParamString, getOpenWeatherMapUrl} from './endpoints';

describe('Endpoints', () => {
    it('should translate undefined and {} into an empty param string', () => {
        expect(getParamString()).to.equal('');
        expect(getParamString({})).to.equal('');
    });

    it('should translate an object into a param string', () => {
        const params = {
            key1: 'value1',
            key2: 'value2'
        };
        const result = '&key1=value1&key2=value2';
        expect(getParamString(params)).to.equal(result);
    });

    it('should assemble the weather endpoint URL with params',  () => {
        const params = {
            key1: 'value1',
            key2: 'value2'
        };
        const url = getOpenWeatherMapUrl('endpoint')(params)('city');

        const prefix = 'https://api.openweathermap.org/data/2.5/weather';
        const paramString = getParamString(params);
        const result = `${prefix}endpoint?q=city&appid=${WEATHER_API_KEY}${paramString}`;
        expect(url).to.equal(result);
    });
});

// https://api.openweathermap.org/data/2.5/weather?q=London&appid=4d202f755d17e552c655cea328f2cf7a&units=metric
// https://api.openweathermap.org/data/2.5/forecast/daily?q=London&appid=4d202f755d17e552c655cea328f2cf7a&units=metric&cnt=16

