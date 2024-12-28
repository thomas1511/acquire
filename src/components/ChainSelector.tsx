import React from 'react';
import type { HOTEL_CHAINS, HotelChain } from '../types/game';

type ChainSelectorProps = {
  chains: (keyof typeof HOTEL_CHAINS)[];
  hotelChains: Record<keyof typeof HOTEL_CHAINS, HotelChain>;
  onSelect: (chainId: keyof typeof HOTEL_CHAINS) => void;
};

export function ChainSelector({ chains, hotelChains, onSelect }: ChainSelectorProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Select Hotel Chain to Create</h2>
        <div className="grid grid-cols-2 gap-3">
          {chains.map(chainId => {
            const chain = hotelChains[chainId];
            return (
              <button
                key={chainId}
                onClick={() => onSelect(chainId)}
                className="p-3 rounded-lg text-white font-medium transition-colors"
                style={{ backgroundColor: chain.color }}
              >
                {chain.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}