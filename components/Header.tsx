import React from 'react';
import { User, Trophy, Settings, LogOut } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  user?: UserType;
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ user, currentView, onViewChange }) => {
  const getXPProgress = () => {
    if (!user) return 0;
    const xpForCurrentLevel = user.level * 1000;
    const xpForNextLevel = (user.level + 1) * 1000;
    const currentLevelXP = user.totalXP - xpForCurrentLevel;
    const neededForNext = xpForNextLevel - xpForCurrentLevel;
    return (currentLevelXP / neededForNext) * 100;
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AC</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Code Academy
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {['home', 'courses', 'dashboard', 'lab', 'leaderboard'].map((view) => (
              <button
                key={view}
                onClick={() => onViewChange(view)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentView === view
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                VibeTeacher
              </button>
            ))}
          </nav>

          {/* User Section */}
          {user ? (
            <div className="flex items-center space-x-4">
              {/* XP and Level */}
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">Level {user.level}</div>
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
                      style={{ width: `${getXPProgress()}%` }}
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-600">{user.xp} XP</div>
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Sign In
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};