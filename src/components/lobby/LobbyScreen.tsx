import React, { useState } from 'react';
import { Users, Copy, Check } from 'lucide-react';
import { PlayerSetup } from './PlayerSetup';
import { createNewPlayer } from '../../utils/playerUtils';
import type { Player } from '../../types/game';

type LobbyScreenProps = {
  onGameStart: (players: Player[]) => void;
};

export function LobbyScreen({ onGameStart }: LobbyScreenProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [copied, setCopied] = useState(false);
  const gameCode = 'GAME123'; // In a real app, this would be generated

  const handleAddPlayer = (name: string) => {
    const newPlayer = createNewPlayer(name);
    setPlayers([...players, newPlayer]);
  };

  const handleStartGame = () => {
    if (players.length >= 2) {
      onGameStart(players);
    }
  };

  const copyGameCode = () => {
    navigator.clipboard.writeText(gameCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-6 h-6 text-blue-500" />
          <h1 className="text-2xl font-bold">Game Lobby</h1>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-mono text-lg">{gameCode}</span>
            <button
              onClick={copyGameCode}
              className="text-blue-500 hover:text-blue-600"
              title="Copy game code"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Share this code with other players to join
          </p>
        </div>

        <PlayerSetup onAddPlayer={handleAddPlayer} />

        <div className="space-y-2 mt-6">
          <h2 className="font-semibold">Players ({players.length}/6):</h2>
          {players.map(player => (
            <div key={player.id} className="p-2 bg-gray-50 rounded">
              {player.name}
            </div>
          ))}
        </div>

        <button
          onClick={handleStartGame}
          disabled={players.length < 2}
          className={`
            w-full mt-6 py-2 px-4 rounded-lg font-medium
            ${players.length >= 2
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          Start Game ({players.length < 2 ? `Need ${2 - players.length} more` : 'Ready'})
        </button>
      </div>
    </div>
  );
}