import { lessonEndpoints, exerciseEndpoints } from '../api/endpoints';
import { fetchApi } from '../api/apiClient';
import type { LearningMaterial } from '../models/types';

export class MaterialService {
  static async getAllMaterials(): Promise<LearningMaterial[]> {
    try {
      const [lessons, exercises] = await Promise.all([
        fetchApi<any[]>(lessonEndpoints.getAll).catch(() => []),
        fetchApi<any[]>(exerciseEndpoints.getAll).catch(() => []),
      ]);

      const formattedLessons: LearningMaterial[] = lessons.map(l => ({
        ...l,
        type: 'lesson',
        id: l.id || l.lessonId,
      }));

      const formattedExercises: LearningMaterial[] = exercises.map(e => ({
        ...e,
        type: 'exercise',
        id: e.id || e.exerciseId,
      }));

      return [...formattedLessons, ...formattedExercises];
    } catch (error) {
      console.error('Error fetching materials:', error);
      return [];
    }
  }

  static async createMaterial(material: Omit<LearningMaterial, 'id' | 'createdAt' | 'updatedAt'>): Promise<LearningMaterial> {
    const endpoint = material.type === 'lesson' ? lessonEndpoints.create : exerciseEndpoints.create;
    return fetchApi<LearningMaterial>(endpoint, {
      method: 'POST',
      body: JSON.stringify(material),
    });
  }

  static async updateMaterial(id: string, updates: Partial<LearningMaterial>): Promise<LearningMaterial> {
    const endpoint = updates.type === 'lesson' ? lessonEndpoints.update(id) : exerciseEndpoints.update(id);
    return fetchApi<LearningMaterial>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  static async deleteMaterial(id: string, type: 'lesson' | 'exercise' = 'lesson'): Promise<void> {
    const endpoint = type === 'lesson' ? lessonEndpoints.delete(id) : exerciseEndpoints.delete(id);
    return fetchApi<void>(endpoint, {
      method: 'DELETE',
    });
  }
}
