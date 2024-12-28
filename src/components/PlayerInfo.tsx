import React from 'react';
import { Building2 } from 'lucide-react';
import type { Player, HotelChain } from '../types/game';

type PlayerInfoProps = {
  player: Player;
  hotelChains: Record<string, HotelChain>;
  isCurrentPlayer: boolean;
};

export function PlayerInfo({ player, hotelChains, isCurrentPlayer }: PlayerInfoProps) {
  return (
    <div className={`
      p-4 rounded-lg shadow-md
      ${isCurrentPlayer ? 'bg-blue-50 border-2 border-blue-200' : 'bg-white'}
    `}>
      <div className="flex items-center gap-2 mb-3">
        <Building2 className="w-5 h-5" />
        <h3 className="font-semibold">{player.name}</h3>
        {isCurrentPlayer && (
          <span className="text-sm bg-blue-500 text-white px-2 py-0.5 rounded">
            Current Turn
          </span>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Cash:</span>
          <span className="font-mono">${player.money.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tiles:</span>
          <span>{player.tiles.length}</span>
        </div>
        
        <div className="mt-2">
          <span className="text-gray-600">Shares:</span>
          <div className="grid grid-cols-2 gap-1 mt-1">
            {Object.entries(player.shares).map(([chainId, count]) => {
              const chain = hotelChains[chainId];
              if (count === 0) return null;
              
              return (
                <div 
                  key={chainId}
                  className="flex items-center gap-1 text-sm"
                  style={{ color: chain.color }}
                >
                  <span className="font-semibold">{chain.name}:</span>
                  <span>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}