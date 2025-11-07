'use client';

import { useEffect, useState } from 'react';

const WITTY_MESSAGES = [
  'Analyzing your buzzword density...',
  'Counting "synergy" mentions...',
  'Measuring stakeholder management prowess...',
  'Detecting framework addiction levels...',
  'Evaluating roadmap remix frequency...',
  'Scanning for data-driven decision making...',
  'Assessing user empathy quotient...',
  'Calculating shipping velocity vs. strategy ratio...',
  'Reviewing your 2x2 matrix collection...',
  'Determining AI hype enthusiasm...',
  'Measuring "let\'s take this offline" frequency...',
  'Analyzing feature prioritization patterns...',
];

export default function ProcessingAnimation() {
  const [currentMessage, setCurrentMessage] = useState(WITTY_MESSAGES[0]);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        const next = (prev + 1) % WITTY_MESSAGES.length;
        setCurrentMessage(WITTY_MESSAGES[next]);
        return next;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Animated loader */}
        <div className="mb-8">
          <div className="relative inline-block">
            {/* Spinning circles */}
            <div className="w-24 h-24 relative">
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-ping opacity-75"></div>
              <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-4 border-indigo-400 border-b-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-0 flex items-center justify-center text-4xl">
                🤖
              </div>
            </div>
          </div>
        </div>

        {/* Status message */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Analyzing Your PM Archetype...
          </h2>
          <div className="h-16 flex items-center justify-center">
            <p className="text-lg text-gray-700 transition-opacity duration-300">
              {currentMessage}
            </p>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="bg-white bg-opacity-50 rounded-lg p-4">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <div className="animate-pulse">⏳</div>
            <span>This usually takes 10-15 seconds...</span>
          </div>
        </div>

        {/* Subtle hint */}
        <p className="mt-6 text-xs text-gray-500">
          Preparing your personalized roast...
        </p>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
