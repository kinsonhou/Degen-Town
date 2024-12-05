import { OPENAI_API_BASE, MODEL_NAME } from '../lib';

export const LLM_CONFIG = {
  model: MODEL_NAME,
  temperature: 0.7,
  max_tokens: 1000,
  embeddingDimension: 1536,
};

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const chatCompletion = async ({
  messages,
  temperature = LLM_CONFIG.temperature,
  max_tokens = LLM_CONFIG.max_tokens,
  stop,
}: {
  messages: LLMMessage[];
  temperature?: number;
  max_tokens?: number;
  stop?: string[];
}) => {
  const response = await fetch(`${OPENAI_API_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL_NAME,
      messages,
      temperature,
      max_tokens,
    }),
  });
  const result = await response.json();
  return { content: result.choices[0].message.content };
};

export async function fetchEmbedding(text: string) {
  const response = await fetch(`${OPENAI_API_BASE}/embeddings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-embedding-ada-002',
      input: text,
    }),
  });
  const result = await response.json();
  return { embedding: result.data[0].embedding };
}

export async function fetchEmbeddingBatch(texts: string[]) {
  const response = await fetch(`${OPENAI_API_BASE}/embeddings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-embedding-ada-002',
      input: texts,
    }),
  });

  const result = await response.json();

  if (!result.data) {
    console.error('OpenAI API Error:', result);
    throw new Error(`OpenAI API Error: ${result.error?.message || 'Unknown error'}`);
  }

  if (
    !Array.isArray(result.data) ||
    !result.data.every((d: EmbeddingResponse) => Array.isArray(d.embedding))
  ) {
    console.error('Unexpected API response format:', result);
    throw new Error('Unexpected embedding format from OpenAI API');
  }

  return {
    embeddings: result.data.map((d: { embedding: number[] }) => d.embedding),
  };
}

export function assertApiKey() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY environment variable');
  }
}

// 添加接口定义
interface EmbeddingResponse {
  embedding: number[];
}
