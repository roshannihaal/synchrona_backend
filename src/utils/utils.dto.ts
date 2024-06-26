import { z } from 'zod'

export const EmitterDTO = z.object({
  date: z.string(),
  percentage: z.number(),
})
export type EmitterDTO = z.input<typeof EmitterDTO>

export const MetaEmitterDTO = z.object({
  status: z.string(),
  message: z.string(),
})
export type MetaEmitterDTO = z.input<typeof MetaEmitterDTO>
