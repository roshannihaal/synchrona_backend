import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { socketClientService } from './service'
import { config } from './config'

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: config.FRONTEND_URL } })

try {
  socketClientService.initializeSockets()
} catch (error) {
  console.error('Server initialisation error', error)
  process.exit(1)
}

app.get('/', (req, res) => {
  const resStatusCode = 200
  return res
    .status(resStatusCode)
    .send({ statusCode: resStatusCode, message: 'Hello World!' })
})

export { io, server }
