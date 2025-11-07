// LinkedIn profile data structure
export interface ProfileData {
  url: string;
  headline?: string;
  about?: string;
  experience?: string;
}

// Assessment data returned by AI
export interface AssessmentData {
  archetype: string;
  tagline: string;
  roast: string;
  traits: string[];
  strengths: string[];
  growthAreas: string[];
  famousComparison: string;
  emojiVibes: string;
}

// API response types
export interface AnalyzeResponse {
  assessmentId: string;
  status: 'processing' | 'completed' | 'error';
}

export interface SubmitEmailResponse {
  assessmentId: string;
  archetype: string;
  assessmentData: AssessmentData;
}

export interface ResultsResponse {
  archetype: string;
  tagline: string;
  emojiVibes: string;
  assessmentData?: AssessmentData;
}

// API error response
export interface ErrorResponse {
  error: string;
  message: string;
}

// Analytics event types
export type AnalyticsEvent =
  | 'url_submitted'
  | 'email_submitted'
  | 'results_viewed'
  | 'results_shared';

export interface AnalyticsEventData {
  event: AnalyticsEvent;
  assessmentId: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}
