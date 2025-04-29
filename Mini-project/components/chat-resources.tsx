import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, FileText, HeartPulse } from "lucide-react"

const crisisResources = [
  {
    title: "National Suicide Prevention Lifeline",
    description: "24/7, free and confidential support",
    contact: "1-800-273-8255",
  },
  {
    title: "Crisis Text Line",
    description: "Text HOME to 741741",
    contact: "Text HOME to 741741",
  },
]

const quickResources = [
  {
    title: "5-Minute Breathing Exercise",
    category: "Anxiety Relief",
    icon: <HeartPulse className="h-4 w-4" />,
  },
  {
    title: "Gratitude Practice",
    category: "Mood Boost",
    icon: <HeartPulse className="h-4 w-4" />,
  },
  {
    title: "Sleep Meditation",
    category: "Rest & Recovery",
    icon: <HeartPulse className="h-4 w-4" />,
  },
  {
    title: "Thought Reframing",
    category: "CBT Technique",
    icon: <FileText className="h-4 w-4" />,
  },
]

export function ChatResources() {
  return (
    <div className="space-y-4">
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Phone className="h-4 w-4 text-yellow-600" />
            Crisis Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {crisisResources.map((resource, index) => (
              <div key={index} className="text-sm">
                <div className="font-medium">{resource.title}</div>
                <div className="text-muted-foreground text-xs">{resource.description}</div>
                <div className="font-bold text-yellow-700 mt-1">{resource.contact}</div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full text-xs">
            View All Emergency Resources
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Quick Help</CardTitle>
          <CardDescription className="text-xs">Tools and exercises for immediate support</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {quickResources.map((resource, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto flex flex-col items-center justify-center p-3 text-center"
              >
                <div className="rounded-full bg-rose-100 p-2 mb-2">{resource.icon}</div>
                <span className="text-xs font-medium">{resource.title}</span>
                <Badge variant="secondary" className="mt-1 text-[10px] font-normal">
                  {resource.category}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full text-xs">
            Browse Resource Library
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
