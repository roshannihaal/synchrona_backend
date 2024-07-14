import { z } from 'zod'

export const JokeWhiteListEnum = z.enum([
  'Any',
  'Programming',
  'Miscellaneous',
  'Dark',
  'Pun',
  'Spooky',
  'Christmas',
])

export const JokeBlackListEnum = z.enum([
  'nsfw',
  'religious',
  'political',
  'racist',
  'sexist',
  'explicit',
])

export const ConfigSchema = z
  .object({
    PORT: z.string().trim(),
    NODE_ENV: z.enum(['development', 'production']),
    MINUTE_CRON: z.string().trim(),
    HOUR_CRON: z.string().trim(),
    DAY_CRON: z.string().trim(),
    MONTH_CRON: z.string().trim(),
    YEAR_CRON: z.string().trim(),
    LOCALE: z.string().trim(),
    FRONTEND_URL: z.string().trim(),
    ADD_JOKE: z
      .string()
      .trim()
      .transform((val) => val === 'true'),
    JOKE_SAFE: z
      .string()
      .trim()
      .transform((val) => val === 'true')
      .optional(),
    JOKE_CRON: z.string().trim().optional(),
    JOKE_API: z.string().trim().optional(),
    JOKE_WHITELIST: z
      .string()
      .trim()
      .transform((val) => (val ? val.split(',') : []))
      .refine(
        (vals) =>
          vals.every((val) => JokeWhiteListEnum.options.includes(val as any)),

        {
          message: 'Invalid value in JOKE_WHITELIST',
        },
      )
      .optional(),
    JOKE_BLACKLIST: z
      .string()
      .trim()
      .transform((val) => (val ? val.split(',') : []))
      .refine(
        (vals) =>
          vals.every((val) => JokeBlackListEnum.options.includes(val as any)),
        {
          message: 'Invalid value in JOKE_BLACKLIST',
        },
      )
      .optional(),
  })
  .refine(
    (data) => {
      if (data.ADD_JOKE) {
        return (
          !!data.JOKE_CRON && !!data.JOKE_API && !!data.JOKE_WHITELIST?.length
        )
      }
      return true
    },
    {
      message: 'All joke-related fields are required if ADD_JOKE is true',
      path: ['ADD_JOKE'], // Customize the path of the error message
    },
  )

export type ConfigSchema = z.input<typeof ConfigSchema>
