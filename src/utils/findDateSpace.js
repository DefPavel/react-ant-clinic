import moment from 'moment';

const checkInterval = (currTime, checkTime, interval) => {
  const [hours, minutes] = checkTime.split(':');
  const momentTime = moment(parseInt(hours) * 60 * 60 * 1000 + parseInt(minutes) * 60 * 1000);
  // eslint-disable-next-line no-underscore-dangle
  const diff = moment.duration(momentTime.diff(currTime))._data;
  const diffInMinutes = Math.abs(diff.hours) * 60 + Math.abs(diff.minutes);

  return diffInMinutes >= interval;
};

export const findDateSpace = (timeArray = [], interval = 60) => {
  const startTime = moment(8 * 60 * 60 * 1000);
  const endTime = moment(18 * 60 * 60 * 1000).subtract(interval, 'minutes');

  for (let freeTime = startTime; freeTime < endTime; freeTime.add(interval, 'minutes')) {
    if (timeArray.every((el) => checkInterval(freeTime, el, interval)))
      return freeTime.utc().format().split('T')[1].slice(0, 5);
  }
  return false;
};
