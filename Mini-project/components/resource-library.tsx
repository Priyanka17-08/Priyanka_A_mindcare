import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, FileText, HeartPulse } from "lucide-react"
import Link from "next/link"

const crisisResources = [
  {
    title: "National Suicide Prevention Lifeline",
    description: "24/7, free and confidential support for people in distress",
    contact: "1-800-273-8255",
    website: "https://suicidepreventionlifeline.org/",
  },
  {
    title: "Crisis Text Line",
    description: "Text HOME to 741741 to connect with a Crisis Counselor",
    contact: "Text HOME to 741741",
    website: "https://www.crisistextline.org/",
  },
  {
    title: "SAMHSA's National Helpline",
    description:
      "Treatment referral and information service for individuals facing mental health or substance use disorders",
    contact: "1-800-662-4357",
    website: "https://www.samhsa.gov/find-help/national-helpline",
  },
]

const articles = [
  {
    title: "Understanding Anxiety: Causes, Symptoms, and Coping Strategies",
    description:
      "Learn about the different types of anxiety disorders and evidence-based approaches to managing anxiety.",
    category: "Anxiety",
    readTime: "8 min read",
  },
  {
    title: "The Science of Stress and How to Manage It",
    description:
      "Explore the physiological effects of stress on the body and mind, and discover effective stress management techniques.",
    category: "Stress Management",
    readTime: "10 min read",
  },
  {
    title: "Building Resilience: How to Bounce Back from Life's Challenges",
    description:
      "Discover strategies to develop emotional resilience and maintain mental wellbeing during difficult times.",
    category: "Resilience",
    readTime: "7 min read",
  },
  {
    title: "The Power of Mindfulness in Daily Life",
    description: "Learn how mindfulness practices can reduce stress, improve focus, and enhance overall mental health.",
    category: "Mindfulness",
    readTime: "6 min read",
  },
]

const exercises = [
  {
    title: "5-Minute Breathing Exercise",
    description: "A quick breathing technique to help reduce anxiety and promote relaxation.",
    category: "Anxiety Relief",
    duration: "5 minutes",
  },
  {
    title: "Progressive Muscle Relaxation",
    description: "Learn to release tension throughout your body by tensing and relaxing muscle groups.",
    category: "Stress Relief",
    duration: "15 minutes",
  },
  {
    title: "Gratitude Journaling Practice",
    description: "A guided exercise to help you focus on positive aspects of your life and cultivate gratitude.",
    category: "Positive Psychology",
    duration: "10 minutes",
  },
  {
    title: "Body Scan Meditation",
    description:
      "A mindfulness practice that involves paying attention to parts of the body and bodily sensations in a gradual sequence.",
    category: "Mindfulness",
    duration: "20 minutes",
  },
]

export function ResourceLibrary() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="crisis" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="crisis" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>Crisis Support</span>
          </TabsTrigger>
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Articles</span>
          </TabsTrigger>
          <TabsTrigger value="exercises" className="flex items-center gap-2">
            <HeartPulse className="h-4 w-4" />
            <span>Exercises</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="crisis" className="space-y-4 mt-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <Phone className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  If you're experiencing a mental health emergency, please call your local emergency services (911 in
                  the US) or visit your nearest emergency room.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {crisisResources.map((resource, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{resource.contact}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={resource.website} target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="articles" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {articles.map((article, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Read Article
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="exercises" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {exercises.map((exercise, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {exercise.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{exercise.duration}</span>
                  </div>
                  <CardTitle className="text-lg">{exercise.title}</CardTitle>
                  <CardDescription>{exercise.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Start Exercise
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
