import type { Coordinates, GameState } from '../types/game';

export function canPlaceTile(
  gameState: GameState,
  coordinates: Coordinates,
  playerTiles: Coordinates[]
): boolean {
  // Check if the coordinates match any of the player's tiles
  return playerTiles.some(
    tile => tile.x === coordinates.x && tile.y === coordinates.y
  );
}

export function removeTileFromPlayer(
  playerTiles: Coordinates[],
  coordinates: Coordinates
): Coordinates[] {
  return playerTiles.filter(
    tile => tile.x !== coordinates.x || tile.y !== coordinates.y
  );
}

export function drawNewTile(): Coordinates {
  return {
    x: Math.floor(Math.random() * 12),
    y: Math.floor(Math.random() * 12)
  };
}