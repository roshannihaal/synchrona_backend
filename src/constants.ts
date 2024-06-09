export const timeUnits = {
  SECONDS_IN_A_MINUTE: 60,
  MINUTES_IN_AN_HOUR: 60,
  SECONDS_IN_AN_HOUR: 60 * 60,
  HOURS_IN_A_DAY: 24,
  SECONDS_IN_A_DAY: 24 * 60 * 60,
}

export const route = {
  MINUTE: 'minute',
  HOUR: 'hour',
  DAY: 'day',
  MONTH: 'month',
  YEAR: 'year',
  ROOT: '/',
}

export const eventEmitter = {
  INIT: 'init',
  MINUTE_SYNC: 'minuteSync',
  HOUR_SYNC: 'hourSync',
  DAY_SYNC: 'daySync',
  MONTH_SYNC: 'monthSync',
  YEAR_SYNC: 'yearSync',
  META_SYNC: 'metaSync',
}
