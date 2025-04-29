"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, Send, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your MindCare assistant. How are you feeling today?",
      role: "assistant",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
    // Focus the input field when the component mounts
    inputRef.current?.focus()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Set typing indicator
    setIsTyping(true)

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
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error('Error getting response:', error);

      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I couldn't process your request. Please try again later.",
        role: "assistant",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-[5%] left-[5%] w-64 h-64 rounded-full bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-900 dark:to-pink-900 opacity-10 blur-3xl" />
        <div className="absolute bottom-[10%] right-[10%] w-72 h-72 rounded-full bg-gradient-to-r from-blue-200 to-teal-200 dark:from-blue-900 dark:to-teal-900 opacity-10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b animate-fade-in">
        <div className="container flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2 mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              MindCare
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-2xl mx-auto px-4 py-6 relative z-10">
        <div className="bg-card rounded-xl shadow-md overflow-hidden border animate-fade-in">
          <div className="p-4 border-b bg-gradient-to-r from-primary/10 to-purple-500/10">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Chat with MindCare
            </h2>
          </div>

          <div className="flex flex-col h-[calc(100vh-220px)]">
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex max-w-[85%] flex-col gap-2 rounded-lg px-4 py-3 text-sm animate-fade-in",
                      message.role === "user"
                        ? "ml-auto bg-gradient-to-r from-primary to-purple-500 text-white"
                        : "bg-muted",
                    )}
                  >
                    {message.content}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex max-w-[85%] flex-col gap-2 rounded-lg px-4 py-3 text-sm bg-muted animate-fade-in">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce"></div>
                      <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce delay-75"></div>
                      <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce delay-150"></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="p-4 border-t bg-card animate-fade-in">
              <div className="flex items-center gap-2">
                <Input
                  ref={inputRef}
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage()
                    }
                  }}
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 transition-opacity"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
              <div className="mt-2 text-xs text-muted-foreground text-center">
                Not medical advice. Consult a healthcare professional for serious concerns.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
