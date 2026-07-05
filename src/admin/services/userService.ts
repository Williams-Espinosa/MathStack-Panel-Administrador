import { userEndpoints } from '../api/endpoints';
import { fetchApi } from '../api/apiClient';
import type { User, UserActivity } from '../models/types';

export class UserService {
  static async getAllUsers(): Promise<User[]> {
    const data = await fetchApi<any[]>(userEndpoints.getAll);
    return data.map((item: any) => ({
      ...item.user,
      coins: item.gamificationStats?.coins || 0,
      xp: item.gamificationStats?.xpPoints || 0,
      level: item.gamificationStats?.currentLevel || 0,
      currentStreak: item.gamificationStats?.currentStreak || 0,
      bestStreak: item.gamificationStats?.maxStreak || 0,
      completedLessons: item.gamificationStats?.lessonsCompletedCount || 0,
      minutesPracticed: item.gamificationStats?.minutesPracticed || 0,
      lastPracticeDate: item.gamificationStats?.lastPracticeDate,
      joinedAt: item.user.createdAt,
    }));
  }

  static async getUserById(id: string): Promise<User | null> {
    try {
      return await fetchApi<User>(userEndpoints.getById(id));
    } catch {
      return null;
    }
  }

  static async updateUserCoins(
    userId: string,
    newTotal: number
  ): Promise<User> {
    return fetchApi<User>(userEndpoints.updateCoins(userId), {
      method: 'PUT',
      body: JSON.stringify({ coins: newTotal }),
    });
  }

  static async getUserActivity(userId: string): Promise<UserActivity[]> {
    return fetchApi<UserActivity[]>(userEndpoints.getUserActivity(userId));
  }
}
