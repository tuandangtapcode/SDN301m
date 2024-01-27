import express from 'express'
import { Server as SocketServer } from 'socket.io'
import http from "http"
import dotev from 'dotenv'
import cors from 'cors'
import routes from './routes/index.js'
import connect from './config/index.js'

dotev.config()
const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
  // cors: {
  //   origin: "http://localhost:3000",
  // },
})

// Connect DB
connect()

app.use(cors(
  {
    origin: true,
    credentials: true,
  }
))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

routes(app)

io.on("connection", (socket) => {

  socket.on('send-comment', function (data) {
    io.sockets.emit('get-comments', data)
  })

  socket.on('disconnect', function () {
    console.log(`người dùng ${socket.id} đã ngắt kết nối`)
  })
})

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`)
})