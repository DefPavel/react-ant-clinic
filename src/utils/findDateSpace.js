const convertToTime = (timefloat) => {
  const minutes = timefloat % 1;
  const hours = timefloat - minutes;

  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

export const findDateSpace = (timeArray = [], interval = 3600) => {
  for (let i = 8.0; i < 18.0; i += interval / 60 / 60) {
    if (
      timeArray.every((el) => {
        const floatTime = parseFloat(el);
        return i >= floatTime + interval / 60 / 60 || i <= floatTime - interval / 60 / 60;
      })
    )
      return convertToTime(i);
  }
};
