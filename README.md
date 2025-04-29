# 🧠 MINDCARE - AI Integrated Chatbot
👩‍💻 Team Member
Priyanka

📝 Project Description
MINDCARE is an AI-powered chatbot designed to provide empathetic and supportive conversations for individuals facing emotional distress. Built with a focus on adaptability and emotional intelligence, the chatbot aims to understand varied conversational styles and respond with clinically relevant suggestions and support.

🔧 Tech Stack
🎨 Frontend
Framework: Next.js (React + TypeScript)

Gemini API

UI Library: shadcn/ui

Styling: Tailwind CSS

Component Styling: Styled using Radix-based shadcn components


💡 Features
Emotion & Intent Detection: Understands and adapts to varied user emotional states.

Early Distress Detection: Proactively recommends self-care tools or professional support.

"Bridge" Model: Tracks emotional transitions using a custom LSTM + Transformer hybrid.

Privacy-Centered: All training data is anonymized and ethically sourced.

Tailored Responses: Adjusts tone and support tools based on conversation flow.

📁 Project Structure (Frontend)
bash
Copy
Edit
mindcare/
├── app/                # Next.js app directory
│   ├── page.tsx        # Main chatbot interface
│   └── layout.tsx      # Application layout with shared styles/components
├── components/         # Reusable UI components
│   └── ChatWindow.tsx  # Main chat window
│   └── MessageBubble.tsx
├── lib/                # Utility functions and API handlers
├── styles/             # Global styles and Tailwind config
├── public/             # Static assets
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript config
└── README.md

🔒 Privacy & Ethics
All data used for training is anonymized and ethically sourced.

The system prioritizes user privacy, and no real-time data is stored or reused without consent.

📌 Future Enhancements
Mobile-first design & PWA support

Real-time chat with therapists (secure portal)

Multilingual support

Emotion journaling & tracking feature

