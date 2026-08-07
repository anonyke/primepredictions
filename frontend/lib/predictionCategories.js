// Central source of truth for all prediction categories used across the platform.
// Each category has an id (used in URLs/queries), a label, a value (stored in the
// backend `category` field), an icon, and a short description.

export const PREDICTION_CATEGORIES = [
  {
    id: 'over-0.5',
    label: 'Over 0.5 Goals',
    value: 'Over 0.5 Goals',
    icon: '⚽',
    color: '#00E5FF',
    desc: 'Total match goals over 0.5',
  },
  {
    id: 'over-1.5',
    label: 'Over 1.5 Goals',
    value: 'Over 1.5 Goals',
    icon: '⚽',
    color: '#00E5FF',
    desc: 'Total match goals over 1.5',
  },
  {
    id: 'over-2.5',
    label: 'Over 2.5 Goals',
    value: 'Over 2.5 Goals',
    icon: '⚽',
    color: '#00E5FF',
    desc: 'Total match goals over 2.5',
  },
  {
    id: 'over-3.5',
    label: 'Over 3.5 Goals',
    value: 'Over 3.5 Goals',
    icon: '⚽',
    color: '#00E5FF',
    desc: 'Total match goals over 3.5',
  },
  {
    id: 'under-2.5',
    label: 'Under 2.5 Goals',
    value: 'Under 2.5 Goals',
    icon: '🧤',
    color: '#7C4DFF',
    desc: 'Total match goals under 2.5',
  },
  {
    id: 'under-3.5',
    label: 'Under 3.5 Goals',
    value: 'Under 3.5 Goals',
    icon: '🧤',
    color: '#7C4DFF',
    desc: 'Total match goals under 3.5',
  },
  {
    id: 'btts',
    label: 'Both Teams To Score',
    value: 'BTTS',
    icon: '🤝',
    color: '#00E676',
    desc: 'Both teams to score at least once',
  },
  {
    id: 'correct-score',
    label: 'Correct Score',
    value: 'Correct Score',
    icon: '🎯',
    color: '#FFD700',
    desc: 'Exact final score prediction',
  },
  {
    id: 'double-chance',
    label: 'Double Chance',
    value: 'Double Chance',
    icon: '🛡️',
    color: '#FF9100',
    desc: 'Two of three match outcomes covered',
  },
  {
    id: 'draw-no-bet',
    label: 'Draw No Bet',
    value: 'Draw No Bet',
    icon: '↔️',
    color: '#00B8CC',
    desc: 'Stake returned if match ends in a draw',
  },
  {
    id: 'home-win',
    label: 'Home Win',
    value: 'Home Win',
    icon: '🏠',
    color: '#00E5FF',
    desc: 'Home team to win the match',
  },
  {
    id: 'away-win',
    label: 'Away Win',
    value: 'Away Win',
    icon: '✈️',
    color: '#7C4DFF',
    desc: 'Away team to win the match',
  },
  {
    id: 'ht-ft',
    label: 'Half-Time/Full-Time',
    value: 'HT/FT',
    icon: '🔄',
    color: '#B388FF',
    desc: 'Result at half-time and full-time',
  },
  {
    id: 'corners',
    label: 'Corners',
    value: 'Corners',
    icon: '🚩',
    color: '#FF6B35',
    desc: 'Total corners in the match',
  },
  {
    id: 'cards',
    label: 'Cards',
    value: 'Cards',
    icon: '🟨',
    color: '#FFD700',
    desc: 'Total cards shown in the match',
  },
  {
    id: 'banker-tips',
    label: 'Banker Tips',
    value: 'Banker Tips',
    icon: '🏦',
    color: '#00E676',
    desc: 'High-confidence, low-risk selections',
  },
  {
    id: 'accumulator-tips',
    label: 'Accumulator Tips',
    value: 'Accumulator Tips',
    icon: '📈',
    color: '#7C4DFF',
    desc: 'Multi-selection accumulator picks',
  },
  {
    id: 'vip-predictions',
    label: 'VIP Predictions',
    value: 'VIP Predictions',
    icon: '👑',
    color: '#FFD700',
    desc: 'Exclusive premium VIP selections',
  },
  {
    id: '1x2',
    label: '1X2 (Home/Draw/Away)',
    value: '1X2',
    icon: '🎯',
    color: '#00E5FF',
    desc: 'Win, draw, or away win',
  },
];

// Map a stored category value (from backend) to its category object.
export function getCategoryByValue(value) {
  if (!value) return null;
  return PREDICTION_CATEGORIES.find(
    (c) => c.value.toLowerCase() === String(value).toLowerCase()
  ) || null;
}

// Map a category id to its object.
export function getCategoryById(id) {
  if (!id) return null;
  return PREDICTION_CATEGORIES.find((c) => c.id === id) || null;
}

// Default category used when none is specified.
export const DEFAULT_CATEGORY = '1X2';
