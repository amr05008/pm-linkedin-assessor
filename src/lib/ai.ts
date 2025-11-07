import Anthropic from '@anthropic-ai/sdk';
import { getArchetypesList } from '@/config/archetypes';
import { ProfileData, AssessmentData } from '@/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export function generateAssessmentPrompt(profileData: ProfileData): string {
  return `You are a witty, slightly snarky PM assessment expert with a great sense of humor. You're analyzing Product Managers and assigning them to archetypes based on their LinkedIn profiles.

Here are the 12 PM archetypes to choose from:

${getArchetypesList()}

Based on this LinkedIn profile data, assign them to ONE archetype:
LinkedIn URL: ${profileData.url}
Profile Headline: ${profileData.headline || 'Not available'}
About: ${profileData.about || 'Not available'}
Experience: ${profileData.experience || 'Not available'}

Respond ONLY with valid JSON (no markdown, no backticks, no extra text):
{
  "archetype": "The exact archetype name from the list above",
  "tagline": "A witty, snarky one-liner (10-15 words) that roasts them gently",
  "roast": "2-3 sentences of affectionate, clever roasting that references their actual profile details",
  "traits": [
    "specific trait 1 based on their profile",
    "specific trait 2 based on their profile",
    "specific trait 3 based on their profile",
    "specific trait 4 based on their profile"
  ],
  "strengths": [
    "actual strength 1",
    "actual strength 2",
    "actual strength 3"
  ],
  "growthAreas": [
    "growth area 1 (framed humorously)",
    "growth area 2 (framed humorously)",
    "growth area 3 (framed humorously)"
  ],
  "famousComparison": "You're the [Famous PM/Tech Leader] of [specific thing], but with [humorous twist]",
  "emojiVibes": "🎯✨🚀 (pick 3 relevant emojis)"
}

Be specific, clever, and reference actual details from their profile. Keep it fun and shareable!`;
}

export async function generateAssessment(
  profileData: ProfileData
): Promise<AssessmentData> {
  const prompt = generateAssessmentPrompt(profileData);

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText =
      message.content[0].type === 'text' ? message.content[0].text : '';

    // Clean up potential markdown formatting
    const cleanedText = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const assessmentData = JSON.parse(cleanedText) as AssessmentData;

    return assessmentData;
  } catch (error) {
    console.error('Error generating assessment:', error);
    throw new Error('Failed to generate assessment from AI');
  }
}
