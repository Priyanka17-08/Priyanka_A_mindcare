"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background relative overflow-hidden">
      {/* Simplified background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 rounded-full bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-900 dark:to-pink-900 opacity-20 blur-3xl" />
        <div className="absolute bottom-[20%] right-[15%] w-72 h-72 rounded-full bg-gradient-to-r from-blue-200 to-teal-200 dark:from-blue-900 dark:to-teal-900 opacity-20 blur-3xl" />
      </div>

      <div className="absolute top-4 right-4 z-10">
        <ModeToggle />
      </div>

      <div className="text-center mb-8 relative z-10 animate-fade-in">
        <div className="relative">
          <div className="flex items-center justify-center mb-6 relative">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/80 to-purple-500 flex items-center justify-center shadow-lg animate-pulse">
              <Heart className="h-10 w-10 text-white" />
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 animate-fade-in-up">
            MindCare
          </h1>

          <p className="text-muted-foreground max-w-md mx-auto mb-10 animate-fade-in-up">
            Your AI companion for mental wellness and emotional support.
          </p>

          <div className="animate-fade-in-up">
            <Button
              onClick={() => router.push("/chat")}
              className="px-8 py-7 text-lg font-medium text-white relative overflow-hidden group transition-all hover:shadow-lg"
              style={{
                background: "linear-gradient(45deg, var(--primary), #9333ea)",
                boxShadow: "0 4px 14px 0 rgba(var(--primary), 0.25)",
              }}
            >
              <span className="relative z-10">Start Chatting</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
