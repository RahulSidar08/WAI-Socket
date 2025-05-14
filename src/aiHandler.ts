import axios from 'axios';
import 'dotenv/config';
// import { summarize , translate } from './helpers.js';
export async function handleAIRequest(message: string): Promise<string> {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a smart assistant. Decide if the user wants to chat, summarize, or translate something. If needed, call a tool.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: 'summarize',
              description: 'Summarize the input text',
              parameters: {
                type: 'object',
                properties: {
                  text: { type: 'string', description: 'Text to summarize' },
                },
                required: ['text'],
              },
            },
          },
          {
            type: 'function',
            function: {
              name: 'translate',
              description: 'Translate text from one language to another',
              parameters: {
                type: 'object',
                properties: {
                  text: { type: 'string' },
                  to: { type: 'string', description: 'Language to translate to' },
                },
                required: ['text', 'to'],
              },
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const choice = response.data?.choices?.[0];

    console.log('🔍 FULL RESPONSE:\n', JSON.stringify(response.data, null, 2));

    if (!choice) {
      return '⚠️ No response choice found from AI.';
    }

    if (
      choice.finish_reason === 'tool_calls' &&
      choice.message?.tool_calls?.[0]
    ) {
      const toolCall = choice.message.tool_calls[0];
      const { name, arguments: argsString } = toolCall.function;
      const args = JSON.parse(argsString || '{}');

      if (name === 'summarize') {
        return summarize(args.text);
      } else if (name === 'translate') {
        return translate(args.text, args.to);
      } else {
        return `⚠️ Unknown tool: ${name}`;
      }
    }

    return choice.message?.content || '🤖 I have no response.';
  } catch (err: any) {
    console.error('AI request failed:', err?.response?.data || err.message);
    return 'AI failed to respond.';
  }
}

async function summarize(text: string): Promise<string> {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that summarizes text.',
          },
          {
            role: 'user',
            content: `Please summarize the following text:\n\n${text}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices?.[0]?.message?.content || 'No summary generated.';
  } catch (err: any) {
    console.error('Summarization failed:', err?.response?.data || err.message);
    return 'Failed to summarize.';
  }
}

async function translate(text: string, to: string): Promise<string> {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a translator. Translate the following text to ${to}.`,
          },
          {
            role: 'user',
            content: text,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices?.[0]?.message?.content || 'No translation generated.';
  } catch (err: any) {
    console.error('Translation failed:', err?.response?.data || err.message);
    return 'Failed to translate.';
  }
}

