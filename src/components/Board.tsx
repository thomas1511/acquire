import React from 'react';
import { HOTEL_CHAINS } from '../types/game';
import type { GameState, Coordinates } from '../types/game';

type BoardProps = {
  gameState: GameState;
  onTilePlaced: (x: number, y: number) => void;
  currentPlayerTiles: Coordinates[];
};

const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

export function Board({ gameState, onTilePlaced, currentPlayerTiles }: BoardProps) {
  const isValidMove = (x: number, y: number) => {
    return currentPlayerTiles.some(tile => tile.x === x && tile.y === y) && 
           gameState.board[y][x] === null;
  };

  const getCellContent = (cell: string | null, validMove: boolean) => {
    if (validMove) {
      return <div className="w-full h-full rounded border-2 border-dashed border-blue-400" />;
    }
    if (cell === 'placed') {
      return <div className="w-full h-full rounded bg-gray-400" />;
    }
    if (cell && cell !== 'placed') {
      const chain = HOTEL_CHAINS[cell as keyof typeof HOTEL_CHAINS];
      return (
        <div className="w-full h-full flex items-center justify-center text-sm font-bold text-white">
          {chain.name[0]}
        </div>
      );
    }
    return null;
  };

  const getCellStyle = (cell: string | null, validMove: boolean) => {
    if (cell && cell !== 'placed') {
      const chain = HOTEL_CHAINS[cell as keyof typeof HOTEL_CHAINS];
      return { backgroundColor: chain.color };
    }
    if (cell === 'placed') {
      return { backgroundColor: '#9CA3AF' }; // gray-400
    }
    return { backgroundColor: validMove ? '#FFFFFF' : '#FFFFFF' };
  };

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg">
      <div className="grid grid-cols-[auto_repeat(12,minmax(2.5rem,1fr))] gap-px bg-gray-200">
        {/* Column Headers */}
        <div className="bg-gray-100 p-2"></div>
        {COLUMNS.map((col) => (
          <div key={col} className="bg-gray-100 p-2 text-center font-semibold">
            {col}
          </div>
        ))}
        
        {/* Board Rows */}
        {gameState.board.map((row, y) => (
          <React.Fragment key={y}>
            {/* Row Header */}
            <div className="bg-gray-100 p-2 text-center font-semibold">
              {y + 1}
            </div>
            
            {/* Row Cells */}
            {row.map((cell, x) => {
              const validMove = isValidMove(x, y);
              
              return (
                <button
                  key={`${x}-${y}`}
                  onClick={() => validMove && onTilePlaced(x, y)}
                  disabled={!validMove}
                  style={getCellStyle(cell, validMove)}
                  className={`
                    aspect-square p-1 transition-colors
                    ${validMove ? 'hover:bg-blue-100 cursor-pointer' : 'cursor-not-allowed'}
                  `}
                >
                  {getCellContent(cell, validMove)}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}