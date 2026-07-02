import { dashboardEndpoints } from '../api/endpoints';
import { fetchApi } from '../api/apiClient';
import type { DashboardStats, DifficultyStats } from '../models/types';

export class DashboardService {
  static async getStats(): Promise<DashboardStats> {
    return fetchApi<DashboardStats>(dashboardEndpoints.getStats);
  }

  static async getDifficultyStats(): Promise<DifficultyStats[]> {
    return fetchApi<DifficultyStats[]>(dashboardEndpoints.getDifficultyStats);
  }
}
