import { internal } from './_generated/api';
import { v } from 'convex/values';
import { OPENAI_API_BASE, MODEL_NAME, TEMPERATURE, MAX_TOKENS } from './lib';
import { Id } from './_generated/dataModel';
import { DatabaseReader, internalMutation } from './_generated/server';
import { api } from './_generated/api';

// 使用 Convex 的环境变量
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

export async function generateAgentMessage(messages: any[], ctx: DatabaseReader) {
  // 添加更详细的日志
  console.log('Starting message generation:', {
    messageCount: messages.length,
    lastMessage: messages[messages.length - 1],
    MODEL_NAME,
    OPENAI_API_BASE,
  });

  try {
    const response = await fetch(`${OPENAI_API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages,
        temperature: TEMPERATURE,
        max_tokens: MAX_TOKENS,
      }),
    });

    const result = await response.json();
    console.log('OpenAI API Response:', {
      status: response.status,
      result: result,
    });
    return result;
  } catch (error) {
    console.error('Error in generateAgentMessage:', error);
    throw error;
  }
}
