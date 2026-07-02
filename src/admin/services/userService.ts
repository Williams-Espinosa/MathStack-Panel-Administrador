import { userEndpoints } from '../api/endpoints';
import { fetchApi } from '../api/apiClient';
import type { User, UserActivity } from '../models/types';

export class UserService {
  static async getAllUsers(): Promise<User[]> {
    return fetchApi<User[]>(userEndpoints.getAll);
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
    amount: number,
    operation: 'add' | 'remove'
  ): Promise<User> {
    return fetchApi<User>(userEndpoints.updateCoins(userId), {
      method: 'POST',
      body: JSON.stringify({ amount, operation }),
    });
  }

  static async getUserActivity(userId: string): Promise<UserActivity[]> {
    return fetchApi<UserActivity[]>(userEndpoints.getUserActivity(userId));
  }
}
