import {Manager, Socket} from "socket.io-client";

export const connectToServer = () => {
  const manager = new Manager('http://localhost:3001/socket.io/socket.io.js');
  const socket = manager.socket('/')
  addListeners(socket)
}

const addListeners = (socket: Socket) => {
  const serverStatusLabel = document.querySelector('#server-status') as HTMLSpanElement
  socket.on('connect', () => {
    serverStatusLabel.innerText = 'Connected'
  })

  socket.on('disconnect', () => {
    serverStatusLabel.innerText = 'Disconnected'
  })
}