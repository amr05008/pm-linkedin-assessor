import Anthropic from '@anthropic-ai/sdk';
import { getArchetypesList } from '@/config/archetypes';
import { ProfileData, AssessmentData } from '@/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

type RoastLevel = 'light' | 'medium' | 'burnt';

function getRoastInstructions(roastLevel: RoastLevel): string {
  switch (roastLevel) {
    case 'light':
      return 'Provide gentle, encouraging feedback with constructive observations. Be friendly and supportive. Keep the tone positive and uplifting while still being honest. Think of yourself as a supportive mentor who wants to help them grow.';
    case 'medium':
      return 'Provide witty, humorous analysis with a balance of truth and comedy. Be clever and engaging. Your tone should be playfully snarky - like roasting a friend you genuinely like. Mix compliments with gentle teasing.';
    case 'burnt':
      return 'Provide brutally honest, unfiltered feedback. Don\'t hold back. Be direct and call out any BS. Your tone should be like a no-nonsense critic who tells it like it is. Be savage but accurate. Make them laugh-cry at the truth.';
    default:
      return 'Provide witty, humorous analysis with a balance of truth and comedy.';
  }
}

export function generateAssessmentPrompt(profileData: ProfileData, roastLevel: RoastLevel = 'medium'): string {
  const roastInstructions = getRoastInstructions(roastLevel);

  return `You are a witty PM assessment expert analyzing Product Managers and assigning them to archetypes based on their LinkedIn profiles.

ROAST LEVEL INSTRUCTIONS:
${roastInstructions}

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
  profileData: ProfileData,
  roastLevel: RoastLevel = 'medium'
): Promise<AssessmentData> {
  const prompt = generateAssessmentPrompt(profileData, roastLevel);

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
