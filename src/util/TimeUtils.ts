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

export const calculateXUnitsAgo = (
  x: number,
  unit: 'days' | 'weeks' | 'months',
  now: number,
): number => {
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
    sevenDaysAgo: calculateXUnitsAgo(7, 'days', now),
    thirtyDaysAgo: calculateXUnitsAgo(30, 'days', now),
  };
};

export type TimeValues = {
    currentMoment: number;
    beginningOfToday: number;
    beginningOfWeek: number;
    beginningOfMonth: number;
    sevenDaysAgo: number;
    thirtyDaysAgo: number;
  };