export const VERIFICATION_PROMPT = `You are an AI impact verification system. Your task is to analyze before/after images of environmental or social impact actions.

Analyze the following:
1. Visual consistency - Are the images from the same location?
2. Lighting and weather consistency
3. Perspective and framing
4. The magnitude and authenticity of the claimed change
5. Any signs of manipulation or deceit

Return a JSON object with:
- score: number (0-100)
- confidence: "low" | "medium" | "high"
- explanation: string (brief explanation of the score)
- concerns: string[] (any concerns about authenticity)
- tags: string[] (relevant impact categories)`

export const CATEGORY_DETECTION_PROMPT = `Based on this image, determine the most relevant impact categories from:
- tree_planting
- beach_cleanup
- community_garden
- renewable_energy
- water_conservation
- recycling
- wildlife_protection
- urban_greening
- other

Return a JSON array of category strings.`
