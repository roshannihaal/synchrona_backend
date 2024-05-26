import { Socket } from 'socket.io'
import { route } from '../constants'
import { config } from '../config'
import { CronJob } from 'cron'
import { calculateService } from './calculate.service'
import { socketClientService } from './socketClient.service'
class Cron {
  private activeCron: any = {}
  public addCron(socket: Socket, type: string) {
    const timeZone = socket.handshake.query.timeZone as string
    const expression = this.getCronExpression(type)
    if (expression && timeZone) {
      this.activeCron[socket.id] = new CronJob(
        expression,
        () => {
          const result = calculateService.calc(type, timeZone)
          socketClientService.emit(socket, type, result)
        },
        null,
        true,
        timeZone,
      )
      const body = {
        viewers: this.getCronCount(),
      }
      socketClientService.emit(socket, null, body)
    }
  }

  public removeCron(socket: Socket) {
    if (this.activeCron[socket.id]) {
      this.activeCron[socket.id].stop()
      delete this.activeCron[socket.id]
      const body = {
        viewers: this.getCronCount(),
      }
      socketClientService.emit(socket, null, body)
    }
  }

  private getCronCount(): number {
    return Object.keys(this.activeCron).length
  }

  private getCronExpression(type: string) {
    switch (type) {
      case route.MINUTE:
        return config.MINUTE_CRON
      case route.HOUR:
        return config.HOUR_CRON
      case route.DAY:
        return config.DAY_CRON
      case route.MONTH:
        return config.MONTH_CRON
      case route.YEAR:
        return config.YEAR_CRON
      default:
        return null
    }
  }
}

export const cronService = new Cron()
