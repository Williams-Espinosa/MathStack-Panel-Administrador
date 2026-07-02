import { challengeEndpoints } from '../api/endpoints';
import { fetchApi } from '../api/apiClient';
import type { Challenge } from '../models/types';

export class ChallengeService {
  static async getAllChallenges(): Promise<Challenge[]> {
    return fetchApi<Challenge[]>(challengeEndpoints.getAll);
  }

  static async createChallenge(challenge: Omit<Challenge, 'id' | 'participants'>): Promise<Challenge> {
    return fetchApi<Challenge>(challengeEndpoints.create, {
      method: 'POST',
      body: JSON.stringify(challenge),
    });
  }

  static async updateChallenge(id: string, updates: Partial<Challenge>): Promise<Challenge> {
    return fetchApi<Challenge>(challengeEndpoints.update(id), {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  static async deleteChallenge(id: string): Promise<void> {
    return fetchApi<void>(challengeEndpoints.delete(id), {
      method: 'DELETE',
    });
  }
}
