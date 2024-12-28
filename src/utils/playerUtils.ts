import { HOTEL_CHAINS } from '../types/game';
import type { Player } from '../types/game';

export function createNewPlayer(name: string): Player {
  return {
    id: crypto.randomUUID(),
    name,
    money: 6000,
    tiles: [],
    shares: Object.fromEntries(
      Object.keys(HOTEL_CHAINS).map(chain => [chain, 0])
    ) as Record<keyof typeof HOTEL_CHAINS, number>
  };
}