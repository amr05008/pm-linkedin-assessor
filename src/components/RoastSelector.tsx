'use client';

export type RoastLevel = 'light' | 'medium' | 'burnt';

interface RoastOption {
  id: RoastLevel;
  emoji: string;
  name: string;
  description: string;
}

interface RoastSelectorProps {
  selectedLevel: RoastLevel;
  onSelect: (level: RoastLevel) => void;
  disabled?: boolean;
}

const ROAST_OPTIONS: RoastOption[] = [
  {
    id: 'light',
    emoji: '☕',
    name: 'Light Roast',
    description: 'Gentle observations with a friendly tone',
  },
  {
    id: 'medium',
    emoji: '🔥',
    name: 'Medium Roast',
    description: 'Witty commentary with a bite',
  },
  {
    id: 'burnt',
    emoji: '🥵',
    name: 'Burnt Toast',
    description: 'Unfiltered, brutally honest',
  },
];

export default function RoastSelector({
  selectedLevel,
  onSelect,
  disabled = false,
}: RoastSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
        Choose Your Roast Level
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ROAST_OPTIONS.map((option) => {
          const isSelected = selectedLevel === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => !disabled && onSelect(option.id)}
              disabled={disabled}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-200
                ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                transform hover:scale-[1.02] active:scale-[0.98]
              `}
            >
              {/* Checkmark indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              )}

              {/* Content */}
              <div className="text-center">
                <div className="text-4xl mb-2">{option.emoji}</div>
                <div className="font-semibold text-gray-900 mb-1">
                  {option.name}
                </div>
                <div className="text-sm text-gray-600">{option.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
