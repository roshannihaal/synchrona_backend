import { io } from '../app'
import { route, timeUnits } from '../constants'
import {
  getCurrDate,
  getFormattedDate,
  calculatePercentage,
  getDaysInAMonth,
  getDaysInAYear,
} from '../utils'
import { emit } from './emit'

export const calculateMinute = () => {
  const currDate = getCurrDate()
  const { second } = getFormattedDate(currDate)

  const percentage = calculatePercentage(second, timeUnits.SECONDS_IN_A_MINUTE)

  const result = {
    date: currDate,
    percentage,
  }
  emit(route.MINUTE, result)
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
  emit(route.HOUR, result)
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
  emit(route.DAY, result)
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
  emit(route.MONTH, result)
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
  emit(route.YEAR, result)
}
