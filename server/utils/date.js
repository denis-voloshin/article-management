import moment from 'moment';

export const getCurrentDate = () => {
  const currentDate = moment();

  return {
    unixTimestamp: currentDate.format('x'),
    unixTimestampShort: currentDate.format('X'),
    timezone: currentDate.format('ZZ'),
    year: currentDate.format('YYYY'),
    month: currentDate.format('MM'),
    monthString: currentDate.format('MMMM'),
    monthStringShort: currentDate.format('MMM'),
    day: currentDate.format('DD'),
    dayString: currentDate.format('Do'),
    hour: currentDate.format('HH'),
    hourShort: currentDate.format('H'),
    minute: currentDate.format('mm'),
    minuteShort: currentDate.format('m'),
    second: currentDate.format('ss'),
    secondShort: currentDate.format('s'),
    fractionalSecond: currentDate.format('SSS'),
    fractionalSecondShort: currentDate.format('S')
  };
};
