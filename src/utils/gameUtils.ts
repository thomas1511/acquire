import type { Coordinates } from '../types/game';

// Generate random unique coordinates for initial tiles
export function generateRandomTiles(count: number): Coordinates[] {
  const tiles: Coordinates[] = [];
  const used = new Set<string>();

  while (tiles.length < count) {
    const x = Math.floor(Math.random() * 12);
    const y = Math.floor(Math.random() * 12);
    const key = `${x},${y}`;

    if (!used.has(key)) {
      used.add(key);
      tiles.push({ x, y });
    }
  }

  return tiles;
}

// Convert coordinate to board notation (e.g., 0,0 -> "A1")
export function coordToNotation({ x, y }: Coordinates): string {
  const col = String.fromCharCode(65 + x);
  return `${col}${y + 1}`;
}

// Convert board notation to coordinate (e.g., "A1" -> 0,0)
export function notationToCoord(notation: string): Coordinates {
  const x = notation.charCodeAt(0) - 65;
  const y = parseInt(notation.slice(1)) - 1;
  return { x, y };
}