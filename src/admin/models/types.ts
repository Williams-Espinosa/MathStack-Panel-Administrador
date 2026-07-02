import type {
  DBUser,
  UserGamificationStats,
  ItemType,
  LessonType,
  PathStatus,
  ChallengeStatus,
} from './database.types';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'super_admin';
  createdAt: string;
}

export interface User {
  id: string;
  firebaseUid: string;
  username: string;
  email: string;
  avatar?: string;
  level: number;
  coins: number;
  currentStreak: number;
  bestStreak: number;
  completedLessons: number;
  minutesPracticed: number;
  lastPracticeDate: string | null;
  joinedAt: string;
  lastActive: string;
  isActive: boolean;
}

export interface Subject {
  id: number;
  name: string;
  icon?: string;
  color?: string;
}

export interface DifficultyStats {
  subjectId: number;
  subjectName: string;
  totalAttempts: number;
  failureRate: number;
  averageDeficiencyScore: number;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalLessons: number;
  completedLessons: number;
  totalChallenges: number;
  activeChallenges: number;
  difficultyStats: DifficultyStats[];
  userGrowth: {
    date: string;
    count: number;
  }[];

  activityBySubject: {
    subject: string;
    count: number;
  }[];
}

export interface StoreItem {
  id: string;
  name: string;
  description?: string;
  itemTypeId: number;
  category: ItemType;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  stock?: number;
  createdAt?: string;
}

export interface Challenge {
  id: string;
  creatorId: string;
  statusId: number;
  status: ChallengeStatus;
  createdAt: string;

  title: string;
  description: string;
  subjectId?: number;
  subject?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  startDate?: string;
  endDate?: string;
  rewardCoins?: number;
  rewardXP?: number;
  targetScore?: number;

  participants: number;
  isActive: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'challenge' | 'competition' | 'special';
  startDate: string;
  endDate: string;
  participants: number;
  rewards: {
    coins: number;
    xp: number;
    items?: string[];
  };
  isActive: boolean;
}

export interface LearningMaterial {
  id: string;
  title: string;
  description?: string;
  subjectId: number;
  subject: string;
  lessonTypeId: number;
  lessonType: LessonType;

  difficulty: 'beginner' | 'intermediate' | 'advanced';
  difficultyLevel: number;

  type: 'lesson' | 'exercise' | 'video' | 'pdf';
  contentUrl?: string;
  content?: string;

  exerciseCount?: number;

  createdAt?: string;
  updatedAt?: string;
}

export interface Avatar {
  id: string;
  style: string;
  seed: string;
  imageUrl: string;
  previewUrl: string;
  createdAt: string;
}

export interface UserActivity {
  userId: string;
  username: string;
  action: string;
  timestamp: string;
  details?: {
    lessonId?: string;
    lessonTitle?: string;
    exerciseId?: string;
    itemId?: string;
    itemName?: string;
    xpGained?: number;
    coinsSpent?: number;
    coinsGained?: number;
    isCorrect?: boolean;
    sessionMinutes?: number;
  };

  activityType?: 'lesson' | 'exercise' | 'purchase' | 'practice' | 'challenge';
}
