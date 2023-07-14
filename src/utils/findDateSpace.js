const convertToTime = (timefloat) => {
  const minutes = timefloat % 1;
  const hours = timefloat - minutes;

  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

export const findDateSpace = (timeArray = [], interval = 3600) => {
  const intervalInHours = parseFloat(`0.${interval / 60}`);
  console.log(intervalInHours);
  for (let i = 8.0; i < 18.0; i += intervalInHours) {
    if (
      timeArray.every((el) => {
        const floatTime = parseFloat(el);
        return i >= floatTime + intervalInHours || i <= floatTime - intervalInHours;
      })
    )
      return convertToTime(i);
  }

  return false;
};
