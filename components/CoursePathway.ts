// import React, { useState } from 'react';
// import { ArrowLeft, Clock, Star, CheckCircle, Target, Lightbulb } from 'lucide-react';
// import { CodeEditor } from './CodeEditor';
// import { PromptSuggestions } from './PromptSuggestions';
// import { CodeFundamentals } from './CodeFundamentals';
// import { Lesson } from '../app/types';

// interface CoursePathwayProps {
//   lesson: Lesson;
//   onBack: () => void;
//   onComplete: () => void;
// }

// // Mock data for the lesson
// const mockPromptSuggestions = [
//   {
//     id: '1',
//     title: 'Basic Function Creation',
//     prompt: 'Create a Python function called "greet" that takes a name parameter and returns a greeting message.',
//     difficulty: 'beginner' as const,
//     category: 'Functions'
//   },
//   {
//     id: '2',
//     title: 'Add Input Validation',
//     prompt: 'Modify the greet function to check if the name parameter is not empty and handle edge cases.',
//     difficulty: 'intermediate' as const,
//     category: 'Error Handling'
//   },
//   {
//     id: '3',
//     title: 'Advanced Formatting',
//     prompt: 'Enhance the greet function to support different greeting styles (formal, casual, enthusiastic) based on an optional parameter.',
//     difficulty: 'advanced' as const,
//     category: 'Advanced Functions'
//   }
// ];

// const mockFundamentals = [
//   {
//     id: 'variables',
//     title: 'Variables and Data Types',
//     description: 'Learn how to store and manipulate data in Python',
//     content: 'Variables are containers for storing data values. Python has various data types including strings, integers, floats, and booleans.',
//     codeExample: `# Variable examples
// name = "Alice"        # String
// age = 25             # Integer
// height = 5.6         # Float
// is_student = True    # Boolean

// print(f"Name: {name}, Age: {age}")`,
//     keyPoints: [
//       'Variables store data values',
//       'Python is dynamically typed',
//       'Use descriptive variable names',
//       'Different data types serve different purposes'
//     ]
//   },
//   {
//     id: 'functions',
//     title: 'Functions',
//     description: 'Create reusable blocks of code with functions',
//     content: 'Functions are reusable blocks of code that perform specific tasks. They help organize code and avoid repetition.',
//     codeExample: `def greet(name):
//     """Return a greeting message"""
//     return f"Hello, {name}!"

// # Call the function
// message = greet("Alice")
// print(message)`,
//     keyPoints: [
//       'Functions make code reusable',
//       'Use def keyword to define functions',
//       'Functions can take parameters',
//       'Return values using return statement'
//     ]
//   },
//   {
//     id: 'conditionals',
//     title: 'Conditional Statements',
//     description: 'Make decisions in your code with if/else statements',
//     content: 'Conditional statements allow your program to make decisions based on different conditions.',
//     codeExample: `age = 18

// if age >= 18:
//     print("You are an adult")
// elif age >= 13:
//     print("You are a teenager")
// else:
//     print("You are a child")`,
//     keyPoints: [
//       'if statements check conditions',
//       'elif provides additional conditions',
//       'else handles remaining cases',
//       'Use comparison operators (==, !=, <, >, etc.)'
//     ]
//   }
// ];

// export const CoursePathway: React.FC<CoursePathwayProps> = ({
//   lesson,
//   onBack,
//   onComplete
// }) => {
//   const [code, setCode] = useState(`def greet(name):
//     # Write your code here
//     pass

// # Test your function
// print(greet("World"))`);
  
//   const [selectedPrompt, setSelectedPrompt] = useState<string>('');
//   const [isCompleted, setIsCompleted] = useState(false);

//   const handleCodeRun = (runCode: string) => {
//     // Simulate checking if the code is correct
//     if (runCode.includes('return') && runCode.includes('Hello')) {
//       setIsCompleted(true);
//     }
//   };

//   const handlePromptSelect = (prompt: string) => {
//     setSelectedPrompt(prompt);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={onBack}
//                 className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <ArrowLeft className="w-5 h-5" />
//               </button>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
//                 <div className="flex items-center space-x-4 mt-1">
//                   <div className="flex items-center space-x-1 text-gray-600">
//                     <Clock className="w-4 h-4" />
//                     <span className="text-sm">{lesson.estimatedTime}</span>
//                   </div>
//                   <div className="flex items-center space-x-1 text-yellow-600">
//                     <Star className="w-4 h-4" />
//                     <span className="text-sm">{lesson.xpReward} XP</span>
//                   </div>
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     lesson.type === 'practice' ? 'bg-blue-100 text-blue-800' :
//                     lesson.type === 'theory' ? 'bg-green-100 text-green-800' :
//                     'bg-purple-100 text-purple-800'
//                   }`}>
//                     {lesson.type}
//                   </span>
//                 </div>
//               </div>
//             </div>
            
//             {isCompleted && (
//               <button
//                 onClick={onComplete}
//                 className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
//               >
//                 <CheckCircle className="w-5 h-5" />
//                 <span>Complete Lesson</span>
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Problem Statement & Code Editor */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Problem Statement */}
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <div className="flex items-center space-x-2 mb-4">
//                 <Target className="w-6 h-6 text-green-500" />
//                 <h2 className="text-xl font-bold text-gray-900">Problem Statement</h2>
//               </div>
//               <div className="prose prose-gray max-w-none">
//                 <p className="text-gray-700 leading-relaxed mb-4">
//                   {lesson.description}
//                 </p>
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                   <h3 className="font-semibold text-blue-900 mb-2">Your Task:</h3>
//                   <p className="text-blue-800">
//                     Create a function that takes a name as input and returns a personalized greeting message. 
//                     The function should handle edge cases and provide meaningful output.
//                   </p>
//                 </div>
                
//                 {lesson.aiPromptExample && (
//                   <div className="mt-4 bg-purple-50 border border-purple-200 rounded-lg p-4">
//                     <h3 className="font-semibold text-purple-900 mb-2 flex items-center space-x-2">
//                       <Lightbulb className="w-4 h-4" />
//                       <span>AI Prompt Example:</span>
//                     </h3>
//                     <p className="text-purple-800 font-mono text-sm">
//                       {lesson.aiPromptExample}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Code Editor */}
//             <CodeEditor
//               initialCode={code}
//               language="python"
//               onCodeChange={setCode}
//               onRun={handleCodeRun}
//               expectedOutput="Hello, World!"
//             />

//             {/* Selected Prompt Display */}
//             {selectedPrompt && (
//               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                 <h3 className="font-semibold text-yellow-900 mb-2">Selected AI Prompt:</h3>
//                 <p className="text-yellow-800 text-sm">{selectedPrompt}</p>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Fundamentals & Prompts */}
//           <div className="space-y-6">
//             {/* Code Fundamentals */}
//             <CodeFundamentals 
//               fundamentals={mockFundamentals}
//               currentTopic="functions"
//             />

//             {/* Prompt Suggestions */}
//             <PromptSuggestions
//               suggestions={mockPromptSuggestions}
//               onPromptSelect={handlePromptSelect}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };