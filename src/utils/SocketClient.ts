import { io } from '../app'
import { eventEmitter, route } from '../constants'
import {
  calculateDay,
  calculateHour,
  calculateMonth,
  calculateYear,
} from '../cron/calculate.service'
import { EmitterDTO } from './utils.dto'

export const initializeSockets = () => {
  io.on('connection', (socket) => {
    socket.emit(eventEmitter.INIT, 'Connected to Synchrona Server')
  })

  io.of(`/${route.MINUTE}`).on('connection', async (socket) => {
    socket.emit(eventEmitter.INIT, 'Connected to Minute Clock')
  })

  io.of(`/${route.HOUR}`).on('connection', async (socket) => {
    socket.emit(eventEmitter.INIT, 'Connected to Hour Clock')
    calculateHour()
  })

  io.of(`/${route.DAY}`).on('connection', async (socket) => {
    socket.emit(eventEmitter.INIT, 'Connected to Day Clock')
    calculateDay()
  })

  io.of(`/${route.MONTH}`).on('connection', async (socket) => {
    socket.emit(eventEmitter.INIT, 'Connected to Month Clock')
    calculateMonth()
  })

  io.of(`/${route.YEAR}`).on('connection', async (socket) => {
    socket.emit(eventEmitter.INIT, 'Connected to Year Clock')
    calculateYear()
  })
}

export const emitSocketEvent = (
  route: string,
  eventEmitter: string,
  value: EmitterDTO,
) => {
  const actualRoute = `/${route}`
  io.of(actualRoute).emit(eventEmitter, value)
}
