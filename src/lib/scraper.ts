import { ProfileData } from '@/types';

/**
 * Extract LinkedIn profile data
 * Now uses user-provided About text for personalized assessments
 */
export async function extractLinkedInProfile(url: string, aboutText: string): Promise<ProfileData> {
  // Validate LinkedIn URL format
  if (!isValidLinkedInUrl(url)) {
    throw new Error('Invalid LinkedIn URL format');
  }

  // Extract username from URL for headline generation
  const username = url.split('/in/')[1]?.split('/')[0] || 'user';

  // Use the user-provided About text directly
  return {
    url,
    headline: `Product Manager | ${username}`, // Simple generic headline
    about: aboutText, // User's actual About section!
    experience: '', // Can be added later if needed
  };
}

/**
 * Validate LinkedIn URL format
 */
export function isValidLinkedInUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // Check if it's a LinkedIn URL
    if (
      !hostname.includes('linkedin.com') &&
      !hostname.includes('www.linkedin.com')
    ) {
      return false;
    }

    // Check if it's a profile URL (contains /in/)
    if (!urlObj.pathname.includes('/in/')) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Get mock profile data based on URL
 * This is a placeholder for MVP - replace with real data extraction later
 */
function getMockProfileData(url: string): ProfileData {
  // Extract username from URL for personalization
  const username = url.split('/in/')[1]?.split('/')[0] || 'user';

  // Return mock data with some variety
  const mockProfiles = [
    {
      url,
      headline: 'Senior Product Manager | AI & Machine Learning | Ex-FAANG',
      about:
        'Passionate about building AI-powered products that solve real user problems. Led multiple 0-to-1 product launches at top tech companies. Data-driven decision maker with a focus on user experience and business impact.',
      experience:
        'Senior PM at Tech Corp (AI products), PM at StartupCo (growth initiatives), APM at BigTech (platform development)',
    },
    {
      url,
      headline: 'Product Lead | Growth & Analytics | Building the Future',
      about:
        'Growth-focused Product Manager obsessed with metrics and user acquisition. Love running experiments and optimizing conversion funnels. Built products used by millions of users.',
      experience:
        'Product Lead at GrowthCo (growth team), Senior PM at Analytics Inc (data products), PM at Mobile First (consumer apps)',
    },
    {
      url,
      headline: 'VP Product | Strategic Thinker | Ex-Consultant',
      about:
        'Strategic product leader with MBA and consulting background. Expert in frameworks, roadmapping, and stakeholder management. Passionate about turning vision into executable plans.',
      experience:
        'VP Product at Enterprise SaaS, Director of Product at B2B Platform, Product Manager at McKinsey Digital',
    },
    {
      url,
      headline: 'Product Manager | Technical PM | Former Software Engineer',
      about:
        'Technical PM who speaks engineer fluently. Transitioned from software engineering to product management. Still love getting hands dirty with code and architecture discussions.',
      experience:
        'Technical PM at DevTools Co, Senior Engineer turned PM at Cloud Platform, Software Engineer at Startup',
    },
    {
      url,
      headline: 'Principal PM | Customer-Centric | UX Advocate',
      about:
        'User research enthusiast and customer interview addict. Believe in talking to users every single week. Built my career on deep customer empathy and solving real pain points.',
      experience:
        'Principal PM at UserFirst Inc, Senior PM at Customer Success Platform, PM at Design-Led Startup',
    },
  ];

  // Use hash of username to consistently return same profile for same URL
  const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const profileIndex = hash % mockProfiles.length;

  return mockProfiles[profileIndex];
}
