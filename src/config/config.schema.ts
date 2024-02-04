import { z } from 'zod'

export const ConfigSchema = z.object({
  PORT: z.string().trim(),
  NODE_ENV: z.enum(['development', 'production']),
  MINUTE_CRON: z.string().trim(),
  HOUR_CRON: z.string().trim(),
  DAY_CRON: z.string().trim(),
  MONTH_CRON: z.string().trim(),
  YEAR_CRON: z.string().trim(),
})

export type ConfigSchema = z.input<typeof ConfigSchema>
