import { io } from '../app'
import { EmitterDTO } from './cron.dto'

export const storeAndEmit = (route: string, value: EmitterDTO) => {
  const actualRoute = `/${route}`
  const event = `${route}Msg`
  io.of(actualRoute).emit(event, value)
}
