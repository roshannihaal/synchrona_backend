import { format } from 'date-fns'

export const getCurrDate = () => {
  const currDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
  })
  return currDate
}

export const getFormattedDate = (date: string) => {
  const second = parseInt(format(date, 'ss'))
  const minute = parseInt(format(date, 'mm'))
  const hour = parseInt(format(date, 'HH'))
  const day = parseInt(format(date, 'dd'))
  const month = parseInt(format(date, 'MM'))
  const year = parseInt(format(date, 'yyyy'))

  const data = { second, minute, hour, day, month, year }
  return data
}

export const getDaysInAMonth = (month: number, year: number) => {
  const lastDayOfMonth = new Date(year, month, 0).getDate()
  return lastDayOfMonth
}

export const getDaysInAYear = (year: number) => {
  if ((year % 4 === 0 && year % 100 > 0) || year % 400 === 0) {
    return 366
  }
  return 365
}
