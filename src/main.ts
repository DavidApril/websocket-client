import "./style.css";
import { connectToServer } from "./socket-client.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>

   <h2>Websocket - Client</h2>

   <input type="text" id="jwtToken" placeholder="Json web token" />
   <button id="btn-connect">Connect</button>

   <br/>

   <span id="server-status">Offline</span>   
   <ui id="clients-ul"></ui>
   
   <form id="message-form">
   <input type="text" id="message-input" placeholder="Message" />
   </form>

   <h3>Messages</h3>
   <ul id="messages-ul"></ul>
   
  </div>
`;

const inputJwtToken = document.querySelector("#jwtToken") as HTMLInputElement;
const btnConnect = document.querySelector("#btn-connect") as HTMLButtonElement;

btnConnect.addEventListener("click", () => {
  if (inputJwtToken.value.trim().length === 0) return alert("JWT is required");
  connectToServer(inputJwtToken.value.trim());
});
