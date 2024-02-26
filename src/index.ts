import { io, server } from './app'
import { config } from './config'

const port = config.PORT
const node_env = config.NODE_ENV
server.listen(port, () => {
  console.log(`App (${node_env}) listening at http://localhost:${port}`)
})

io.of('/hour').on('connection', (socket) => {
  io.of('/hour').emit('welcome', 'connected to hour clock')
})

io.of('/day').on('connection', (socket) => {
  io.of('/day').emit('welcome', 'connected to day clock')
})

io.of('/month').on('connection', (socket) => {
  io.of('/month').emit('welcome', 'connected to month clock')
})

io.of('/year').on('connection', (socket) => {
  io.of('/year').emit('welcome', 'connected to year clock')
})
