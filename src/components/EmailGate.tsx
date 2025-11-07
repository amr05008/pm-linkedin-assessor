'use client';

import { useState } from 'react';
import { validateEmail } from '@/lib/utils';
import Spinner from './Spinner';

interface EmailGateProps {
  onSubmit: (email: string) => void;
  isLoading?: boolean;
}

export default function EmailGate({ onSubmit, isLoading = false }: EmailGateProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = validateEmail(email);
    if (!validation.valid) {
      setError(validation.error || 'Invalid email address');
      return;
    }

    onSubmit(email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl">🎯</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Your Results Are Ready!
          </h2>

          {/* Teaser */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700 mb-2">
              We've analyzed your profile and assigned you a PM archetype.
            </p>
            <p className="text-xs text-gray-600">
              (The AI has opinions... and they're spicy 🌶️)
            </p>
          </div>

          {/* Value proposition */}
          <div className="mb-6 space-y-2 text-left">
            <div className="flex items-start space-x-3">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-sm text-gray-700">Your personalized PM archetype</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-sm text-gray-700">Strengths & growth areas</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-sm text-gray-700">Witty, shareable roast</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your email to unlock results
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="your.email@example.com"
                className={`w-full px-4 py-3 border ${
                  error ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900`}
                disabled={isLoading}
              />
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-[1.02] disabled:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading && <Spinner />}
              {isLoading ? 'Loading...' : 'Show Me My Results'}
            </button>
          </form>

          {/* Privacy note */}
          <p className="mt-4 text-xs text-gray-500">
            We respect your privacy. No spam, just your results.
          </p>
        </div>

        {/* Extra motivation */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Join <span className="font-semibold">thousands of PMs</span> who've discovered their archetype
          </p>
        </div>
      </div>
    </div>
  );
}
