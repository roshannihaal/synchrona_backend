import {
  getCurrDate,
  getFormattedDate,
  calculatePercentage,
  getDaysInAMonth,
  getDaysInAYear,
  EmitterDTO,
} from '../utils'
import { timeUnits, route } from '../constants'
class Calculate {
  private minute(timeZone: string): EmitterDTO {
    const currDate = getCurrDate(timeZone)
    const { second } = getFormattedDate(currDate)

    const percentage = calculatePercentage(
      second,
      timeUnits.SECONDS_IN_A_MINUTE,
    )

    const result = {
      date: currDate,
      percentage,
    }

    return result
  }

  private hour(timeZone: string): EmitterDTO {
    const currDate = getCurrDate(timeZone)
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

    return result
  }

  private day(timeZone: string): EmitterDTO {
    const currDate = getCurrDate(timeZone)
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

    return result
  }

  private month(timeZone: string): EmitterDTO {
    const currDate = getCurrDate(timeZone)
    const { second, minute, hour, day, month, year } =
      getFormattedDate(currDate)

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

    return result
  }

  private year(timeZone: string): EmitterDTO {
    const currDate = getCurrDate(timeZone)
    const { second, minute, hour, day, month, year } =
      getFormattedDate(currDate)

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

    return result
  }

  public calc(type: string, timeZone: string): EmitterDTO {
    try {
      switch (type) {
        case route.MINUTE:
          return this.minute(timeZone)
        case route.HOUR:
          return this.hour(timeZone)
        case route.DAY:
          return this.day(timeZone)
        case route.MONTH:
          return this.month(timeZone)
        case route.YEAR:
          return this.year(timeZone)
        default:
          throw new Error('Invalid timezone')
      }
    } catch (error) {
      throw error
    }
  }
}

export const calculateService = new Calculate()
