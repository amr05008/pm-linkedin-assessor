'use client';

import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import ProcessingAnimation from '@/components/ProcessingAnimation';
import EmailGate from '@/components/EmailGate';
import ResultsDisplay from '@/components/ResultsDisplay';
import { AssessmentData } from '@/types';

type FlowState = 'landing' | 'processing' | 'email-gate' | 'results';

export default function Home() {
  const [flowState, setFlowState] = useState<FlowState>('landing');
  const [assessmentId, setAssessmentId] = useState<string>('');
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlSubmit = async (url: string) => {
    setIsLoading(true);
    setFlowState('processing');

    try {
      // Call analyze API
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ linkedinUrl: url }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze profile');
      }

      const data = await response.json();
      setAssessmentId(data.assessmentId);

      // Wait a bit for processing (AI analysis happens in background)
      // In production, you might poll for status or use websockets
      await new Promise((resolve) => setTimeout(resolve, 12000));

      // Move to email gate
      setFlowState('email-gate');
    } catch (error) {
      console.error('Error analyzing profile:', error);
      alert('Something went wrong. Please try again.');
      setFlowState('landing');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (email: string) => {
    setIsLoading(true);

    try {
      // Call submit-email API
      const response = await fetch('/api/submit-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assessmentId,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit email');
      }

      const data = await response.json();
      setAssessmentData(data.assessmentData);

      // Show results
      setFlowState('results');
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {flowState === 'landing' && (
        <LandingPage onSubmit={handleUrlSubmit} isLoading={isLoading} />
      )}

      {flowState === 'processing' && <ProcessingAnimation />}

      {flowState === 'email-gate' && (
        <EmailGate onSubmit={handleEmailSubmit} isLoading={isLoading} />
      )}

      {flowState === 'results' && assessmentData && (
        <ResultsDisplay
          assessmentData={assessmentData}
          assessmentId={assessmentId}
        />
      )}
    </>
  );
}
