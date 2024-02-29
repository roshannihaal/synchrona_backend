import { io, server } from './app'
import { config } from './config'

const port = config.PORT
const node_env = config.NODE_ENV
server.listen(port, () => {
  console.log(`App (${node_env}) listening at http://localhost:${port}`)
})

io.of('/hour').on('connection', (socket) => {
  socket.emit('init', 'Connected to Hour Clock')
})

io.of('/day').on('connection', (socket) => {
  socket.emit('init', 'Connected to Day Clock')
})

io.of('/month').on('connection', (socket) => {
  socket.emit('init', 'Connected to Month Clock')
})

io.of('/year').on('connection', (socket) => {
  socket.emit('init', 'Connected to Year Clock')
})
