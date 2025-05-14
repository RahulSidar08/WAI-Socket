
# WAI (WhatsApp AI) SOCKET

WAI-Socket is a WhatsApp-style chatbot powered by WebSocket and AI, built in TypeScript. It connects to WhatsApp through a WebSocket server and uses OpenRouter (OpenAI) for intelligent responses, including dynamic function calling like summarization and translation.


# 🚀 Features


   WebSocket integration for live communication

   AI assistant using OpenRouter GPT-3.5/4 with function calling

   Smart summarization and 🌍 language translation

   Streamed AI responses back to the chat window

   Built-in logic to decide when to chat vs. call helper functions




## Tech Stack

Language: TypeScript

Backend: Node.js, WebSocket

AI: OpenRouter (GPT-3.5/4), Function Calling API

Tools: Vite, Axios, dotenv




# How to Run the Project

Set up your .env file with your OPENROUTER_API_KEY

 Install dependencies

```bash
  npm install
```

Set environment variables

```bash
 OPENROUTER_API_KEY=your_openrouter_api_key
```

 Start the project

```bash
 npm run start
```

- Scan the QR code
On the first run, scan the QR code with your WhatsApp to connect the bot.
- Send a message
Start chatting with the bot. Try things like:
- "Hi, how are you?"
- "Summarize this: Lorem ipsum dolor sit amet..."
- "Translate 'How are you?' to French"
