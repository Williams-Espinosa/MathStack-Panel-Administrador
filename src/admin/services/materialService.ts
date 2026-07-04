import { lessonEndpoints, exerciseEndpoints, subjectEndpoints, lessonTypeEndpoints } from '../api/endpoints';
import { fetchApi } from '../api/apiClient';
import type { LearningMaterial, Subject } from '../models/types';
import type { LessonTypeRecord } from '../models/database.types';

export class MaterialService {
  static async getSubjects(): Promise<Subject[]> {
    return fetchApi<Subject[]>(subjectEndpoints.getAll).catch(() => []);
  }

  static async getLessonTypes(): Promise<LessonTypeRecord[]> {
    return fetchApi<LessonTypeRecord[]>(lessonTypeEndpoints.getAll).catch(() => []);
  }

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

  static async createMaterial(material: Partial<LearningMaterial>): Promise<LearningMaterial> {
    if (material.type === 'exercise') {
      const payload = {
        lessonId: material.lessonId,
        content: material.content,
        conceptTested: material.title, // using title as concept since concept is missing
      };
      const response = await fetchApi<any>(exerciseEndpoints.create, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      return { ...material, id: response.id } as LearningMaterial;
    } else {
      const payload = {
        subjectId: material.subjectId,
        lessonTypeId: material.lessonTypeId || 1, // Fallback if missing
        title: material.title,
        difficultyLevel: material.difficultyLevel || 5, // Fallback
        content: material.content,
      };
      const response = await fetchApi<any>(lessonEndpoints.create, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      return { ...material, id: response.id } as LearningMaterial;
    }
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
