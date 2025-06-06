import React, { useState } from 'react';
import { Lightbulb, Copy, ThumbsUp, MessageSquare } from 'lucide-react';

interface PromptSuggestion {
  id: string;
  title: string;
  prompt: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

interface PromptSuggestionsProps {
  suggestions: PromptSuggestion[];
  onPromptSelect?: (prompt: string) => void;
}

export const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({
  suggestions,
  onPromptSelect
}) => {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handlePromptClick = (prompt: string) => {
    setSelectedPrompt(prompt);
    onPromptSelect?.(prompt);
  };

  const handleCopyPrompt = (prompt: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Lightbulb className="w-6 h-6 text-yellow-500" />
        <h3 className="text-xl font-bold text-gray-900">AI Prompt Suggestions</h3>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
              selectedPrompt === suggestion.prompt
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handlePromptClick(suggestion.prompt)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-gray-900">{suggestion.title}</h4>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(suggestion.difficulty)}`}>
                  {suggestion.difficulty}
                </span>
              </div>
              <button
                onClick={(e) => handleCopyPrompt(suggestion.prompt, e)}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                title="Copy prompt"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              {suggestion.prompt}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {suggestion.category}
              </span>
              
              {/* <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 text-gray-400 hover:text-green-600 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-xs">Helpful</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-600 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs">Discuss</span>
                </button>
              </div> */}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">💡</span>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Pro Tip</h4>
            <p className="text-blue-800 text-sm">
              Start with specific prompts and gradually make them more detailed. 
              Include context about what you're trying to achieve for better AI responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};