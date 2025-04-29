// Gemini API client utility

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
      // Add system instructions as the first message in contents
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "You are a mental health support chatbot. Keep your responses brief, concise, and to the point. Aim for 1-3 short sentences when possible. Be empathetic but direct. Now respond to this user message: " + prompt
            }
          ]
        }
      ],
      // Add generation config to encourage shorter responses
      generationConfig: {
        maxOutputTokens: 150,
        temperature: 0.4,
        topP: 0.8,
        topK: 40
      }
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
