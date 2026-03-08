import { DateTime } from 'luxon';

interface DateFormats {
  time: () => string;
  date: () => string;
  dateTime: () => string;
}

interface TimeZone {
  [key: string]: DateFormats;
}

export const formatDateByTimeZone = (timezone: string, format: string) => {
  const now = DateTime.now();
  const date = now.setZone(timezone).toFormat(format);
  return date;
};

export default <TimeZone>{
  utc: {
    time: () => formatDateByTimeZone('UTC', 'HH:mm:ss'),
    date: () => formatDateByTimeZone('UTC', 'yyyy-MM-dd'),
    dateTime: () => formatDateByTimeZone('UTC', 'yyyy-MM-dd HH:mm:ss'),
  },
  ist: {
    time: () => formatDateByTimeZone('Asia/Kolkata', 'HH:mm:ss'),
    date: () => formatDateByTimeZone('Asia/Kolkata', 'yyyy-MM-dd'),
    dateTime: () => formatDateByTimeZone('Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss'),
  },
  gmt: {
    time: () => formatDateByTimeZone('GMT', 'HH:mm:ss'),
    date: () => formatDateByTimeZone('GMT', 'yyyy-MM-dd'),
    dateTime: () => formatDateByTimeZone('GMT', 'yyyy-MM-dd HH:mm:ss'),
  },
  cst: {
    time: () => formatDateByTimeZone('America/Chicago', 'HH:mm:ss'),
    date: () => formatDateByTimeZone('America/Chicago', 'yyyy-MM-dd'),
    dateTime: () => formatDateByTimeZone('America/Chicago', 'yyyy-MM-dd HH:mm:ss'),
  },
  jst: {
    time: () => formatDateByTimeZone('Asia/Tokyo', 'HH:mm:ss'),
    date: () => formatDateByTimeZone('Asia/Tokyo', 'yyyy-MM-dd'),
    dateTime: () => formatDateByTimeZone('Asia/Tokyo', 'yyyy-MM-dd HH:mm:ss'),
  },
  est: {
    time: () => formatDateByTimeZone('America/New_York', 'HH:mm:ss'),
    date: () => formatDateByTimeZone('America/New_York', 'yyyy-MM-dd'),
    dateTime: () => formatDateByTimeZone('America/New_York', 'yyyy-MM-dd HH:mm:ss'),
  },
  pst: {
    time: () => formatDateByTimeZone('America/Los_Angeles', 'HH:mm:ss'),
    date: () => formatDateByTimeZone('America/Los_Angeles', 'yyyy-MM-dd'),
    dateTime: () => formatDateByTimeZone('America/Los_Angeles', 'yyyy-MM-dd HH:mm:ss'),
  },
  cet: {
    time: () => formatDateByTimeZone('Europe/Paris', 'HH:mm:ss'),
    date: () => formatDateByTimeZone('Europe/Paris', 'yyyy-MM-dd'),
    dateTime: () => formatDateByTimeZone('Europe/Paris', 'yyyy-MM-dd HH:mm:ss'),
  },
};
