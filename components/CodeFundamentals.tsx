import React, { useState } from 'react';
import { Book, ChevronDown, ChevronRight, Code, Zap, Target } from 'lucide-react';

interface Fundamental {
  id: string;
  title: string;
  description: string;
  content: string;
  codeExample?: string;
  keyPoints: string[];
}

interface CodeFundamentalsProps {
  fundamentals: Fundamental[];
  currentTopic?: string;
}

export const CodeFundamentals: React.FC<CodeFundamentalsProps> = ({
  fundamentals,
  currentTopic
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set([currentTopic || fundamentals[0]?.id]));

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Book className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-bold text-gray-900">Code Fundamentals</h3>
      </div>

      <div className="space-y-4">
        {fundamentals.map((fundamental) => {
          const isExpanded = expandedSections.has(fundamental.id);
          const isCurrent = currentTopic === fundamental.id;
          
          return (
            <div
              key={fundamental.id}
              className={`border rounded-lg transition-all ${
                isCurrent ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <button
                onClick={() => toggleSection(fundamental.id)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                  <h4 className={`font-semibold ${isCurrent ? 'text-blue-900' : 'text-gray-900'}`}>
                    {fundamental.title}
                  </h4>
                </div>
                {isCurrent && (
                  <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                    Current
                  </span>
                )}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-200">
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {fundamental.description}
                  </p>

                  <div className="mb-4">
                    <p className="text-gray-800 leading-relaxed">
                      {fundamental.content}
                    </p>
                  </div>

                  {/* Key Points */}
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                      <Target className="w-4 h-4 text-green-500" />
                      <span>Key Points</span>
                    </h5>
                    <ul className="space-y-2">
                      {fundamental.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Code Example */}
                  {fundamental.codeExample && (
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                        <Code className="w-4 h-4 text-purple-500" />
                        <span>Example</span>
                      </h5>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-gray-100 font-mono text-sm">
                          <code>{fundamental.codeExample}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Reference */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
        <div className="flex items-start space-x-3">
          <Zap className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-purple-900 mb-2">Quick Reference</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="text-purple-800">
                <strong>Variables:</strong> Store data values
              </div>
              <div className="text-purple-800">
                <strong>Functions:</strong> Reusable code blocks
              </div>
              <div className="text-purple-800">
                <strong>Loops:</strong> Repeat code execution
              </div>
              <div className="text-purple-800">
                <strong>Conditions:</strong> Make decisions in code
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};