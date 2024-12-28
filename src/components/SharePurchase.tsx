import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import type { HotelChain, Player } from '../types/game';
import { HOTEL_CHAINS } from '../types/game';
import { getActiveChains } from '../utils/chainUtils';
import { getStockPrice } from '../utils/priceUtils';

type SharePurchaseProps = {
  player: Player;
  hotelChains: Record<string, HotelChain>;
  onPurchaseComplete: () => void;
  onPurchaseShares: (chainId: keyof typeof HOTEL_CHAINS, amount: number) => void;
};

export function SharePurchase({ player, hotelChains, onPurchaseComplete, onPurchaseShares }: SharePurchaseProps) {
  const [selectedChain, setSelectedChain] = useState<keyof typeof HOTEL_CHAINS | null>(null);
  const [shareAmount, setShareAmount] = useState(1);
  const [purchaseCount, setPurchaseCount] = useState(0);

  useEffect(() => {
    setSelectedChain(null);
    setShareAmount(1);
  }, [hotelChains]);

  const activeChains = getActiveChains(hotelChains);
  const selectedChainData = selectedChain ? hotelChains[selectedChain] : null;
  const stockPrice = selectedChainData ? getStockPrice(selectedChain, selectedChainData.size) : 0;
  const totalCost = stockPrice * shareAmount;
  const canAfford = player.money >= totalCost;
  const canPurchase = selectedChain && canAfford && purchaseCount < 3;

  const handlePurchase = () => {
    if (!selectedChain || !canPurchase) return;
    
    onPurchaseShares(selectedChain, shareAmount);
    setPurchaseCount(prev => prev + 1);
    setSelectedChain(null);
    setShareAmount(1);

    if (purchaseCount + 1 >= 3) {
      onPurchaseComplete();
    }
  };

  const handleSkip = () => {
    onPurchaseComplete();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-bold">Purchase Shares</h2>
        </div>

        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="font-medium">Your Cash: ${player.money}</div>
          <div className="text-sm text-gray-600">Purchases remaining: {3 - purchaseCount}</div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Hotel Chain
            </label>
            <select
              value={selectedChain || ''}
              onChange={(e) => setSelectedChain(e.target.value as keyof typeof HOTEL_CHAINS)}
              className="w-full rounded-lg border-gray-300 shadow-sm"
            >
              <option value="">Choose a chain...</option>
              {activeChains.map(([id, chain]) => (
                <option key={id} value={id}>
                  {chain.name} - ${getStockPrice(id as keyof typeof HOTEL_CHAINS, chain.size)} per share ({chain.availableShares} available)
                </option>
              ))}
            </select>
          </div>

          {selectedChain && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Shares
              </label>
              <select
                value={shareAmount}
                onChange={(e) => setShareAmount(Number(e.target.value))}
                className="w-full rounded-lg border-gray-300 shadow-sm"
              >
                <option value={1}>1 share</option>
                <option value={2}>2 shares</option>
                <option value={3}>3 shares</option>
              </select>
            </div>
          )}

          {selectedChain && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between text-sm">
                <span>Price per share:</span>
                <span>${stockPrice}</span>
              </div>
              <div className="flex justify-between font-medium mt-1">
                <span>Total cost:</span>
                <span>${totalCost}</span>
              </div>
              {!canAfford && (
                <div className="text-red-500 text-sm mt-1">
                  Insufficient funds
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handlePurchase}
              disabled={!canPurchase}
              className={`
                flex-1 py-2 px-4 rounded-lg font-medium
                ${canPurchase
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              Purchase
            </button>
            <button
              onClick={handleSkip}
              className="flex-1 py-2 px-4 rounded-lg font-medium border border-gray-300 hover:bg-gray-50"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}