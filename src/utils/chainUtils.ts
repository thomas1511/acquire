import type { Coordinates, GameState, HotelChain } from '../types/game';
import { HOTEL_CHAINS } from '../types/game';

export function getAdjacentTiles(board: (string | null)[][], coord: Coordinates): Coordinates[] {
  const { x, y } = coord;
  const adjacent: Coordinates[] = [];
  
  // Check all 4 directions
  if (y > 0) adjacent.push({ x, y: y - 1 }); // up
  if (y < 11) adjacent.push({ x, y: y + 1 }); // down
  if (x > 0) adjacent.push({ x: x - 1, y }); // left
  if (x < 11) adjacent.push({ x: x + 1, y }); // right
  
  return adjacent;
}

export function getAdjacentPlacedTiles(board: (string | null)[][], coord: Coordinates): Coordinates[] {
  console.log('getAdjacentTiles',[board,getAdjacentTiles(board, coord)]);
  return getAdjacentTiles(board, coord)
    .filter(pos => board[pos.y][pos.x] === 'placed');
}

export function getAdjacentCells(board: (string | null)[][], coord: Coordinates): (string | null)[] {
  return getAdjacentTiles(board, coord)
    .map(pos => board[pos.y][pos.x]);
}

export function getAdjacentChains(board: (string | null)[][], coord: Coordinates): Set<string> {
  const chains = new Set<string>();
  
  getAdjacentCells(board, coord).forEach(cell => {
    if (cell && cell !== 'placed') {
      chains.add(cell);
    }
  });
  
  return chains;
}

export function countAdjacentPlacedTiles(board: (string | null)[][], coord: Coordinates): number {
  return getAdjacentCells(board, coord)
    .filter(cell => cell === 'placed')
    .length;
}

export function shouldCreateNewChain(board: (string | null)[][], coord: Coordinates): boolean {
  const adjacentPlacedTiles = countAdjacentPlacedTiles(board, coord);
  const adjacentChains = getAdjacentChains(board, coord);
  
  // Create a new chain if:
  // 1. There's at least one adjacent placed tile (connecting two or more tiles)
  // 2. There are no adjacent existing chains
  return adjacentPlacedTiles >= 1 && adjacentChains.size === 0;
}

export function activateChain(
  chain: HotelChain,
  mainTile: Coordinates,
  adjacentTiles: Coordinates[],
  board: (string | null)[][]
): void {
  chain.isActive = true;
  
  // Set the main tile and count it
  board[mainTile.y][mainTile.x] = chain.id;
  let totalTiles = 1;
    console.log('adjacentTiles',adjacentTiles.length)
  // Set all adjacent placed tiles to the chain and count them
  adjacentTiles.forEach(tile => {
    board[tile.y][tile.x] = chain.id;
   
    totalTiles++;
     console.log('add tile count',totalTiles)
  });
   console.log('total tiles',totalTiles)
  // Set the size to the total number of tiles
  chain.size = totalTiles;
}




export function extendExistingChain(
  board: (string | null)[][],
  coord: Coordinates,
  chains: Record<keyof typeof HOTEL_CHAINS, HotelChain>
): void {
  const adjacentChains = getAdjacentChains(board, coord);
  if (adjacentChains.size === 1) {
    const chainId = adjacentChains.values().next().value as keyof typeof HOTEL_CHAINS;
    const chain = chains[chainId];
    chain.size += 1;
    board[coord.y][coord.x] = chainId;
    
    // Also convert any adjacent placed tiles to this chain
    const adjacentPlacedTiles = getAdjacentPlacedTiles(board, coord);
    adjacentPlacedTiles.forEach(tile => {
      board[tile.y][tile.x] = chainId;
      chain.size += 1;
    });
  }
}

export function findAvailableChains(gameState: GameState): (keyof typeof HOTEL_CHAINS)[] {
  return Object.entries(gameState.hotelChains)
    .filter(([_, chain]) => !chain.isActive)
    .map(([id]) => id as keyof typeof HOTEL_CHAINS);
}

export function getActiveChains(hotelChains: Record<string, HotelChain>): [string, HotelChain][] {
  return Object.entries(hotelChains).filter(([_, chain]) => 
    chain.isActive && chain.availableShares > 0
  );
}