import moment from 'moment';

export const getDate = (date: string) => {
  return moment(date).format('DD/MM/YYYY');
};

export const compareTime = (time_start: string) => {
  try {
    if (!time_start) return true;
    const date = new Date(Date.now());
    date.setHours(parseInt(time_start.substring(0, 2)));
    date.setMinutes(parseInt(time_start.substring(3)));
    const time_start_stam = date.getTime();
    const now = new Date().getTime();
    if (time_start_stam > now) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return true;
  }
};

export const getHourAndMinute = (time: string) => {
  const hour = parseInt(time.substring(0, 2));
  const minute = parseInt(time.substring(3));
  return {hour, minute};
};
