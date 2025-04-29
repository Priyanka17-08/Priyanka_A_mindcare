"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format, subDays } from "date-fns"

type MoodOption = {
  value: number
  label: string
  emoji: string
  color: string
}

const moodOptions: MoodOption[] = [
  { value: 5, label: "Great", emoji: "😄", color: "bg-green-500" },
  { value: 4, label: "Good", emoji: "🙂", color: "bg-green-400" },
  { value: 3, label: "Okay", emoji: "😐", color: "bg-blue-400" },
  { value: 2, label: "Low", emoji: "😔", color: "bg-orange-400" },
  { value: 1, label: "Terrible", emoji: "😢", color: "bg-red-500" },
]

// Generate mock data for the past week
const generateMockData = () => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i)
    return {
      date: format(date, "EEE"),
      fullDate: format(date, "MMM dd"),
      mood: Math.floor(Math.random() * 5) + 1,
    }
  }).reverse()
}

export function ChatMoodTracker() {
  const [moodData] = useState(generateMockData())
  const [selectedMood, setSelectedMood] = useState<number | null>(null)

  const handleMoodSubmit = () => {
    // In a real app, this would save the mood entry to a database
    alert(`Mood logged: ${selectedMood}`)
    setSelectedMood(null)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">How are you feeling today?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-1">
            {moodOptions.map((mood) => (
              <Button
                key={mood.value}
                variant="ghost"
                className={`flex flex-col items-center p-2 h-auto ${selectedMood === mood.value ? "bg-slate-100" : ""}`}
                onClick={() => setSelectedMood(mood.value)}
              >
                <div className="text-2xl mb-1">{mood.emoji}</div>
                <span className="text-xs">{mood.label}</span>
              </Button>
            ))}
          </div>
          <Button
            onClick={handleMoodSubmit}
            disabled={selectedMood === null}
            className="w-full mt-4 bg-rose-500 hover:bg-rose-600"
          >
            Log Mood
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Your Week in Moods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end h-[160px] pt-4">
            {moodData.map((day, index) => {
              const mood = moodOptions.find((m) => m.value === day.mood)
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative flex items-center justify-center" style={{ height: `${day.mood * 20}px` }}>
                    <div className={`w-8 rounded-t-sm ${mood?.color}`} style={{ height: `${day.mood * 20}px` }}></div>
                    <div className="absolute top-1/2 transform -translate-y-1/2 text-white text-sm">{mood?.emoji}</div>
                  </div>
                  <div className="text-xs mt-2 text-muted-foreground">{day.date}</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
