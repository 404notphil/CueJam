import {Duration} from 'luxon';

export const getBeginningOfDay = (date: Date): number => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
};

export const getBeginningOfWeek = (date: Date): number => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
  return new Date(date.getFullYear(), date.getMonth(), diff).getTime();
};

export const getBeginningOfMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getTime();
};
export const getBeginningOfYear = (date: Date): number => {
  return new Date(date.getFullYear(), 0, 1).getTime();
};

const timeUnitDefinitions = ['days', 'weeks', 'months'];
export type TimeUnit = (typeof timeUnitDefinitions)[number];
export const AllTimeUnits = [...timeUnitDefinitions] as TimeUnit[];



export const calculateXUnitsAgo = (x: number, unit: TimeUnit, now: number): number => {
  const date = new Date(now);
  if (unit === 'days') {
    date.setDate(date.getDate() - x);
  } else if (unit === 'weeks') {
    date.setDate(date.getDate() - x * 7);
  } else if (unit === 'months') {
    date.setMonth(date.getMonth() - x);
  }
  return date.getTime();
};

export const calculateTimes = (): TimeValues => {
  const now = Date.now();

  return {
    currentMoment: now,
    beginningOfToday: getBeginningOfDay(new Date(now)),
    beginningOfWeek: getBeginningOfWeek(new Date(now)),
    beginningOfMonth: getBeginningOfMonth(new Date(now)),
    beginningOfYear: getBeginningOfYear(new Date(now)),
    sevenDaysAgo: calculateXUnitsAgo(7, 'days', now),
    thirtyDaysAgo: calculateXUnitsAgo(30, 'days', now),
  };
};

export const formatDurationInMillis = (
  durationInMillis: number,
  locale: string = 'en',
) => {
  const fromMillis: Duration = Duration.fromMillis(durationInMillis);
  const hours = Math.floor(fromMillis.as('hours'));
  const minutes = Math.floor(fromMillis.minus({hours}).as('minutes'));
  const seconds = Math.floor(fromMillis.minus({hours, minutes}).as('seconds'));

  const nf = new Intl.NumberFormat(locale, {minimumIntegerDigits: 2});

  let formatted = '';
  if (hours > 0) {
    formatted += `${nf.format(hours)}h `;
  }
  if (minutes > 0 || hours > 0) {
    formatted += `${nf.format(minutes)}m `;
  }
  if (hours === 0 && minutes === 0) {
    formatted += `${nf.format(seconds)}s`;
  }

  return formatted.trim().replace(/^0+/, '');
};

export type TimeValues = {
  currentMoment: number;
  beginningOfToday: number;
  beginningOfWeek: number;
  beginningOfMonth: number;
  beginningOfYear: number;
  sevenDaysAgo: number;
  thirtyDaysAgo: number;
};
