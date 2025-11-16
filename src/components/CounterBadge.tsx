'use client';

import { useEffect, useState } from 'react';

export default function CounterBadge() {
  const [targetCount, setTargetCount] = useState<number>(0);
  const [displayCount, setDisplayCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the actual count from API
  useEffect(() => {
    async function fetchCount() {
      try {
        const response = await fetch('/api/stats', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          }
        });
        if (response.ok) {
          const data = await response.json();
          setTargetCount(data.count);
        }
      } catch (error) {
        console.error('Failed to fetch count:', error);
        // Fallback to 0 if fetch fails
        setTargetCount(0);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCount();
  }, []);

  // Animate count from 0 to target
  useEffect(() => {
    if (isLoading || targetCount === 0) return;

    const duration = 2000; // 2 seconds
    const steps = 60; // 60 frames
    const increment = targetCount / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayCount(targetCount);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(increment * currentStep));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [targetCount, isLoading]);

  return (
    <div className="flex justify-center mb-8">
      <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-full px-6 py-3 shadow-lg">
        <p className="text-white text-base sm:text-lg font-semibold flex items-center gap-2">
          <span className="text-xl">🔥</span>
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <span>
              {displayCount.toLocaleString()} PM{displayCount !== 1 ? 's' : ''} roasted
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
