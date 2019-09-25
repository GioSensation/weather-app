export const WEATHER_API_KEY = '4d202f755d17e552c655cea328f2cf7a';

export const DATE_FORMATTER = date => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric'
  });
  return formatter.format(date);
};
