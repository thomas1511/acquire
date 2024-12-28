import { HOTEL_CHAINS } from '../types/game';
import { generateRandomTiles } from './gameUtils';
import type { GameState, Player } from '../types/game';

export function createInitialGameState(players: Player[]): GameState {
  return {
    players: players.map(player => ({
      ...player,
      tiles: generateRandomTiles(6)
    })),
    currentPlayerIndex: 0,
    board: Array(12).fill(null).map(() => Array(12).fill(null)),
    hotelChains: Object.fromEntries(
      Object.entries(HOTEL_CHAINS).map(([id, chain]) => [
        id,
        {
          id: id as keyof typeof HOTEL_CHAINS,
          name: chain.name,
          color: chain.color,
          availableShares: 25,
          size: 0,
          isActive: false,
        },
      ])
    ) as Record<keyof typeof HOTEL_CHAINS, any>,
    availableTiles: [],
    gamePhase: 'PLAYING'
  };
}