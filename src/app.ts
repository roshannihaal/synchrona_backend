import express, { Request, Response } from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { cronService, socketClientService } from './service'
import { config } from './config'

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: config.FRONTEND_URL } })

try {
  if (config.ADD_JOKE) {
    cronService.addCronJoke()
  }
  socketClientService.initializeSockets()
} catch (error) {
  console.error('Server initialisation error', error)
  process.exit(1)
}

app.get('/api', (req: Request, res: Response) => {
  return res.status(200).send({ statusCode: 200, message: 'Hello World!' })
})

export { io, server }
