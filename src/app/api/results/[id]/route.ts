import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { ResultsResponse, ErrorResponse, AssessmentData } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const assessmentId = params.id;

    if (!assessmentId) {
      return NextResponse.json<ErrorResponse>(
        {
          error: 'Bad Request',
          message: 'Assessment ID is required',
        },
        { status: 400 }
      );
    }

    // Fetch assessment from database
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

    // Return public assessment data (for sharing)
    const assessmentData = assessment.assessmentData as unknown as AssessmentData | null;

    const response: ResultsResponse = {
      archetype: assessment.archetype || 'Unknown',
      tagline: assessmentData?.tagline || '',
      emojiVibes: assessmentData?.emojiVibes || '',
      assessmentData: assessmentData || undefined,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error in /api/results/[id]:', error);

    return NextResponse.json<ErrorResponse>(
      {
        error: 'Internal Server Error',
        message: 'Failed to fetch results',
      },
      { status: 500 }
    );
  }
}
