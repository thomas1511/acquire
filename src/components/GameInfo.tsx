import React from 'react';
import { TrendingUp } from 'lucide-react';
import type { HotelChain } from '../types/game';
import { getStockPrice, getMajorityBonus } from '../utils/priceUtils';

type GameInfoProps = {
  hotelChains: Record<string, HotelChain>;
};

export function GameInfo({ hotelChains }: GameInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5" />
        <h2 className="font-semibold">Hotel Chains</h2>
      </div>
      
      <div className="space-y-3">
        {Object.values(hotelChains).map((chain) => (
          <div 
            key={chain.id}
            className="flex items-center justify-between p-2 rounded"
            style={{ backgroundColor: `${chain.color}15` }}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: chain.color }}
              />
              <span className="font-medium">{chain.name}</span>
            </div>
            
            <div className="flex gap-4 text-sm">
              <div>
                <span className="text-gray-600">Size:</span>
                <span className="ml-1 font-mono">{chain.size}</span>
              </div>
              
              <div>
                <span className="text-gray-600">Stock:</span>
                <span className="ml-1 font-mono">
                  ${chain.isActive ? getStockPrice(chain.id, chain.size) : 0}
                </span>
              </div>
              
              <div>
                <span className="text-gray-600">Shares:</span>
                <span className="ml-1 font-mono">
                  {chain.availableShares}
                </span>
              </div>
              
              {chain.isActive && chain.size >= 2 && (
                <div>
                  <span className="text-gray-600">Bonus:</span>
                  <span className="ml-1 font-mono">
                    ${getMajorityBonus(chain.id, chain.size)}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}