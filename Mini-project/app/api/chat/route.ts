import { NextResponse } from 'next/server';
import { generateGeminiResponse } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Generate response using Gemini API
    const response = await generateGeminiResponse(message);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error in chat API route:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}
