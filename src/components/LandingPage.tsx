'use client';

import { useState } from 'react';
import { validateLinkedInUrl } from '@/lib/utils';
import Spinner from './Spinner';

interface LandingPageProps {
  onSubmit: (url: string, aboutText: string) => void;
  isLoading?: boolean;
}

export default function LandingPage({ onSubmit, isLoading = false }: LandingPageProps) {
  const [url, setUrl] = useState('');
  const [aboutText, setAboutText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = validateLinkedInUrl(url);
    if (!validation.valid) {
      setError(validation.error || 'Invalid LinkedIn URL');
      return;
    }

    if (!aboutText.trim()) {
      setError('Please paste your LinkedIn About section');
      return;
    }

    if (aboutText.trim().length < 50) {
      setError('Please provide at least 50 characters from your About section');
      return;
    }

    onSubmit(url, aboutText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            What Kind of PM Are You? 🎯
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            Discover your Product Manager archetype through AI-powered analysis
          </p>
          <p className="text-sm text-gray-600">
            (Warning: Results may be uncomfortably accurate)
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="linkedin-url" className="block text-sm font-medium text-gray-700 mb-2">
                Paste your LinkedIn profile URL
              </label>
              <input
                id="linkedin-url"
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError('');
                }}
                placeholder="https://linkedin.com/in/your-profile"
                className={`w-full px-4 py-3 border ${
                  error ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900`}
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="about-text" className="block text-sm font-medium text-gray-700 mb-2">
                Paste your LinkedIn "About" section
              </label>
              <textarea
                id="about-text"
                value={aboutText}
                onChange={(e) => {
                  setAboutText(e.target.value);
                  setError('');
                }}
                placeholder="Copy and paste your LinkedIn About section here... (e.g., 'Passionate product leader with 5+ years of experience building user-centric products...')"
                rows={6}
                className={`w-full px-4 py-3 border ${
                  error ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 resize-none`}
                disabled={isLoading}
              />
              <p className="mt-1 text-xs text-gray-500">
                Don't have an About section? Write a brief description of your PM experience (min 50 characters)
              </p>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-[1.02] disabled:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading && <Spinner />}
              {isLoading ? 'Analyzing...' : 'Roast My PM Style'}
            </button>
          </form>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white bg-opacity-50 rounded-lg p-4">
            <div className="text-3xl mb-2">🤖</div>
            <div className="text-sm font-medium text-gray-800">AI-Powered</div>
            <div className="text-xs text-gray-600">Claude analyzes your profile</div>
          </div>
          <div className="bg-white bg-opacity-50 rounded-lg p-4">
            <div className="text-3xl mb-2">😂</div>
            <div className="text-sm font-medium text-gray-800">Witty & Honest</div>
            <div className="text-xs text-gray-600">Get roasted (lovingly)</div>
          </div>
          <div className="bg-white bg-opacity-50 rounded-lg p-4">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-sm font-medium text-gray-800">Shareable</div>
            <div className="text-xs text-gray-600">Show off your archetype</div>
          </div>
        </div>

        {/* Sample Archetypes Teaser */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-3">
            Could you be a...
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="bg-white bg-opacity-70 px-3 py-1 rounded-full text-xs font-medium text-gray-700">
              🚀 Vision Vaporware PM
            </span>
            <span className="bg-white bg-opacity-70 px-3 py-1 rounded-full text-xs font-medium text-gray-700">
              📊 Data Paralysis PM
            </span>
            <span className="bg-white bg-opacity-70 px-3 py-1 rounded-full text-xs font-medium text-gray-700">
              🤖 AI Hype Beast
            </span>
            <span className="bg-white bg-opacity-70 px-3 py-1 rounded-full text-xs font-medium text-gray-700">
              🎲 Chaotic Neutral PM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
