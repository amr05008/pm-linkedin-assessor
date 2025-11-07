export interface Archetype {
  id: string;
  name: string;
  description: string;
  emoji: string;
}

export const ARCHETYPES: Archetype[] = [
  {
    id: 'vision-vaporware',
    name: 'The Vision Vaporware PM',
    description: 'All strategy, no execution. Lives in the future, forgets about the present.',
    emoji: '🚀',
  },
  {
    id: 'feature-factory',
    name: 'The Feature Factory Foreman',
    description: 'Ships everything, strategizes nothing. Velocity over value.',
    emoji: '⚙️',
  },
  {
    id: 'data-paralysis',
    name: 'The Data Paralysis PM',
    description: "Can't decide without 47 more A/B tests. Analysis forever, action never.",
    emoji: '📊',
  },
  {
    id: 'user-whisperer',
    name: 'The User Whisperer',
    description: 'Empathy levels off the charts. Probably crying about user pain right now.',
    emoji: '💝',
  },
  {
    id: 'stakeholder-juggler',
    name: 'The Stakeholder Juggler',
    description: 'Keeps everyone happy somehow. Master of the "I\'ll take that offline."',
    emoji: '🤹',
  },
  {
    id: 'ai-hype-beast',
    name: 'The AI Hype Beast',
    description: '"Can we add AI to this?" Asked in every. Single. Meeting.',
    emoji: '🤖',
  },
  {
    id: 'roadmap-remixer',
    name: 'The Roadmap Remixer',
    description: 'Priorities change weekly. Q4 roadmap? More like daily suggestions.',
    emoji: '🎛️',
  },
  {
    id: 'technical-pm',
    name: 'The Technical PM',
    description: 'Basically an engineer who switched teams. Still reviews PRs.',
    emoji: '👨‍💻',
  },
  {
    id: 'strategic-philosopher',
    name: 'The Strategic Philosopher',
    description: 'Frameworks for everything. Has a 2x2 matrix for breakfast choices.',
    emoji: '📚',
  },
  {
    id: 'growth-hacker',
    name: 'The Growth Hacker',
    description: 'Metrics, metrics, metrics. Conversion funnels in their sleep.',
    emoji: '📈',
  },
  {
    id: 'customer-evangelist',
    name: 'The Customer Development Evangelist',
    description: 'Jobs-to-be-Done tattooed somewhere probably.',
    emoji: '🎯',
  },
  {
    id: 'chaotic-neutral',
    name: 'The Chaotic Neutral PM',
    description: 'No clear strategy but somehow it all works out. Vibes-based product management.',
    emoji: '🎲',
  },
];

export function getArchetypesList(): string {
  return ARCHETYPES.map((a, i) =>
    `${i + 1}. **${a.name}** - ${a.description}`
  ).join('\n\n');
}

export function getArchetypeById(id: string): Archetype | undefined {
  return ARCHETYPES.find((a) => a.id === id);
}

export function getArchetypeByName(name: string): Archetype | undefined {
  return ARCHETYPES.find((a) => a.name === name);
}
