export interface User {
  id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  totalXP: number;
  badges: string[];
  completedLessons: string[];
  currentCourse?: string;
  streak: number;
  joinDate: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  lessons: Lesson[];
  xpReward: number;
  prerequisites?: string[];
  tags: string[];
  image: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  type: 'theory' | 'practice' | 'challenge';
  xpReward: number;
  estimatedTime: string;
  codeExample?: string;
  aiPromptExample?: string;
  exercises?: Exercise[];
}

export interface Exercise {
  id: string;
  prompt: string;
  expectedOutput: string;
  hints: string[];
  difficulty: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  requirement: {
    type: 'lessons_completed' | 'xp_earned' | 'streak' | 'course_completed';
    value: number;
  };
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  xp: number;
  level: number;
}