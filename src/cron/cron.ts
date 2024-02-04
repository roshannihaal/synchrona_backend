import { CronJob } from 'cron'
import { config } from '../config'
import {
  calculateMinute,
  calculateHour,
  calculateDay,
  calculateMonth,
  calculateYear,
} from './calculate.service'

export const cronMinute = new CronJob(config.MINUTE_CRON, calculateMinute)

export const cronHour = new CronJob(config.HOUR_CRON, calculateHour)

export const cronDay = new CronJob(config.DAY_CRON, calculateDay)

export const cronMonth = new CronJob(config.MONTH_CRON, calculateMonth)

export const cronYear = new CronJob(config.YEAR_CRON, calculateYear)
