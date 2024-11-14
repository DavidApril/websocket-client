import './style.css';
import { connectToServer } from './socket-client.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  
   <h1>Websocket - Client</h1>
   <span id="server-status">Offline</span>   
   <ui id="clients-ul"></ui>
   
   <form id="message-form">
   <input type="text" id="message-input" placeholder="Message" />
   </form>

   <h3>Messages</h3>
   <ul id="messages-ul"></ul>
   
  </div>
`;

connectToServer();
