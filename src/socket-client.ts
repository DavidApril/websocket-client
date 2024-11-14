import {Manager, Socket} from "socket.io-client";

export const connectToServer = () => {
  const manager = new Manager('http://localhost:3001/socket.io/socket.io.js');
  const socket = manager.socket('/')
  addListeners(socket)
}

const addListeners = (socket: Socket) => {
  const serverStatusLabel = document.querySelector('#server-status') as HTMLSpanElement
  const clientsUl = document.querySelector('#clients-ul') as HTMLUListElement

  socket.on('connect', () => {
    serverStatusLabel.innerText = 'Connected'
  })

  socket.on('disconnect', () => {
    serverStatusLabel.innerText = 'Disconnected'
  })

  socket.on('clients-updated', (clients: string[]) => {
    let clientsHtml = ''
    clients.forEach(client => {
      clientsHtml += `<li>${client}</li>`
    })
    clientsUl.innerHTML = clientsHtml
  })
}