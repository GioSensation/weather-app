import {expect} from 'chai';
import {getDate, getTime} from './timezone';

describe('Timezone util', () => {
    it('should return the time adjusted to the timezone offset', () => {
        // Use a Brisbane time and timezoneOffset
        expect(getTime(1494966143, 36000)).to.equal('06:22');
    });

    it('should return the formatted date from timestamp and timezone offset', () => {
        expect(getDate(1569346802, -18000)).to.equal('Sep 24');
    });
});
