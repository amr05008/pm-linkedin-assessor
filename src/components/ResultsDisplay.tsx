'use client';

import { AssessmentData } from '@/types';
import { getArchetypeByName } from '@/config/archetypes';
import ShareButtons from './ShareButtons';

interface ResultsDisplayProps {
  assessmentData: AssessmentData;
  assessmentId: string;
}

export default function ResultsDisplay({
  assessmentData,
  assessmentId,
}: ResultsDisplayProps) {
  const archetype = getArchetypeByName(assessmentData.archetype);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white rounded-full px-6 py-2 shadow-md mb-4">
            <p className="text-sm font-medium text-gray-600">Your PM Archetype</p>
          </div>
        </div>

        {/* Main Result Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* Archetype Header */}
          <div className="text-center mb-8">
            <div className="text-7xl mb-4">{archetype?.emoji || '🎯'}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              {assessmentData.archetype}
            </h1>
            <p className="text-xl text-gray-600 italic">
              "{assessmentData.tagline}"
            </p>
            <div className="mt-4 text-3xl">{assessmentData.emojiVibes}</div>
          </div>

          {/* The Roast */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <span className="mr-2">🔥</span>
              The Roast
            </h2>
            <p className="text-gray-700 leading-relaxed">{assessmentData.roast}</p>
          </div>

          {/* Key Traits */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">⚡</span>
              Key Traits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {assessmentData.traits.map((trait, index) => (
                <div
                  key={index}
                  className="bg-blue-50 rounded-lg p-3 text-sm text-gray-700"
                >
                  • {trait}
                </div>
              ))}
            </div>
          </div>

          {/* Strengths */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">💪</span>
              Strengths
            </h2>
            <div className="space-y-2">
              {assessmentData.strengths.map((strength, index) => (
                <div
                  key={index}
                  className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-3 text-sm text-gray-700"
                >
                  {strength}
                </div>
              ))}
            </div>
          </div>

          {/* Growth Areas */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">🌱</span>
              Growth Areas (Said Lovingly)
            </h2>
            <div className="space-y-2">
              {assessmentData.growthAreas.map((area, index) => (
                <div
                  key={index}
                  className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg p-3 text-sm text-gray-700"
                >
                  {area}
                </div>
              ))}
            </div>
          </div>

          {/* Famous Comparison */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <span className="mr-2">🌟</span>
              Famous Comparison
            </h2>
            <p className="text-gray-700 text-lg italic">
              {assessmentData.famousComparison}
            </p>
          </div>

          {/* Share Section */}
          <div className="border-t pt-6">
            <h3 className="text-center text-sm font-medium text-gray-600 mb-4">
              Share your archetype with the world
            </h3>
            <ShareButtons assessmentId={assessmentId} archetype={assessmentData.archetype} />
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Want to analyze another PM?
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-6 rounded-lg shadow-md transition"
          >
            Try Another Profile
          </button>
        </div>
      </div>
    </div>
  );
}
