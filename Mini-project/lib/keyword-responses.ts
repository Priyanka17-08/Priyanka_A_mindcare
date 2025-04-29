// Define keyword categories and their responses
const keywordResponses = [
  {
    category: "Anxiety",
    keywords: ["anxiety", "anxious", "nervous", "worry", "worried", "panic", "stress", "stressed", "overwhelmed"],
    responses: [
      "I notice you mentioned feeling anxious. Would you like to try a quick breathing exercise that might help reduce those feelings?",
      "Anxiety can be challenging to deal with. Have you identified any specific triggers for your anxiety?",
      "When you're feeling anxious, it can help to ground yourself in the present moment. Would you like to try a simple grounding technique?",
      "I understand anxiety can be overwhelming. Have you considered speaking with a mental health professional about these feelings?",
      "Many people find that physical activity helps reduce anxiety. Have you tried incorporating regular exercise into your routine?",
    ],
  },
  {
    category: "Depression",
    keywords: [
      "depression",
      "depressed",
      "sad",
      "hopeless",
      "empty",
      "worthless",
      "tired",
      "exhausted",
      "unmotivated",
      "no energy",
    ],
    responses: [
      "I'm sorry to hear you're feeling this way. Depression can make everything feel more difficult. Have you spoken to anyone about these feelings?",
      "When you're feeling down, it can be helpful to engage in activities that brought you joy in the past. Is there something small you might enjoy doing today?",
      "Depression often makes us isolate ourselves, but connection can be healing. Is there someone supportive you could reach out to?",
      "Your feelings are valid, and depression is a real health condition that can be treated. Have you considered speaking with a healthcare provider?",
      "Sometimes making a small routine can help when you're feeling depressed. Could you think of one tiny positive habit to try tomorrow?",
    ],
  },
  {
    category: "Sleep",
    keywords: [
      "sleep",
      "insomnia",
      "tired",
      "exhausted",
      "can't sleep",
      "trouble sleeping",
      "nightmares",
      "dream",
      "rest",
    ],
    responses: [
      "Sleep difficulties can have a big impact on mental health. Have you established a regular sleep schedule?",
      "Creating a calming bedtime routine can help improve sleep. Would you like some suggestions for relaxing pre-sleep activities?",
      "Screen time before bed can interfere with sleep quality. Have you tried avoiding screens for an hour before bedtime?",
      "Some people find that limiting caffeine and alcohol helps improve their sleep. Have you noticed any connection between what you consume and how you sleep?",
      "Relaxation techniques like progressive muscle relaxation can help prepare your body for sleep. Would you like to learn a simple technique?",
    ],
  },
  {
    category: "Stress",
    keywords: ["stress", "stressed", "pressure", "overwhelmed", "burnout", "too much", "can't cope", "overworked"],
    responses: [
      "It sounds like you're under a lot of stress right now. Would it help to talk about what's causing this pressure?",
      "When we're stressed, it's important to take breaks. Have you been able to give yourself permission to rest?",
      "Stress management techniques like mindfulness can be very effective. Would you like to try a brief mindfulness exercise?",
      "Sometimes writing down our stressors can help us gain perspective. Have you tried journaling about what's on your mind?",
      "It's okay to set boundaries when you're feeling overwhelmed. Are there any responsibilities you might be able to delegate or postpone?",
    ],
  },
  {
    category: "Relationships",
    keywords: [
      "relationship",
      "partner",
      "spouse",
      "boyfriend",
      "girlfriend",
      "friend",
      "family",
      "parent",
      "child",
      "argument",
      "fight",
      "conflict",
    ],
    responses: [
      "Relationships can bring both joy and challenges. Would you like to talk more about what's happening in this relationship?",
      "Communication is key in any relationship. Have you been able to express your feelings to the other person?",
      "Setting healthy boundaries is important in relationships. Is this something you've been able to do?",
      "It can be helpful to consider both perspectives in a relationship conflict. Have you thought about the situation from the other person's point of view?",
      "Sometimes relationships need professional support. Have you considered speaking with a counselor or therapist about this situation?",
    ],
  },
  {
    category: "Self-esteem",
    keywords: [
      "self-esteem",
      "confidence",
      "worthless",
      "failure",
      "not good enough",
      "hate myself",
      "ugly",
      "stupid",
      "inadequate",
    ],
    responses: [
      "I'm sorry you're feeling this way about yourself. These negative thoughts aren't facts, even though they can feel very real.",
      "We often speak to ourselves more harshly than we would to a friend. How might you respond if a friend shared these same feelings about themselves?",
      "Building self-esteem takes time. Could you identify one small thing you appreciate about yourself today?",
      "Our inner critic can be very loud sometimes. Would it help to explore where some of these negative beliefs about yourself might come from?",
      "Self-compassion is a powerful tool for building healthier self-esteem. Would you like to try a brief self-compassion exercise?",
    ],
  },
  {
    category: "Grief",
    keywords: ["grief", "loss", "died", "death", "passed away", "missing", "miss", "gone", "mourning"],
    responses: [
      "I'm so sorry for your loss. Grief is a deeply personal experience, and there's no right or wrong way to feel.",
      "Losing someone or something important to us can be incredibly painful. Would it help to talk about your memories?",
      "Grief can come in waves and may include many different emotions. How have you been coping with these feelings?",
      "Taking care of yourself is especially important while grieving. Have you been able to attend to your basic needs like eating and resting?",
      "Many people find comfort in connecting with others who understand loss. Have you considered a support group or speaking with others who have experienced similar losses?",
    ],
  },
  {
    category: "Work",
    keywords: [
      "work",
      "job",
      "career",
      "boss",
      "coworker",
      "workplace",
      "fired",
      "unemployed",
      "promotion",
      "interview",
    ],
    responses: [
      "Work challenges can significantly impact our wellbeing. Would you like to talk more about what's happening in your work situation?",
      "Finding work-life balance can be difficult. Have you been able to set boundaries between your work and personal life?",
      "Workplace stress is very common. What strategies have you tried to manage this stress?",
      "Career decisions can feel overwhelming. Would it help to break down your options into smaller steps?",
      "Sometimes workplace issues require outside support. Have you spoken with HR or considered career counseling?",
    ],
  },
  {
    category: "Trauma",
    keywords: ["trauma", "ptsd", "abuse", "assault", "accident", "flashback", "triggered", "nightmare"],
    responses: [
      "I want you to know that you're not alone, and what happened wasn't your fault. Trauma responses are normal reactions to abnormal situations.",
      "Processing trauma takes time and often requires professional support. Have you worked with a trauma-informed therapist?",
      "Grounding techniques can help when trauma symptoms arise. Would you like to learn a simple grounding exercise?",
      "It's important to feel safe when processing trauma. Right now, are you in a place where you feel physically and emotionally safe?",
      "Healing from trauma is possible, though the path isn't always linear. Have you noticed any small signs of healing in your journey so far?",
    ],
  },
  {
    category: "General",
    keywords: [],
    responses: [
      "I'm here to listen. Would you like to talk more about what's on your mind, or would you prefer some suggestions for coping strategies?",
      "Thank you for sharing that with me. How long have you been feeling this way?",
      "I'm interested in understanding more about your experience. Could you tell me a bit more about what's been happening?",
      "That sounds challenging. What has helped you cope with similar situations in the past?",
      "I appreciate you opening up. Would it be helpful to explore some strategies that might help with what you're experiencing?",
    ],
  },
]

export function findResponseForKeywords(input: string): string {
  // Check each category for keyword matches
  for (const category of keywordResponses) {
    for (const keyword of category.keywords) {
      if (input.includes(keyword)) {
        // Return a random response from the matching category
        const responses = category.responses
        return responses[Math.floor(Math.random() * responses.length)]
      }
    }
  }

  // If no keywords match, return a general response
  const generalResponses = keywordResponses.find((cat) => cat.category === "General")?.responses || []
  return generalResponses[Math.floor(Math.random() * generalResponses.length)]
}
