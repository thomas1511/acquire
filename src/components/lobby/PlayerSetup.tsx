import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';

type PlayerSetupProps = {
  onAddPlayer: (name: string) => void;
};

export function PlayerSetup({ onAddPlayer }: PlayerSetupProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddPlayer(name.trim());
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Player Name
        </label>
        <div className="mt-1 flex gap-2">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter name"
            maxLength={20}
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg
              ${name.trim()
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            <UserPlus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </form>
  );
}