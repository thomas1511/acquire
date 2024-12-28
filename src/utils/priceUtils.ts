import { PRICE_RANGES, PRICE_BRACKETS, type PriceBracket } from '../types/price';
import type { HOTEL_CHAINS } from '../types/game';

export function getHotelTier(chainId: keyof typeof HOTEL_CHAINS): keyof typeof PRICE_RANGES {
  for (const [tier, chains] of Object.entries(PRICE_RANGES)) {
    if (chains.includes(chainId as any)) {
      return tier as keyof typeof PRICE_RANGES;
    }
  }
  throw new Error(`Invalid chain ID: ${chainId}`);
}

export function getPriceBracket(chainId: keyof typeof HOTEL_CHAINS, size: number): PriceBracket {
  const tier = getHotelTier(chainId);
  const brackets = PRICE_BRACKETS[tier];

  // console.log([chainId,tier,size,priceBracket,brackets]);
  
  return brackets.find(bracket => 
    size >= bracket.size[0] && 
    (bracket.size[1] === null || size <= bracket.size[1])
  ) || brackets[brackets.length - 1];
}

export function getStockPrice(chainId: keyof typeof HOTEL_CHAINS, size: number): number {
  // console.log('size',size)
  return getPriceBracket(chainId, size).price;
}

export function getMajorityBonus(chainId: keyof typeof HOTEL_CHAINS, size: number): number {
  return getPriceBracket(chainId, size).majorityBonus;
}

export function getMinorityBonus(chainId: keyof typeof HOTEL_CHAINS, size: number): number {
  return getPriceBracket(chainId, size).minorityBonus;
}