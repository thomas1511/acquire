// Define the hotel tiers and their price brackets
export const PRICE_RANGES = {
  LUXURY: ['WORLDWIDE', 'SACKSON'],
  STANDARD: ['IMPERIAL', 'AMERICAN'],
  BUDGET: ['CONTINENTAL', 'TOWER', 'FESTIVAL']
} as const;

export interface PriceBracket {
  size: [number, number | null]; // [min, max] where null means no upper limit
  price: number;
  majorityBonus: number;
  minorityBonus: number;
}

export const PRICE_BRACKETS: Record<keyof typeof PRICE_RANGES, PriceBracket[]> = {
  LUXURY: [
    { size: [2, 2], price: 300, majorityBonus: 3000, minorityBonus: 1500 },
    { size: [3, 3], price: 400, majorityBonus: 4000, minorityBonus: 2000 },
    { size: [4, 4], price: 500, majorityBonus: 5000, minorityBonus: 2500 },
    { size: [5, 5], price: 600, majorityBonus: 6000, minorityBonus: 3000 },
    { size: [6, 10], price: 700, majorityBonus: 7000, minorityBonus: 3500 },
    { size: [11, 20], price: 800, majorityBonus: 8000, minorityBonus: 4000 },
    { size: [21, 30], price: 900, majorityBonus: 9000, minorityBonus: 4500 },
    { size: [31, 40], price: 1000, majorityBonus: 10000, minorityBonus: 5000 },
    { size: [41, null], price: 1100, majorityBonus: 11000, minorityBonus: 5500 }
  ],
  STANDARD: [
    { size: [2, 2], price: 200, majorityBonus: 2000, minorityBonus: 1000 },
    { size: [3, 3], price: 300, majorityBonus: 3000, minorityBonus: 1500 },
    { size: [4, 4], price: 400, majorityBonus: 4000, minorityBonus: 2000 },
    { size: [5, 5], price: 500, majorityBonus: 5000, minorityBonus: 2500 },
    { size: [6, 10], price: 600, majorityBonus: 6000, minorityBonus: 3000 },
    { size: [11, 20], price: 700, majorityBonus: 7000, minorityBonus: 3500 },
    { size: [21, 30], price: 800, majorityBonus: 8000, minorityBonus: 4000 },
    { size: [31, 40], price: 900, majorityBonus: 9000, minorityBonus: 4500 },
    { size: [41, null], price: 1000, majorityBonus: 10000, minorityBonus: 5000 }
  ],
  BUDGET: [
    { size: [2, 2], price: 100, majorityBonus: 1000, minorityBonus: 500 },
    { size: [3, 3], price: 200, majorityBonus: 2000, minorityBonus: 1000 },
    { size: [4, 4], price: 300, majorityBonus: 3000, minorityBonus: 1500 },
    { size: [5, 5], price: 400, majorityBonus: 4000, minorityBonus: 2000 },
    { size: [6, 10], price: 500, majorityBonus: 5000, minorityBonus: 2500 },
    { size: [11, 20], price: 600, majorityBonus: 6000, minorityBonus: 3000 },
    { size: [21, 30], price: 700, majorityBonus: 7000, minorityBonus: 3500 },
    { size: [31, 40], price: 800, majorityBonus: 8000, minorityBonus: 4000 },
    { size: [41, null], price: 900, majorityBonus: 9000, minorityBonus: 4500 }
  ]
};