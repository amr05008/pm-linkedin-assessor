import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { extractLinkedInProfile } from '@/lib/scraper';
import { generateAssessment } from '@/lib/ai';
import { validateLinkedInUrl } from '@/lib/utils';
import { rateLimit, getClientIp } from '@/lib/ratelimit';
import { AnalyzeResponse, ErrorResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting (10 requests per hour per IP)
    const clientIp = getClientIp(request.headers);
    const rateLimitResult = rateLimit(clientIp, 10, 60 * 60 * 1000); // 10 requests per hour

    if (!rateLimitResult.success) {
      const resetDate = new Date(rateLimitResult.reset);
      return NextResponse.json<ErrorResponse>(
        {
          error: 'Too Many Requests',
          message: `Rate limit exceeded. Try again after ${resetDate.toLocaleTimeString()}.`,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const body = await request.json();
    const { linkedinUrl, aboutText } = body;

    // Validate LinkedIn URL
    if (!linkedinUrl) {
      return NextResponse.json<ErrorResponse>(
        {
          error: 'Bad Request',
          message: 'LinkedIn URL is required',
        },
        { status: 400 }
      );
    }

    const validation = validateLinkedInUrl(linkedinUrl);
    if (!validation.valid) {
      return NextResponse.json<ErrorResponse>(
        {
          error: 'Bad Request',
          message: validation.error || 'Invalid LinkedIn URL',
        },
        { status: 400 }
      );
    }

    // Validate aboutText
    if (!aboutText || aboutText.trim().length < 50) {
      return NextResponse.json<ErrorResponse>(
        {
          error: 'Bad Request',
          message: 'About section must be at least 50 characters',
        },
        { status: 400 }
      );
    }

    // Create Assessment record in database (without email initially)
    const assessment = await prisma.assessment.create({
      data: {
        linkedinUrl,
      },
    });

    // Process in background (for now, we'll do it synchronously for MVP)
    // In production, you might want to use a queue or background job
    try {
      // Extract LinkedIn profile data (now with user-provided about text)
      const profileData = await extractLinkedInProfile(linkedinUrl, aboutText);

      // Generate AI assessment
      const assessmentData = await generateAssessment(profileData);

      // Update Assessment record with results
      await prisma.assessment.update({
        where: { id: assessment.id },
        data: {
          archetype: assessmentData.archetype,
          assessmentData: assessmentData as any, // Store as JSON
        },
      });
    } catch (error) {
      console.error('Error processing assessment:', error);
      // Don't fail the request - just log the error
      // The user can retry if needed
    }

    // Return assessment ID
    const response: AnalyzeResponse = {
      assessmentId: assessment.id,
      status: 'processing',
    };

    return NextResponse.json(response, { status: 202 });
  } catch (error) {
    console.error('Error in /api/analyze:', error);

    return NextResponse.json<ErrorResponse>(
      {
        error: 'Internal Server Error',
        message: 'Failed to process request',
      },
      { status: 500 }
    );
  }
}
