import { authEndpoints } from '../api/endpoints';
import { fetchApi } from '../api/apiClient';
import type { AdminUser } from '../models/types';

export class AuthService {
  static async loginWithEmail(email: string, password: string): Promise<{ user: AdminUser; token: string }> {
    return fetchApi<{ user: AdminUser; token: string }>(authEndpoints.login, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  static async loginWithGoogle(): Promise<{ user: AdminUser; token: string }> {
    return fetchApi<{ user: AdminUser; token: string }>(authEndpoints.googleAuth, {
      method: 'POST',
    });
  }

  static async logout(): Promise<void> {
    try {
      await fetchApi(authEndpoints.logout, { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
    }
  }

  static async verifyToken(token: string): Promise<boolean> {
    try {
      await fetchApi(authEndpoints.verifyToken, {
        method: 'POST',
        body: JSON.stringify({ token }),
      });
      return true;
    } catch {
      return false;
    }
  }

  static async resetPassword(email: string): Promise<void> {
    return fetchApi(authEndpoints.resetPassword, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  static getCurrentUser(): AdminUser | null {
    const userStr = localStorage.getItem('admin_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  static saveSession(user: AdminUser, token: string): void {
    localStorage.setItem('admin_user', JSON.stringify(user));
    localStorage.setItem('admin_token', token);
  }
}
