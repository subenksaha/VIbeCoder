import React from 'react';
import { Crown, Trophy, Medal, Star } from 'lucide-react';
import { LeaderboardEntry } from '../types';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries, currentUserId }) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Trophy className="w-6 h-6 text-gray-400" />;
      case 3: return <Medal className="w-6 h-6 text-orange-500" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-400';
      case 3: return 'bg-gradient-to-r from-orange-400 to-orange-500';
      default: return 'bg-white';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🏆 Leaderboard</h1>
          <p className="text-gray-600 text-lg">See how you stack up against other coders!</p>
        </div>

        {/* Top 3 Podium */}
        {entries.length >= 3 && (
          <div className="flex justify-center items-end mb-12 gap-4">
            {/* Second Place */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center mb-3 mx-auto">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-lg w-32">
                <h3 className="font-semibold text-gray-900 truncate">{entries[1].user.name}</h3>
                <p className="text-sm text-gray-600">Level {entries[1].level}</p>
                <p className="text-lg font-bold text-gray-900">{entries[1].xp.toLocaleString()} XP</p>
              </div>
            </div>

            {/* First Place */}
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mb-3 mx-auto relative">
                <Crown className="w-8 h-8 text-white" />
                <div className="absolute -top-2 -right-2">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-xl w-36 border-2 border-yellow-400">
                <h3 className="font-semibold text-gray-900 truncate">{entries[0].user.name}</h3>
                <p className="text-sm text-yellow-600">Level {entries[0].level}</p>
                <p className="text-xl font-bold text-gray-900">{entries[0].xp.toLocaleString()} XP</p>
              </div>
            </div>

            {/* Third Place */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mb-3 mx-auto">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-lg w-32">
                <h3 className="font-semibold text-gray-900 truncate">{entries[2].user.name}</h3>
                <p className="text-sm text-gray-600">Level {entries[2].level}</p>
                <p className="text-lg font-bold text-gray-900">{entries[2].xp.toLocaleString()} XP</p>
              </div>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
            <h2 className="text-2xl font-bold text-white text-center">Global Rankings</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {entries.map((entry) => (
              <div 
                key={entry.user.id}
                className={`p-6 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                  entry.user.id === currentUserId ? 'bg-purple-50 border-l-4 border-purple-500' : ''
                } ${getRankBg(entry.rank) !== 'bg-white' ? getRankBg(entry.rank) + ' text-white' : ''}`}
              >
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <div className="flex items-center justify-center w-12">
                    {getRankIcon(entry.rank)}
                  </div>
                  
                  {/* User Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {entry.user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  
                  {/* User Info */}
                  <div>
                    <h3 className={`font-semibold ${getRankBg(entry.rank) !== 'bg-white' ? 'text-white' : 'text-gray-900'}`}>
                      {entry.user.name}
                      {entry.user.id === currentUserId && <span className="ml-2 text-sm">(You)</span>}
                    </h3>
                    <p className={`text-sm ${getRankBg(entry.rank) !== 'bg-white' ? 'text-white opacity-90' : 'text-gray-600'}`}>
                      Level {entry.level} • {entry.user.completedLessons.length} lessons completed
                    </p>
                  </div>
                </div>
                
                {/* XP */}
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className={`w-5 h-5 ${getRankBg(entry.rank) !== 'bg-white' ? 'text-white' : 'text-yellow-500'}`} />
                    <span className={`text-lg font-bold ${getRankBg(entry.rank) !== 'bg-white' ? 'text-white' : 'text-gray-900'}`}>
                      {entry.xp.toLocaleString()}
                    </span>
                  </div>
                  <p className={`text-sm ${getRankBg(entry.rank) !== 'bg-white' ? 'text-white opacity-90' : 'text-gray-600'}`}>
                    XP
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};