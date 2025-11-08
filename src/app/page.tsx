'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ErrorBoundary from '@/components/ErrorBoundary';
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

  // Prevent pull-to-refresh on mobile (iOS specifically)
  useEffect(() => {
    let startY = 0;

    const preventPull = (e: TouchEvent) => {
      const touch = e.touches[0];
      const scrollY = window.scrollY || window.pageYOffset;

      // If we're at the top of the page and user is pulling down
      if (scrollY <= 0 && touch.clientY > startY) {
        e.preventDefault();
      }
    };

    const recordStartY = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    // Use passive: false to allow preventDefault
    document.addEventListener('touchstart', recordStartY, { passive: true });
    document.addEventListener('touchmove', preventPull, { passive: false });

    return () => {
      document.removeEventListener('touchstart', recordStartY);
      document.removeEventListener('touchmove', preventPull);
    };
  }, []);

  // Persist state to sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('flowState', flowState);
      if (assessmentId) {
        sessionStorage.setItem('assessmentId', assessmentId);
      }
      if (assessmentData) {
        sessionStorage.setItem('assessmentData', JSON.stringify(assessmentData));
      }
    }
  }, [flowState, assessmentId, assessmentData]);

  // Restore state from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFlowState = sessionStorage.getItem('flowState') as FlowState | null;
      const savedAssessmentId = sessionStorage.getItem('assessmentId');
      const savedAssessmentData = sessionStorage.getItem('assessmentData');

      if (savedFlowState && savedFlowState !== 'landing') {
        setFlowState(savedFlowState);
      }
      if (savedAssessmentId) {
        setAssessmentId(savedAssessmentId);
      }
      if (savedAssessmentData) {
        try {
          setAssessmentData(JSON.parse(savedAssessmentData));
        } catch (error) {
          console.error('Error parsing saved assessment data:', error);
        }
      }
    }
  }, []);

  const handleUrlSubmit = async (url: string, aboutText: string, roastLevel: string) => {
    setIsLoading(true);
    setFlowState('processing');

    try {
      // Call analyze API
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ linkedinUrl: url, aboutText, roastLevel }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 429) {
          throw new Error(errorData.message || 'Rate limit exceeded. Please try again later.');
        }
        throw new Error(errorData.message || 'Failed to analyze profile');
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
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      toast.error(errorMessage);
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
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}
