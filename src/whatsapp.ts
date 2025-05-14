import qrcode from 'qrcode-terminal';
import { handleAIRequest } from './aiHandler.js';
import whatsapp from 'whatsapp-web.js';

const { Client, LocalAuth } = whatsapp;

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true, // change to false to see browser UI for debugging
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    // Optional: slowMo: 50, // slows operations down for stability
  },
});

client.on('qr', (qr) => {
  console.log('📷 QR Code received, scan it in WhatsApp');
  qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
  console.log('✅ WhatsApp client is ready!');
  const info = client.info;
  console.log(`🤖 Logged in as: ${info.wid.user}`);
});



client.on('message', async (message) => {
  if (message.body) {
    console.log(`📩 Received message: ${message.body}`);
    try {
      const response = await handleAIRequest(message.body);
      await client.sendMessage(message.from, response);
    } catch (err) {
      console.error('❌ Error in message handler:', err);
    }
  }
});

client.on('disconnected', (reason) => {
  console.warn('⚠️ Client disconnected:', reason);
});

client.on('auth_failure', (message) => {
  console.error('❌ Authentication failed:', message);
});

client.initialize();
