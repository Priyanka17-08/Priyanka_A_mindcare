# MindCare Chatbot

A mental health support chatbot built with Next.js and the Gemini AI API.

## Overview

MindCare is an AI-powered chatbot designed to provide mental wellness and emotional support. The application features a clean, modern UI with a chat interface that connects to Google's Gemini AI API to generate helpful responses.

## Features

- **AI-Powered Conversations**: Uses Google's Gemini 1.5 Flash model for natural, helpful responses
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean interface with animations and visual feedback
- **Real-time Chat**: Immediate responses with typing indicators

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **AI Integration**: Google Gemini API

## Project Structure

```
mindcare-chatbot/
├── app/                    # Next.js app directory
│   ├── api/                # API routes
│   │   └── chat/           # Chat API endpoint
│   ├── chat/               # Chat page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── ui/                 # UI components
│   ├── chat-mood-tracker.tsx
│   ├── chat-resources.tsx
│   └── ...
├── lib/                    # Utility functions
│   ├── gemini.ts           # Gemini API client
│   ├── keyword-responses.ts # Fallback responses
│   └── utils.ts            # Helper functions
├── public/                 # Static assets
├── .env.local              # Environment variables
└── ...
```

## Key Components

### Gemini API Integration

The application uses Google's Gemini 1.5 Flash model for generating responses. The integration is handled in `lib/gemini.ts`:

```typescript
// Function to generate a response from Gemini API
export async function generateGeminiResponse(prompt: string): Promise<string> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }

    // Gemini API endpoint
    const endpoint = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";
    
    // Prepare the request body
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    };

    // Make the API request
    const response = await fetch(`${endpoint}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    // Extract the response text from the Gemini API response
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";
    
    return responseText;
  } catch (error) {
    console.error("Error generating response from Gemini API:", error);
    return "I'm sorry, there was an error processing your request. Please try again later.";
  }
}
```

### Chat API Route

The API route in `app/api/chat/route.ts` handles the communication between the frontend and the Gemini API:

```typescript
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
```

### Chat Interface

The chat interface in `app/chat/page.tsx` provides a user-friendly way to interact with the AI:

```typescript
export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your MindCare assistant. How are you feeling today?",
      role: "assistant",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Handle sending messages
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Set typing indicator
    setIsTyping(true);

    try {
      // Call the API route to get a response from Gemini
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from API');
      }

      const data = await response.json();

      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: "assistant",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I couldn't process your request. Please try again later.",
        role: "assistant",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  
  // Rest of the component...
}
```

## Setup and Configuration

### Environment Variables

Create a `.env.local` file in the root directory with your Gemini API key:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Navigate to the home page
2. Click on "Start Chatting" to open the chat interface
3. Type your message and press Enter or click the Send button
4. The AI will respond with helpful information related to mental health and wellness

## Notes

- This application is for demonstration purposes and should not be used as a substitute for professional mental health advice
- The Gemini API requires a valid API key from Google AI Studio
- The application uses the Gemini 1.5 Flash model for faster response times
