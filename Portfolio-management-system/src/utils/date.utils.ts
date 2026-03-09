import { DateTime } from "luxon";
import constraints from "../constraints";

interface DateFormats {
  time: () => string;
  date: () => string;
  dateTime: () => string;
  currentYear: () => string;
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
        constraints.dateConstraints.timezones.utc,
        constraints.dateConstraints.formats.time,
      ),
    date: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.utc,
        constraints.dateConstraints.formats.date,
      ),
    dateTime: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.utc,
        constraints.dateConstraints.formats.dateTime,
      ),
    currentYear: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.utc,
        constraints.dateConstraints.formats.year,
      ),
  },
  ist: {
    time: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.ist,
        constraints.dateConstraints.formats.time,
      ),
    date: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.ist,
        constraints.dateConstraints.formats.date,
      ),
    dateTime: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.ist,
        constraints.dateConstraints.formats.dateTime,
      ),
    currentYear: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.ist,
        constraints.dateConstraints.formats.year,
      ),
  },
  gmt: {
    time: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.gmt,
        constraints.dateConstraints.formats.time,
      ),
    date: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.gmt,
        constraints.dateConstraints.formats.date,
      ),
    dateTime: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.gmt,
        constraints.dateConstraints.formats.dateTime,
      ),
    currentYear: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.gmt,
        constraints.dateConstraints.formats.year,
      ),
  },
  cst: {
    time: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.cst,
        constraints.dateConstraints.formats.time,
      ),
    date: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.cst,
        constraints.dateConstraints.formats.date,
      ),
    dateTime: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.cst,
        constraints.dateConstraints.formats.dateTime,
      ),
    currentYear: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.cst,
        constraints.dateConstraints.formats.year,
      ),
  },
  jst: {
    time: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.jst,
        constraints.dateConstraints.formats.time,
      ),
    date: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.jst,
        constraints.dateConstraints.formats.date,
      ),
    dateTime: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.jst,
        constraints.dateConstraints.formats.dateTime,
      ),
    currentYear: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.jst,
        constraints.dateConstraints.formats.year,
      ),
  },
  est: {
    time: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.est,
        constraints.dateConstraints.formats.time,
      ),
    date: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.est,
        constraints.dateConstraints.formats.date,
      ),
    dateTime: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.est,
        constraints.dateConstraints.formats.dateTime,
      ),
    currentYear: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.est,
        constraints.dateConstraints.formats.year,
      ),
  },
  pst: {
    time: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.pst,
        constraints.dateConstraints.formats.time,
      ),
    date: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.pst,
        constraints.dateConstraints.formats.date,
      ),
    dateTime: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.pst,
        constraints.dateConstraints.formats.dateTime,
      ),
    currentYear: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.pst,
        constraints.dateConstraints.formats.year,
      ),
  },
  cet: {
    time: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.cet,
        constraints.dateConstraints.formats.time,
      ),
    date: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.cet,
        constraints.dateConstraints.formats.date,
      ),
    dateTime: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.cet,
        constraints.dateConstraints.formats.dateTime,
      ),
    currentYear: () =>
      formatDateByTimeZone(
        constraints.dateConstraints.timezones.cet,
        constraints.dateConstraints.formats.year,
      ),
  },
};
