import {expect} from 'chai';
import {getTime} from './timezone';

describe('Timezone util', () => {
    it('should return the city', () => {
        // Use a Brisbane time and timezoneOffset
        expect(getTime(1494966143, 36000)).to.equal('06:22');
    });
});
