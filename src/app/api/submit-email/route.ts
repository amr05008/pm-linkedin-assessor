import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { validateEmail } from '@/lib/utils';
import { SubmitEmailResponse, ErrorResponse, AssessmentData } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { assessmentId, email } = body;

    // Validate inputs
    if (!assessmentId || !email) {
      return NextResponse.json<ErrorResponse>(
        {
          error: 'Bad Request',
          message: 'Assessment ID and email are required',
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return NextResponse.json<ErrorResponse>(
        {
          error: 'Bad Request',
          message: emailValidation.error || 'Invalid email address',
        },
        { status: 400 }
      );
    }

    // Check if assessment exists
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
    });

    if (!assessment) {
      return NextResponse.json<ErrorResponse>(
        {
          error: 'Not Found',
          message: 'Assessment not found',
        },
        { status: 404 }
      );
    }

    // Update Assessment record with email and timestamp
    const updatedAssessment = await prisma.assessment.update({
      where: { id: assessmentId },
      data: {
        email,
        emailSubmittedAt: new Date(),
      },
    });

    // Add to WaitlistEmail table (upsert to avoid duplicates)
    try {
      await prisma.waitlistEmail.upsert({
        where: { email },
        update: {}, // Don't update if already exists
        create: {
          email,
          source: 'assessment',
        },
      });
    } catch (error) {
      // Non-critical - log but don't fail the request
      console.error('Error adding to waitlist:', error);
    }

    // Return full assessment results
    const response: SubmitEmailResponse = {
      assessmentId: updatedAssessment.id,
      archetype: updatedAssessment.archetype || 'Unknown',
      assessmentData: updatedAssessment.assessmentData as unknown as AssessmentData,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error in /api/submit-email:', error);

    return NextResponse.json<ErrorResponse>(
      {
        error: 'Internal Server Error',
        message: 'Failed to process request',
      },
      { status: 500 }
    );
  }
}
