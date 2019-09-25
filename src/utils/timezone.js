import {DATE_FORMATTER} from '../constants/const';

// We account for the timezone offset and multiply by 1000 to get a valid JS timestamp
const getTzTimestamp = (timestamp, timezoneOffset) => new Date((timestamp + timezoneOffset) * 1000);

export const getTime = (timestamp, timezoneOffset) => {
    const tzTimestamp = getTzTimestamp(timestamp, timezoneOffset);
    // Get UTC timestamps and add 0 if needed to have ie. '05' from '5'
    const hours = `${tzTimestamp.getUTCHours()}`.padStart(2, 0);
    const minutes = `${tzTimestamp.getUTCMinutes()}`.padStart(2, 0);
    return `${hours}:${minutes}`;
};

export const getDate = (timestamp, timezoneOffset) => {
    const tzTimestamp = getTzTimestamp(timestamp, timezoneOffset);
    return DATE_FORMATTER(tzTimestamp);
};
