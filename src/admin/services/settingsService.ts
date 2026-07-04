import { fetchApi } from '../api/apiClient';
import { adminSettingsEndpoints } from '../api/endpoints';

export interface AdminSettings {
  emailNotifications: boolean;
  challengeAlerts: boolean;
}

export class SettingsService {
  static async getSettings(): Promise<AdminSettings> {
    return fetchApi<AdminSettings>(adminSettingsEndpoints.get);
  }

  static async updateSettings(settings: AdminSettings): Promise<AdminSettings> {
    return fetchApi<AdminSettings>(adminSettingsEndpoints.update, {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }
}
