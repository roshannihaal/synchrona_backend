import { cronService } from './cron.service'
import { eventEmitter, route } from '../constants'
import { io } from '../app'
import { Socket } from 'socket.io'
import { calculateService } from './calculate.service'
import { EmitterDTO } from '../utils'
import { MetaEmitterDTO } from '../utils/utils.dto'
class SocketClient {
  initializeSockets() {
    io.of(`/${route.MINUTE}`).on('connection', async (socket) => {
      const timeZone = socket.handshake.query.timeZone as string
      if (timeZone) {
        cronService.addCron(socket, route.MINUTE)
        const result = calculateService.calc(route.MINUTE, timeZone)
        this.emit(socket, route.MINUTE, result)
      }
      socket.on('disconnect', () => {
        cronService.removeCron(socket)
      })
    })

    io.of(`/${route.HOUR}`).on('connection', async (socket) => {
      const timeZone = socket.handshake.query.timeZone as string
      if (timeZone) {
        cronService.addCron(socket, route.HOUR)
        const result = calculateService.calc(route.HOUR, timeZone)
        this.emit(socket, route.HOUR, result)
      }
      socket.on('disconnect', () => {
        cronService.removeCron(socket)
      })
    })

    io.of(`/${route.DAY}`).on('connection', async (socket) => {
      const timeZone = socket.handshake.query.timeZone as string
      if (timeZone) {
        cronService.addCron(socket, route.DAY)
        const result = calculateService.calc(route.DAY, timeZone)
        this.emit(socket, route.DAY, result)
      }
      socket.on('disconnect', () => {
        cronService.removeCron(socket)
      })
    })

    io.of(`/${route.MONTH}`).on('connection', async (socket) => {
      const timeZone = socket.handshake.query.timeZone as string
      if (timeZone) {
        cronService.addCron(socket, route.MONTH)
        const result = calculateService.calc(route.MONTH, timeZone)
        this.emit(socket, route.MONTH, result)
      }
      socket.on('disconnect', () => {
        cronService.removeCron(socket)
      })
    })

    io.of(`/${route.YEAR}`).on('connection', async (socket) => {
      const timeZone = socket.handshake.query.timeZone as string
      if (timeZone) {
        cronService.addCron(socket, route.YEAR)
        const result = calculateService.calc(route.YEAR, timeZone)
        this.emit(socket, route.YEAR, result)
      }
      socket.on('disconnect', () => {
        cronService.removeCron(socket)
      })
    })
  }

  emit(socket: Socket, type: string | null, data: EmitterDTO | MetaEmitterDTO) {
    switch (type) {
      case route.MINUTE:
        socket.emit(eventEmitter.MINUTE_SYNC, data)
        break
      case route.HOUR:
        socket.emit(eventEmitter.HOUR_SYNC, data)
        break
      case route.DAY:
        socket.emit(eventEmitter.DAY_SYNC, data)
        break
      case route.MONTH:
        socket.emit(eventEmitter.MONTH_SYNC, data)
        break
      case route.YEAR:
        socket.emit(eventEmitter.YEAR_SYNC, data)
        break
      default:
        const namespaces = Object.values(route)
        for (let namespace of namespaces) {
          io.of(`/${namespace}`).emit(eventEmitter.ACTIVE_SYNC, data)
        }
    }
  }
}

export const socketClientService = new SocketClient()
