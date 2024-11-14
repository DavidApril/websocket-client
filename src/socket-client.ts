import { Manager, Socket } from "socket.io-client";
let socket: Socket;
export const connectToServer = (jwtToken: string) => {
  const manager = new Manager("http://localhost:3001/socket.io/socket.io.js", {
    extraHeaders: {
      authentication: jwtToken,
    },
  });
  socket?.removeAllListeners();
  socket = manager.socket("/");
  addListeners();
};

const addListeners = () => {
  const clientsUl = document.querySelector("#clients-ul") as HTMLUListElement;
  const messageForm = document.querySelector(
    "#message-form"
  ) as HTMLFormElement;
  const messageInput = document.querySelector(
    "#message-input"
  ) as HTMLInputElement;
  const messagesUl = document.querySelector("#messages-ul") as HTMLUListElement;
  const serverStatusLabel = document.querySelector(
    "#server-status"
  ) as HTMLSpanElement;

  socket.on("connect", () => {
    serverStatusLabel.innerText = "Connected";
  });

  socket.on("disconnect", () => {
    serverStatusLabel.innerText = "Disconnected";
  });

  socket.on("clients-updated", (clients: string[]) => {
    let clientsHtml = "";
    clients.forEach((client) => {
      clientsHtml += `<li>${client}</li>`;
    });
    clientsUl.innerHTML = clientsHtml;
  });

  socket.on(
    "message-from-server",
    (message: { fullName: string; message: string }) => {
      const li = document.createElement("li");
      li.innerText = `${message.fullName}: ${message.message}`;
      messagesUl.appendChild(li);
    }
  );

  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (messageInput.value.trim().length === 0) return;
    socket.emit("message-from-client", {
      id: socket.id,
      message: messageInput.value,
    });

    messageInput.value = "";
  });
};
