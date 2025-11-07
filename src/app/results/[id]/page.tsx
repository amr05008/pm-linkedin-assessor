import { notFound } from 'next/navigation';
import ResultsDisplay from '@/components/ResultsDisplay';
import { AssessmentData } from '@/types';

async function getAssessmentResults(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/results/${id}`, {
      cache: 'no-store', // Always get fresh data
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching results:', error);
    return null;
  }
}

export default async function ResultsPage({
  params,
}: {
  params: { id: string };
}) {
  const results = await getAssessmentResults(params.id);

  if (!results || !results.assessmentData) {
    notFound();
  }

  return (
    <ResultsDisplay
      assessmentData={results.assessmentData as AssessmentData}
      assessmentId={params.id}
    />
  );
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const results = await getAssessmentResults(params.id);

  if (!results) {
    return {
      title: 'Assessment Not Found',
    };
  }

  return {
    title: `${results.archetype} - PM Assessment Results`,
    description: results.tagline || 'Discover your Product Manager archetype',
    openGraph: {
      title: `I'm a ${results.archetype}!`,
      description: results.tagline || 'Find out your PM archetype',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `I'm a ${results.archetype}!`,
      description: results.tagline || 'Find out your PM archetype',
    },
  };
}
