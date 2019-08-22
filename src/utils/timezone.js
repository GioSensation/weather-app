export const getTime = (timestamp, timezoneOffset) => {
    // We account for the timezone offset and multiply by 1000 to get a valid JS timestamp
    const tzTimestamp = new Date((timestamp + timezoneOffset) * 1000);
    // Get UTC timestamps and add 0 if needed to have ie. '05' from '5'
    const hours = `${tzTimestamp.getUTCHours()}`.padStart(2, 0);
    const minutes = `${tzTimestamp.getUTCMinutes()}`.padStart(2, 0);
    return `${hours}:${minutes}`;
};
