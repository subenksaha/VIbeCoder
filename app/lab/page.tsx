'use client'
import React, { useEffect, useRef, useState } from 'react';
import { 
  Code, 
  BookOpen, 
  Settings, 
  Maximize2, 
  Save,
  Share2,
} from 'lucide-react';
import { PromptSuggestions } from '../../components/PromptSuggestions';
import { CodeFundamentals } from '../../components/CodeFundamentals'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Quiz } from '@/components/Quiz';
import { marked } from 'marked';

// Mock data for the learning lab
const mockPromptSuggestions = [
  {
    id: '1',
    title: 'Explain the logic and fix my incomplete code',
    prompt: 'I’m trying to solve the problem “Two Sum”. I want to use a nested loop to compare each pair of numbers in the list. Can you explain what this code does and help me complete it?',
    difficulty: 'beginner' as const,
    category: 'Functions'
  },
  {
    id: '2',
    title: 'Find the bug and complete the logic',
    prompt: 'This is my current solution for finding two numbers in a list that add up to a target. Can you find what’s missing or wrong and fix it?',
    difficulty: 'intermediate' as const,
    category: 'Data Structures'
  },
  {
    id: '3',
    title: 'Help me convert brute-force logic to hash map version',
    prompt: 'I understand the brute-force solution to the Two Sum problem using two for-loops. Can you help me write a faster version using a hash map or dictionary?',
    difficulty: 'advanced' as const,
    category: 'APIs'
  },
  {
    id: '4',
    title: 'I understand the brute-force solution to the Two Sum problem using two for-loops. Can you help me write a faster version using a hash map or dictionary?',
    prompt: "I'm trying to understand how to approach the Two Sum problem from scratch. I want to understand the reasoning step by step, not just get the answer. Can you walk me through the problem-solving thought process?",
    difficulty: 'intermediate' as const,
    category: 'File I/O'
  }
];

const mockFundamentals = [
  {
    id: 'variables',
    title: 'Variables and Data Types',
    description: 'Learn how to store and manipulate data in Python',
    content: 'Variables are containers for storing data values. Python has various data types including strings, integers, floats, and booleans.',
    codeExample: `# Variable examples
name = "Alice"        # String
age = 25             # Integer
height = 5.6         # Float
is_student = True    # Boolean

print(f"Name: {name}, Age: {age}")`,
    keyPoints: [
      'Variables store data values',
      'Python is dynamically typed',
      'Use descriptive variable names',
      'Different data types serve different purposes'
    ]
  },
  {
    id: 'functions',
    title: 'Functions',
    description: 'Create reusable blocks of code with functions',
    content: 'Functions are reusable blocks of code that perform specific tasks. They help organize code and avoid repetition.',
    codeExample: `def greet(name):
    """Return a greeting message"""
    return f"Hello, {name}!"

# Call the function
message = greet("Alice")
print(message)`,
    keyPoints: [
      'Functions make code reusable',
      'Use def keyword to define functions',
      'Functions can take parameters',
      'Return values using return statement'
    ]
  },
  {
    id: 'loops',
    title: 'Loops and Iteration',
    description: 'Repeat code execution with loops',
    content: 'Loops allow you to execute code repeatedly. Python has for loops and while loops for different scenarios.',
    codeExample: `# For loop example
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(f"I like {fruit}")

# While loop example
count = 0
while count < 3:
    print(f"Count: {count}")
    count += 1`,
    keyPoints: [
      'For loops iterate over sequences',
      'While loops continue until condition is false',
      'Use break to exit loops early',
      'Use continue to skip iterations'
    ]
  },
  {
    id: 'conditionals',
    title: 'Conditional Statements',
    description: 'Make decisions in your code with if/else statements',
    content: 'Conditional statements allow your program to make decisions based on different conditions.',
    codeExample: `age = 18

if age >= 18:
    print("You are an adult")
elif age >= 13:
    print("You are a teenager")
else:
    print("You are a child")`,
    keyPoints: [
      'if statements check conditions',
      'elif provides additional conditions',
      'else handles remaining cases',
      'Use comparison operators (==, !=, <, >, etc.)'
    ]
  }
];

const mockQuizQuestions = [
  {
    id: '1',
    question: 'What is the correct way to define a function in Python?',
    options: [
      'function myFunction():',
      'def myFunction():',
      'create myFunction():',
      'func myFunction():'
    ],
    correctAnswer: 1,
    explanation: 'In Python, functions are defined using the "def" keyword followed by the function name and parentheses.',
    difficulty: 'easy' as const,
    category: 'Functions'
  },
  {
    id: '2',
    question: 'Which data type is used to store a sequence of characters in Python?',
    options: [
      'int',
      'float',
      'str',
      'bool'
    ],
    correctAnswer: 2,
    explanation: 'The "str" (string) data type is used to store sequences of characters in Python.',
    difficulty: 'easy' as const,
    category: 'Data Types'
  },
  {
    id: '3',
    question: 'What will be the output of: print(len("Hello"))?',
    options: [
      '4',
      '5',
      '6',
      'Error'
    ],
    correctAnswer: 1,
    explanation: 'The len() function returns the number of characters in a string. "Hello" has 5 characters.',
    difficulty: 'easy' as const,
    category: 'Built-in Functions'
  },
  {
    id: '4',
    question: 'Which loop is best for iterating over a list in Python?',
    options: [
      'while loop',
      'for loop',
      'do-while loop',
      'repeat loop'
    ],
    correctAnswer: 1,
    explanation: 'For loops are the most Pythonic way to iterate over sequences like lists, as they are more readable and concise.',
    difficulty: 'medium' as const,
    category: 'Loops'
  },
  {
    id: '5',
    question: 'What is the purpose of the return statement in a function?',
    options: [
      'To print a value',
      'To end the program',
      'To send a value back to the caller',
      'To create a variable'
    ],
    correctAnswer: 2,
    explanation: 'The return statement is used to send a value back to the code that called the function.',
    difficulty: 'medium' as const,
    category: 'Functions'
  }
];


export const LearningLab: React.FC = () => {
    const [content, setContent] = useState(
  `
from typing import List
class Solution:
  def twoSum(self, nums: List[int], target: int) -> List[int]:
      for i in range(len(nums)):
          continue;
      # Return an empty list if no solution is found
      return []
      `)
  const [layout, setLayout] = useState<'split' | 'editor-focus' | 'reference-focus'>('split');
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');
  const [currentTopic, setCurrentTopic] = useState('');
  const editor = useRef<HTMLIFrameElement>(null);
  const [suggestions, setSuggestions] = useState('');

  const handlePromptSelect = (prompt: string, code: string) => {
    setSelectedPrompt(prompt);
    getAISuggestion(prompt, code);
  };

  const handleSaveCode = () => {
    // In a real app, this would save to user's account
    alert('Code saved to your workspace!');
  };

  const handleShareCode = () => {
    // In a real app, this would create a shareable link
    navigator.clipboard.writeText(content);
    alert('Code copied to clipboard!');
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'editor-focus':
        return 'grid-cols-1 lg:grid-cols-4';
      case 'reference-focus':
        return 'grid-cols-1 lg:grid-cols-3';
      default:
        return 'grid-cols-1 lg:grid-cols-2';
    }
  };

  const getEditorColSpan = () => {
    switch (layout) {
      case 'editor-focus':
        return 'lg:col-span-3';
      case 'reference-focus':
        return 'lg:col-span-1';
      default:
        return 'lg:col-span-1';
    }
  };

  const getReferenceColSpan = () => {
    switch (layout) {
      case 'editor-focus':
        return 'lg:col-span-1';
      case 'reference-focus':
        return 'lg:col-span-2';
      default:
        return 'lg:col-span-1';
    }
  };
  const handleQuizComplete = (score: number, totalQuestions: number) => {
    // In a real app, this would save the quiz results
    console.log(`Quiz completed: ${score}/${totalQuestions}`);
  };

  const handleCodeChange = (event: any) => {
    if (event.data && event.data.language){
      setContent(event.data.files[0].content);
    }
    
  }
  const getAISuggestion = async (prompt: string, code: string) => {
    const resp = await fetch('/api/lab', {
      method: 'POST',
      body: JSON.stringify({ code, prompt }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setSuggestions((await resp.json())?.result);
  }

  useEffect(() => {
    editor.current?.contentWindow?.postMessage({
     eventType: 'populateCode',
     language: 'python',
     files: [
        {
          "name": "main.py",
          "content": content
        }
      ]
      }, "*");
  },[content])
  
  useEffect(() => {
    window.addEventListener('message', handleCodeChange);
    return () => {
      window.removeEventListener('message', handleCodeChange);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Code className="w-8 h-8 text-purple-600" />
                <h1 className="text-2xl font-bold text-gray-900">VibeTeacher</h1>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-gray-600">Language:</span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Layout Controls */}
              <div className="hidden md:flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setLayout('split')}
                  className={`p-2 rounded-md transition-colors ${
                    layout === 'split' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                  title="Split View"
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-gray-600 rounded-sm"></div>
                    <div className="bg-gray-600 rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setLayout('editor-focus')}
                  className={`p-2 rounded-md transition-colors ${
                    layout === 'editor-focus' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                  title="Editor Focus"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLayout('reference-focus')}
                  className={`p-2 rounded-md transition-colors ${
                    layout === 'reference-focus' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                  title="Reference Focus"
                >
                  <BookOpen className="w-4 h-4" />
                </button>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleSaveCode}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Save Code"
              >
                <Save className="w-5 h-5" />
              </button>
              <button
                onClick={handleShareCode}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Share Code"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className={`grid gap-6 ${getLayoutClasses()}`}>
          {/* Code Editor Section */}
          <div className={`space-y-6 ${getEditorColSpan()}`}>
            {/* Problem Statement */}
            <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">5. Longest Palindromic Substring</CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Medium</Badge>
                <Badge variant="secondary">Topics</Badge>
                <Badge variant="outline" className="bg-orange-100 text-orange-800">Companies</Badge>
                <Badge variant="outline" className="bg-gray-100 text-gray-800">💡 Hint</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Given a string <code className="bg-muted px-1 py-0.5 rounded">s</code>, return the <em>longest</em>{" "}
                <span className="text-blue-600 underline">palindromic substring</span> in{" "}
                <code className="bg-muted px-1 py-0.5 rounded">s</code>.
              </p>

              <div className="space-y-2">
                <h4 className="font-semibold">Example 1:</h4>
                <pre className="bg-muted p-3 rounded text-sm whitespace-pre-wrap">
      {`Input: s = "babad"
      Output: "bab"
      Explanation: "aba" is also a valid answer.`}
                </pre>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Example 2:</h4>
                <pre className="bg-muted p-3 rounded text-sm whitespace-pre-wrap">
      {`Input: s = "cbbd"
      Output: "bb"`}
                </pre>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <h4 className="font-semibold">Constraints:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>
                    <code className="bg-muted px-1 py-0.5 rounded">1 &lt;= s.length &lt;= 1000</code>
                  </li>
                  <li>
                    <code className="bg-muted px-1 py-0.5 rounded">s</code> consist of only digits and English letters.
                  </li>
                </ul>
              </div>
              </CardContent>
            </Card>
            {/* Prompt Suggestions */}
            <PromptSuggestions
              suggestions={mockPromptSuggestions}
              onPromptSelect={(prompt) => handlePromptSelect(prompt, content)}
            />
          </div>

          {/* Reference Section */}
          <div className={`space-y-6 ${getReferenceColSpan()}`}>
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Focus Topic</h3>
              <div className="grid grid-cols-2 gap-2">
                {mockFundamentals.map((fundamental) => (
                  <button
                    key={fundamental.id}
                    onClick={() => setCurrentTopic(fundamental.id)}
                    className={`p-2 text-sm rounded-lg transition-colors ${
                      currentTopic === fundamental.id
                        ? 'bg-purple-100 text-purple-700 border border-purple-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {fundamental.title.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Fundamentals */}
            <CodeFundamentals 
              fundamentals={mockFundamentals}
              currentTopic={currentTopic}
            />
            {/* Topic Selector */}
            <iframe
                ref={editor}
                height="450px"  
                src="https://onecompiler.com/embed/python/43kyqbvxc?theme=dark&codeChangeEvent=true&listenToEvents=true" 
                width="100%"
              ></iframe>
          </div>
        </div>
        <Card className="bg-white rounded-xl shadow-lg m-4 text-wrap">
              <CardHeader>Suggestion</CardHeader>
              <CardContent className="text-sm text-gray-700 text-wrap">
                <CardDescription className="text-gray-700" dangerouslySetInnerHTML={{ __html: marked.parse(suggestions) }}></CardDescription>
              </CardContent>
            </Card>
        <div className='p-10'>
          <Quiz 
              questions={mockQuizQuestions}
              onQuizComplete={handleQuizComplete}
            />
          </div>
      </div>
    </div>
  );
};

export default LearningLab;