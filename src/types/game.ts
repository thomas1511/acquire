export type Coordinates = {
  x: number; // A-L (0-11)
  y: number; // 1-12 (0-11)
};

export type HotelChain = {
  id: keyof typeof HOTEL_CHAINS;
  name: string;
  color: string;
  availableShares: number;
  size: number;
  isActive: boolean;
};

export const HOTEL_CHAINS = {
  WORLDWIDE: { name: 'Worldwide', color: '#A855F7' }, // Purple
  SACKSON: { name: 'Sackson', color: '#14B8A6' },    // Teal
  FESTIVAL: { name: 'Festival', color: '#22C55E' },   // Green
  IMPERIAL: { name: 'Imperial', color: '#3B82F6' },   // Blue
  AMERICAN: { name: 'American', color: '#EF4444' },   // Red
  CONTINENTAL: { name: 'Continental', color: '#F97316' }, // Orange
  TOWER: { name: 'Tower', color: '#EAB308' }         // Yellow
} as const;

export type Player = {
  id: string;
  name: string;
  money: number;
  tiles: Coordinates[];
  shares: Record<keyof typeof HOTEL_CHAINS, number>;
};

export type GameState = {
  players: Player[];
  currentPlayerIndex: number;
  board: (keyof typeof HOTEL_CHAINS | null)[][];
  hotelChains: Record<keyof typeof HOTEL_CHAINS, HotelChain>;
  availableTiles: Coordinates[];
  gamePhase: 'SETUP' | 'PLAYING' | 'MERGER' | 'GAME_END';
  winner?: Player;
};