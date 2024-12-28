import React, { useState } from 'react';
import { Board } from './components/Board';
import { PlayerInfo } from './components/PlayerInfo';
import { GameInfo } from './components/GameInfo';
import { LobbyScreen } from './components/lobby/LobbyScreen';
import { ChainSelector } from './components/ChainSelector';
import { SharePurchase } from './components/SharePurchase';
import { createInitialGameState } from './utils/gameStateUtils';
import { canPlaceTile, removeTileFromPlayer, drawNewTile } from './utils/tileUtils';
import { 
  shouldCreateNewChain, 
  extendExistingChain, 
  getAdjacentPlacedTiles,
  activateChain 
} from './utils/chainUtils';
import { getStockPrice } from './utils/priceUtils';
import type { GameState, Player } from './types/game';
import type { HOTEL_CHAINS } from './types/game';

export default function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [pendingTile, setPendingTile] = useState<{ x: number; y: number } | null>(null);
  const [canPurchaseShares, setCanPurchaseShares] = useState(false);

  const handleGameStart = (players: Player[]) => {
    setGameState(createInitialGameState(players));
  };

  const handleChainSelected = (chainId: keyof typeof HOTEL_CHAINS) => {
    if (!gameState || !pendingTile) return;

    // Create a new board state
    const newBoard = [...gameState.board];
    const newChains = { ...gameState.hotelChains };
    const chain = newChains[chainId];
    
    // Get adjacent placed tiles to include in the new chain
    const adjacentPlacedTiles = getAdjacentPlacedTiles(newBoard, pendingTile);
    
    // Activate the chain and include all relevant tiles
    activateChain(chain, pendingTile, adjacentPlacedTiles, newBoard);

    // Update the game state once with all changes
    setGameState(prevState => {
      if (!prevState) return null;
      return {
        ...prevState,
        board: newBoard,
        hotelChains: newChains
      };
    });

    setPendingTile(null);
    setCanPurchaseShares(true);
  };

  const handlePurchaseShares = (chainId: keyof typeof HOTEL_CHAINS, amount: number) => {
    setGameState(prevState => {
      if (!prevState) return null;

      const currentPlayer = prevState.players[prevState.currentPlayerIndex];
      console.log('handlePurchaseShares',[chainId,prevState.hotelChains])
      const chain = prevState.hotelChains[chainId]
      const chainPrize = getStockPrice(chainId,chain.size)
      const price = amount * chainPrize;

      console.log([chain,chain.size,chainPrize,price,amount])
      console.log('currentPlayer.money',[currentPlayer.money])

      const updatedPlayers = [...prevState.players];
      const updatedPlayer = {
        ...currentPlayer,
        money: currentPlayer.money - price,
        shares: {
          ...currentPlayer.shares,
          [chainId]: currentPlayer.shares[chainId] + amount
        }
      };
      updatedPlayers[prevState.currentPlayerIndex] = updatedPlayer;

      const updatedChains = {
        ...prevState.hotelChains,
        [chainId]: {
          ...chain,
          availableShares: chain.availableShares - amount
        }
      };

      return {
        ...prevState,
        players: updatedPlayers,
        hotelChains: updatedChains
      };
    });
  };

  const handlePurchaseComplete = () => {
    setCanPurchaseShares(false);
    setGameState(prevState => {
      if (!prevState) return null;
      return {
        ...prevState,
        currentPlayerIndex: (prevState.currentPlayerIndex + 1) % prevState.players.length
      };
    });
  };

  const handleTilePlaced = (x: number, y: number) => {
    if (!gameState) return;

    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    
    if (!canPlaceTile(gameState, { x, y }, currentPlayer.tiles)) {
      return;
    }

    setGameState(prevState => {
      if (!prevState) return null;

      const newBoard = prevState.board.map(row => [...row]);
      const updatedPlayers = [...prevState.players];
      const updatedPlayer = {
        ...currentPlayer,
        tiles: removeTileFromPlayer(currentPlayer.tiles, { x, y })
      };
      updatedPlayer.tiles.push(drawNewTile());
      updatedPlayers[prevState.currentPlayerIndex] = updatedPlayer;

      // Always mark the tile as placed first
      newBoard[y][x] = 'placed';

      // Check if we should create a new chain or extend existing ones
      if (shouldCreateNewChain(newBoard, { x, y })) {
        setPendingTile({ x, y });
        return {
          ...prevState,
          board: newBoard,
          players: updatedPlayers
        };
      } else {
        // Extend existing chain
        const newChains = { ...prevState.hotelChains };
        extendExistingChain(newBoard, { x, y }, newChains);
        
        setCanPurchaseShares(true);
        return {
          ...prevState,
          board: newBoard,
          players: updatedPlayers,
          hotelChains: newChains
        };
      }
    });
  };

  if (!gameState) {
    return <LobbyScreen onGameStart={handleGameStart} />;
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Acquire</h1>
        
        <div className="grid grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            <Board
              gameState={gameState}
              onTilePlaced={handleTilePlaced}
              currentPlayerTiles={currentPlayer.tiles}
            />
            <GameInfo hotelChains={gameState.hotelChains} />
          </div>
          
          <div className="space-y-4">
            {gameState.players.map((player, index) => (
              <PlayerInfo
                key={player.id}
                player={player}
                hotelChains={gameState.hotelChains}
                isCurrentPlayer={index === gameState.currentPlayerIndex}
              />
            ))}
          </div>
        </div>

        {pendingTile && (
          <ChainSelector
            chains={Object.keys(gameState.hotelChains).filter(
              id => !gameState.hotelChains[id as keyof typeof HOTEL_CHAINS].isActive
            ) as (keyof typeof HOTEL_CHAINS)[]}
            hotelChains={gameState.hotelChains}
            onSelect={handleChainSelected}
          />
        )}

        {canPurchaseShares && !pendingTile && (
          <SharePurchase
            player={currentPlayer}
            hotelChains={gameState.hotelChains}
            onPurchaseComplete={handlePurchaseComplete}
            onPurchaseShares={handlePurchaseShares}
          />
        )}
      </div>
    </div>
  );
}