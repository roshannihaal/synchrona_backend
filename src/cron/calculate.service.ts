import { io } from '../app'
import { eventEmitter, route, timeUnits } from '../constants'
import {
  getCurrDate,
  getFormattedDate,
  calculatePercentage,
  getDaysInAMonth,
  getDaysInAYear,
} from '../utils'
import { emitSocketEvent } from '../utils'

export const calculateMinute = () => {
  const currDate = getCurrDate()
  const { second } = getFormattedDate(currDate)

  const percentage = calculatePercentage(second, timeUnits.SECONDS_IN_A_MINUTE)

  const result = {
    date: currDate,
    percentage,
  }
  emitSocketEvent(route.MINUTE, eventEmitter.MINUTE_SYNC, result)
}

export const calculateHour = () => {
  const currDate = getCurrDate()
  const { second, minute } = getFormattedDate(currDate)

  const secondsPassed = timeUnits.SECONDS_IN_A_MINUTE * minute + second

  const percentage = calculatePercentage(
    secondsPassed,
    timeUnits.SECONDS_IN_AN_HOUR,
  )

  const result = {
    date: currDate,
    percentage,
  }
  emitSocketEvent(route.HOUR, eventEmitter.HOUR_SYNC, result)
}

export const calculateDay = () => {
  const currDate = getCurrDate()
  const { second, minute, hour } = getFormattedDate(currDate)

  const secondsPassed =
    timeUnits.SECONDS_IN_AN_HOUR * hour +
    timeUnits.SECONDS_IN_A_MINUTE * minute +
    second

  const percentage = calculatePercentage(
    secondsPassed,
    timeUnits.SECONDS_IN_A_DAY,
  )

  const result = {
    date: currDate,
    percentage,
  }
  emitSocketEvent(route.DAY, eventEmitter.DAY_SYNC, result)
}

export const calculateMonth = () => {
  const currDate = getCurrDate()
  const { second, minute, hour, day, month, year } = getFormattedDate(currDate)

  const totalNumberOfDaysInMonth = getDaysInAMonth(month, year)
  const totalNumberOfSecondsInMonth =
    totalNumberOfDaysInMonth * timeUnits.SECONDS_IN_A_DAY

  const secondsPassed =
    timeUnits.SECONDS_IN_A_DAY * day +
    timeUnits.SECONDS_IN_AN_HOUR * hour +
    timeUnits.SECONDS_IN_A_MINUTE * minute +
    second

  const percentage = calculatePercentage(
    secondsPassed,
    totalNumberOfSecondsInMonth,
  )

  const result = {
    date: currDate,
    percentage,
  }
  emitSocketEvent(route.MONTH, eventEmitter.MONTH_SYNC, result)
}

export const calculateYear = () => {
  const currDate = getCurrDate()
  const { second, minute, hour, day, month, year } = getFormattedDate(currDate)

  const totalNumberOfDaysInYear = getDaysInAYear(year)
  const totalNumberOfSecondsInYear =
    totalNumberOfDaysInYear * timeUnits.SECONDS_IN_A_DAY

  let numberOfDaysPassedInYear = day
  for (let prevMonth = 1; prevMonth < month; prevMonth++) {
    const numberOfDaysInPrevMoth = getDaysInAMonth(prevMonth, year)
    numberOfDaysPassedInYear += numberOfDaysInPrevMoth
  }
  const secondsPassedTillCurrentDate =
    numberOfDaysPassedInYear * timeUnits.SECONDS_IN_A_DAY

  const secondsPassed =
    timeUnits.SECONDS_IN_AN_HOUR * hour +
    timeUnits.SECONDS_IN_A_MINUTE * minute +
    second +
    secondsPassedTillCurrentDate

  const percentage = calculatePercentage(
    secondsPassed,
    totalNumberOfSecondsInYear,
  )

  const result = {
    date: currDate,
    percentage,
  }
  emitSocketEvent(route.YEAR, eventEmitter.YEAR_SYNC, result)
}
