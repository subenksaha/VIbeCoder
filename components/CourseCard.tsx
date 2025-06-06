import React from 'react';
import { Clock, Star, Users, CheckCircle } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  isCompleted?: boolean;
  progress?: number;
  onEnroll: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  isCompleted = false, 
  progress = 0, 
  onEnroll 
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105">
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(course.difficulty)}`}>
            {course.difficulty}
          </span>
        </div>
        {isCompleted && (
          <div className="absolute top-4 right-4">
            <CheckCircle className="w-6 h-6 text-green-500 bg-white rounded-full" />
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
          {course.title}
        </h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {course.description}
        </p>

        {/* Course Meta */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{course.xpReward} XP</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.lessons.length} lessons</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {course.tags.map((tag) => (
            <span 
              key={tag}
              className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Progress Bar (if in progress) */}
        {progress > 0 && progress < 100 && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={() => onEnroll(course.id)}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
            isCompleted
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : progress > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:scale-105'
          }`}
        >
          {isCompleted ? 'Completed ✓' : progress > 0 ? 'Continue Learning' : 'Start Course'}
        </button>
      </div>
    </div>
  );
};