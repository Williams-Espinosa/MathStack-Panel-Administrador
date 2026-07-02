export type ItemType = 'avatar' | 'badge' | 'skin';
export type LessonType = 'theory' | 'guided' | 'interactive';
export type PathStatus = 'pending' | 'in_progress' | 'completed';
export type ChallengeStatus = 'waiting' | 'active' | 'completed';

export interface DBUser {
  id: string;
  firebase_uid: string;
  email: string;
  username: string;
  created_at: string;
}

export interface UserGamificationStats {
  user_id: string;
  coins: number;
  current_level: number;
  xp_points: number;
  lessons_completed_count: number;
  current_streak: number;
  max_streak: number;
  minutes_practiced: number;
  last_practice_date: string | null;
}

export interface UserPreferences {
  user_id: string;
  push_notifications_enabled: boolean;
  preferred_practice_time: string | null;
}

export interface StoreItem {
  id: string;
  item_type_id: number;
  name: string;
  cost: number;
  asset_url: string;
}

export interface UserInventoryItem {
  user_id: string;
  item_id: string;
  is_equipped: boolean;
  acquired_at: string;
}

export interface Subject {
  id: number;
  name: string;
}

export interface Lesson {
  id: string;
  subject_id: number;
  lesson_type_id: number;
  title: string;
  difficulty_level: number;
}

export interface Exercise {
  id: string;
  lesson_id: string;
  content: string;
  concept_tested: string | null;
}

export interface DiagnosticResult {
  id: string;
  user_id: string;
  subject_id: number;
  deficiency_score: number;
  evaluated_at: string;
}

export interface LearningPath {
  user_id: string;
  lesson_id: string;
  status_id: number;
  completed_at: string | null;
}

export interface PracticeSession {
  id: string;
  user_id: string;
  session_date: string;
  minutes_spent: number;
  created_at: string;
}

export interface ExerciseAttempt {
  id: string;
  user_id: string;
  exercise_id: string;
  is_correct: boolean;
  attempted_at: string;
}

export interface Challenge {
  id: string;
  creator_id: string;
  status_id: number;
  created_at: string;
}

export interface ChallengeParticipant {
  challenge_id: string;
  user_id: string;
  completion_time_seconds: number | null;
  is_winner: boolean;
  joined_at: string;
}

export interface ItemTypeRecord {
  id: number;
  name: ItemType;
}

export interface LessonTypeRecord {
  id: number;
  name: LessonType;
}

export interface PathStatusRecord {
  id: number;
  name: PathStatus;
}

export interface ChallengeStatusRecord {
  id: number;
  name: ChallengeStatus;
}
