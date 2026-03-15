import { DateTime } from 'luxon';
import constants from '../constants';

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
    time: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.utc,
        constants.dateConstraints.formats.time,
      ),
    date: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.utc,
        constants.dateConstraints.formats.date,
      ),
    dateTime: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.utc,
        constants.dateConstraints.formats.dateTime,
      ),
  },
  ist: {
    time: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.ist,
        constants.dateConstraints.formats.time,
      ),
    date: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.ist,
        constants.dateConstraints.formats.date,
      ),
    dateTime: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.ist,
        constants.dateConstraints.formats.dateTime,
      ),
  },
  gmt: {
    time: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.gmt,
        constants.dateConstraints.formats.time,
      ),
    date: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.gmt,
        constants.dateConstraints.formats.date,
      ),
    dateTime: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.gmt,
        constants.dateConstraints.formats.dateTime,
      ),
  },
  cst: {
    time: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.cst,
        constants.dateConstraints.formats.time,
      ),
    date: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.cst,
        constants.dateConstraints.formats.date,
      ),
    dateTime: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.cst,
        constants.dateConstraints.formats.dateTime,
      ),
  },
  jst: {
    time: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.jst,
        constants.dateConstraints.formats.time,
      ),
    date: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.jst,
        constants.dateConstraints.formats.date,
      ),
    dateTime: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.jst,
        constants.dateConstraints.formats.dateTime,
      ),
  },
  est: {
    time: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.est,
        constants.dateConstraints.formats.time,
      ),
    date: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.est,
        constants.dateConstraints.formats.date,
      ),
    dateTime: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.est,
        constants.dateConstraints.formats.dateTime,
      ),
  },
  pst: {
    time: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.pst,
        constants.dateConstraints.formats.time,
      ),
    date: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.pst,
        constants.dateConstraints.formats.date,
      ),
    dateTime: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.pst,
        constants.dateConstraints.formats.dateTime,
      ),
  },
  cet: {
    time: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.cet,
        constants.dateConstraints.formats.time,
      ),
    date: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.cet,
        constants.dateConstraints.formats.date,
      ),
    dateTime: () =>
      formatDateByTimeZone(
        constants.dateConstraints.timezones.cet,
        constants.dateConstraints.formats.dateTime,
      ),
  },
};
