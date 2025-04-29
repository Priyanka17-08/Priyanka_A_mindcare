"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { format, subDays } from "date-fns"

// Mock data for the mood chart
const generateMockData = () => {
  const data = []
  for (let i = 14; i >= 0; i--) {
    data.push({
      date: format(subDays(new Date(), i), "MMM dd"),
      mood: Math.floor(Math.random() * 5) + 1,
    })
  }
  return data
}

const moodLabels = [
  { value: 5, label: "Very Happy", color: "bg-green-500" },
  { value: 4, label: "Happy", color: "bg-green-400" },
  { value: 3, label: "Neutral", color: "bg-blue-400" },
  { value: 2, label: "Sad", color: "bg-orange-400" },
  { value: 1, label: "Very Sad", color: "bg-red-500" },
]

export function MoodTracker() {
  const [moodData] = useState(generateMockData())
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [note, setNote] = useState("")

  const handleMoodSubmit = () => {
    // In a real app, this would save the mood entry to a database
    alert(`Mood logged: ${selectedMood}, Note: ${note}`)
    setSelectedMood(null)
    setNote("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Daily Mood Check-in</CardTitle>
          <CardDescription>
            How are you feeling today? Tracking your mood can help identify patterns and improve your mental wellbeing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {moodLabels.map((mood) => (
                <Button
                  key={mood.value}
                  variant={selectedMood === mood.value ? "default" : "outline"}
                  className="flex flex-col items-center p-4 h-auto"
                  onClick={() => setSelectedMood(mood.value)}
                >
                  <div className={`w-8 h-8 rounded-full ${mood.color} mb-2`}></div>
                  <span>{mood.label}</span>
                </Button>
              ))}
            </div>

            <Textarea
              placeholder="Add a note about how you're feeling (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[100px]"
            />

            <Button onClick={handleMoodSubmit} disabled={selectedMood === null} className="w-full">
              Log Today's Mood
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Mood History</CardTitle>
          <CardDescription>View your mood patterns over the past two weeks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
                <Tooltip
                  formatter={(value) => {
                    const mood = moodLabels.find((m) => m.value === value)
                    return [mood?.label || value, "Mood"]
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
