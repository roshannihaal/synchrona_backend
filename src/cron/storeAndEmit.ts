import { io } from '../app'
import { EmitterDTO } from './cron.dto'

export const storeAndEmit = (key: string, value: EmitterDTO) => {
  const actualRoute = `/${key}`
  const event = `${key}Sync`
  io.of(actualRoute).emit(event, value)
}