import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { cronMinute, cronHour, cronDay, cronMonth, cronYear } from './cron'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
  const resStatusCode = 200
  return res
    .status(resStatusCode)
    .send({ statusCode: resStatusCode, message: 'Hello World!' })
})

cronMinute.start()
cronHour.start()
cronDay.start()
cronMonth.start()
cronYear.start()

export { io, server }
