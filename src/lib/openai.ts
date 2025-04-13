import OpenAI from 'openai';

let openaiInstance: OpenAI | null = null;

export function getOpenAIInstance() {
  if (!openaiInstance) {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured');
    }
    openaiInstance = new OpenAI({ apiKey });
  }
  return openaiInstance;
}

export async function generateBusinessAdvice(
  messages: { role: 'user' | 'assistant'; content: string }[]
) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate response');
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error generating business advice:', error);
    throw error;
  }
} 