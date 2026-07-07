import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
})

export async function analyzeImages(beforeImage: string, afterImage: string) {
  const prompt = `Compare these two images and analyze the environmental or social impact shown. 
Rate the authenticity and significance of the change on a scale of 0-100.
Consider: visual consistency, lighting, perspective, and the magnitude of positive change.
Return a JSON object with: score (0-100), confidence (low/medium/high), explanation, and concerns (array).`

  const result = await model.generateContent([
    prompt,
    { inlineData: { mimeType: 'image/jpeg', data: beforeImage } },
    { inlineData: { mimeType: 'image/jpeg', data: afterImage } },
  ])

  const response = result.response
  const text = response.text()

  return parseVerificationResponse(text)
}

function parseVerificationResponse(text: string) {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON found in response')
    return JSON.parse(jsonMatch[0])
  } catch {
    return {
      score: 0,
      confidence: 'low',
      explanation: 'Failed to parse AI response',
      concerns: ['AI analysis failed'],
    }
  }
}
