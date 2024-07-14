import { z } from 'zod'

export const EmitterDTO = z.object({
  date: z.string(),
  percentage: z.number(),
})
export type EmitterDTO = z.input<typeof EmitterDTO>

export const MetaEmitterDTO = z.object({
  status: z.string().optional(),
  message: z.string().optional(),
  viewers: z.number().optional(),
  joke: z.string().optional(),
})
export type MetaEmitterDTO = z.input<typeof MetaEmitterDTO>

export const JokeResponseDTO = z.object({
  error: z.boolean(),
  category: z.string(),
  type: z.enum(['single', 'twopart']),
  joke: z.string().optional(),
  setup: z.string().optional(),
  delivery: z.string().optional(),
  flags: z.object({
    nsfw: z.boolean(),
    religious: z.boolean(),
    political: z.boolean(),
    racist: z.boolean(),
    sexist: z.boolean(),
    explicit: z.boolean(),
  }),
  id: z.number(),
  safe: z.boolean(),
  lang: z.string(),
})
export type JokeResponseDTO = z.input<typeof JokeResponseDTO>
