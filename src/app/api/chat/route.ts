import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Note: Using server-side env variable
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a business validation expert AI assistant with image generation capabilities. Your role is to help entrepreneurs validate their business ideas and provide strategic advice. Focus on:

- Market validation and research
- Business model analysis
- Customer discovery and validation
- Value proposition assessment
- Competitive analysis
- Go-to-market strategy
- Financial viability
- Risk assessment

You can also generate images when users request them. When a user asks for an image or uses the /image command, acknowledge that you can generate it for them. The system will handle the actual image generation through DALL-E.

Keep responses focused on business validation and strategic planning. Be analytical, data-driven, and constructive in your feedback.`
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return NextResponse.json({ content: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error in chat route:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}