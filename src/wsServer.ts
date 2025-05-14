import WebSocket from 'ws';
import { handleAIRequest } from './aiHandler';

export const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', async (message) => {
    const data = JSON.parse(message.toString());
    const reply = await handleAIRequest(data.text);
    ws.send(JSON.stringify({ reply }));
  });
});
