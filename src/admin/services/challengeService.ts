import { challengeEndpoints } from '../api/endpoints';
import { fetchApi } from '../api/apiClient';
import type { Challenge } from '../models/types';

export class ChallengeService {
  static async getAllChallenges(): Promise<Challenge[]> {
    return fetchApi<Challenge[]>(challengeEndpoints.getAll);
  }

  static async createChallenge(challenge: Omit<Challenge, 'id' | 'participants'>): Promise<Challenge> {
    const subjectMap: Record<string, number> = {
      'Aritmética': 1,
      'Álgebra': 2,
      'Cálculo Integral': 3,
      'Cálculo Diferencial': 4,
      'Cálculo de Varias Variables': 5,
      'Ecuaciones Diferenciales': 6,
    };

    const payload = {
      title: challenge.title,
      description: challenge.description,
      subjectId: subjectMap[challenge.subject] || 1,
      difficulty: challenge.difficulty,
      startDate: challenge.startDate,
      endDate: challenge.endDate,
      rewardCoins: challenge.rewardCoins,
      rewardXp: challenge.rewardXP,
      targetScore: challenge.targetScore
    };

    return fetchApi<Challenge>(challengeEndpoints.create, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  static async updateChallenge(id: string, updates: Partial<Challenge>): Promise<Challenge> {
    const subjectMap: Record<string, number> = {
      'Aritmética': 1,
      'Álgebra': 2,
      'Cálculo Integral': 3,
      'Cálculo Diferencial': 4,
      'Cálculo de Varias Variables': 5,
      'Ecuaciones Diferenciales': 6,
    };

    const payload: any = { ...updates };
    if (payload.rewardXP !== undefined) {
      payload.rewardXp = payload.rewardXP;
      delete payload.rewardXP;
    }
    if (payload.subject !== undefined) {
      payload.subjectId = subjectMap[payload.subject] || 1;
      delete payload.subject;
    }

    return fetchApi<Challenge>(challengeEndpoints.update(id), {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  }

  static async deleteChallenge(id: string): Promise<void> {
    return fetchApi<void>(challengeEndpoints.delete(id), {
      method: 'DELETE',
    });
  }
}
