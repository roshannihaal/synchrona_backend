import { io } from '../app'
import { timeUnits } from '../constants'
import {
  getCurrDate,
  getFormattedDate,
  calculatePercentage,
  getDaysInAMonth,
  getDaysInAYear,
} from '../utils'
import { storeAndEmit } from './storeAndEmit'

export const calculateMinute = () => {
  const currDate = getCurrDate()
  const { second, minute, hour, day, month, year } = getFormattedDate(currDate)

  const percentage = calculatePercentage(second, timeUnits.SECONDS_IN_A_MINUTE)

  const emit = {
    date: currDate,
    percentage,
  }
  console.log('🚀 ~ calculateMinute ~ emit:', emit)
}

export const calculateHour = () => {
  const currDate = getCurrDate()
  const { second, minute, hour, day, month, year } = getFormattedDate(currDate)

  const secondsPassed = timeUnits.SECONDS_IN_A_MINUTE * minute + second

  const percentage = calculatePercentage(
    secondsPassed,
    timeUnits.SECONDS_IN_AN_HOUR,
  )

  const result = {
    date: currDate,
    percentage,
  }
  console.log('🚀 ~ calculateHour ~ result:', result)
  storeAndEmit('hour', result)
}

export const calculateDay = () => {
  const currDate = getCurrDate()
  const { second, minute, hour, day, month, year } = getFormattedDate(currDate)

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
  console.log('🚀 ~ calculateDay ~ result:', result)
  storeAndEmit('day', result)
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
  console.log('🚀 ~ calculateMonth ~ result:', result)
  storeAndEmit('month', result)
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
  console.log('🚀 ~ calculateYear ~ result:', result)
  storeAndEmit('year', result)
}
