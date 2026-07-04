const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://mathstack-backend-production.up.railway.app/api/v1';

export const authEndpoints = {
  login: `${API_BASE_URL}/auth/login`,
  logout: `${API_BASE_URL}/auth/logout`,
  googleAuth: `${API_BASE_URL}/auth/google`,
  resetPassword: `${API_BASE_URL}/auth/reset-password`,
  verifyToken: `${API_BASE_URL}/auth/verify`,
};

export const dashboardEndpoints = {
  getStats: `${API_BASE_URL}/admin/dashboard/stats`,
  getActiveUsers: `${API_BASE_URL}/admin/dashboard/active-users`,
  getDifficultyStats: `${API_BASE_URL}/admin/dashboard/difficulty-stats`,
  getUserGrowth: `${API_BASE_URL}/admin/dashboard/user-growth`,
  getActivityBySubject: `${API_BASE_URL}/admin/dashboard/activity-by-subject`,
};

export const userEndpoints = {
  getAll: `${API_BASE_URL}/admin/users`,
  getById: (id: string) => `${API_BASE_URL}/admin/users/${id}`,
  updateCoins: (id: string) => `${API_BASE_URL}/admin/users/${id}/coins`,
  updateXP: (id: string) => `${API_BASE_URL}/admin/users/${id}/xp`,
  getUserActivity: (id: string) => `${API_BASE_URL}/admin/users/${id}/activity`,
  banUser: (id: string) => `${API_BASE_URL}/admin/users/${id}/ban`,
  unbanUser: (id: string) => `${API_BASE_URL}/admin/users/${id}/unban`,
};

export const storeEndpoints = {
  getAll: `${API_BASE_URL}/store/items`,
  getById: (id: string) => `${API_BASE_URL}/store/items/${id}`,
  create: `${API_BASE_URL}/store/items`,
  update: (id: string) => `${API_BASE_URL}/store/items/${id}`,
  delete: (id: string) => `${API_BASE_URL}/store/items/${id}`,
  updateStock: (id: string) => `${API_BASE_URL}/store/items/${id}/stock`,
};

export const challengeEndpoints = {
  getAll: `${API_BASE_URL}/admin/challenges`,
  getById: (id: string) => `${API_BASE_URL}/admin/challenges/${id}`,
  create: `${API_BASE_URL}/admin/challenges`,
  update: (id: string) => `${API_BASE_URL}/admin/challenges/${id}`,
  delete: (id: string) => `${API_BASE_URL}/admin/challenges/${id}`,
  getParticipants: (id: string) => `${API_BASE_URL}/admin/challenges/${id}/participants`,
};

export const lessonEndpoints = {
  getAll: `${API_BASE_URL}/admin/lessons`,
  getById: (id: string) => `${API_BASE_URL}/admin/lessons/${id}`,
  create: `${API_BASE_URL}/admin/lessons`,
  update: (id: string) => `${API_BASE_URL}/admin/lessons/${id}`,
  delete: (id: string) => `${API_BASE_URL}/admin/lessons/${id}`,
};

export const exerciseEndpoints = {
  getAll: `${API_BASE_URL}/admin/exercises`,
  getById: (id: string) => `${API_BASE_URL}/admin/exercises/${id}`,
  create: `${API_BASE_URL}/admin/exercises`,
  update: (id: string) => `${API_BASE_URL}/admin/exercises/${id}`,
  delete: (id: string) => `${API_BASE_URL}/admin/exercises/${id}`,
  getByLessonId: (lessonId: string) => `${API_BASE_URL}/admin/lessons/${lessonId}/exercises`,
};

export const subjectEndpoints = {
  getAll: `${API_BASE_URL}/academic/subjects`,
  getById: (id: number) => `${API_BASE_URL}/academic/subjects/${id}`,
  create: `${API_BASE_URL}/academic/subjects`,
  update: (id: number) => `${API_BASE_URL}/academic/subjects/${id}`,
  delete: (id: number) => `${API_BASE_URL}/academic/subjects/${id}`,
};

export const lessonTypeEndpoints = {
  getAll: `${API_BASE_URL}/academic/lesson-types`,
};

export const diagnosticEndpoints = {
  getAll: `${API_BASE_URL}/admin/diagnostics`,
  getByUserId: (userId: string) => `${API_BASE_URL}/admin/users/${userId}/diagnostics`,
  create: `${API_BASE_URL}/admin/diagnostics`,
};

export const practiceEndpoints = {
  getAll: `${API_BASE_URL}/admin/practice-sessions`,
  getByUserId: (userId: string) => `${API_BASE_URL}/admin/practice-sessions/users/${userId}`,
};

export const avatarEndpoints = {
  generate: `${API_BASE_URL}/admin/avatars/generate`,
  getAll: `${API_BASE_URL}/admin/avatars`,
  getById: (id: string) => `${API_BASE_URL}/admin/avatars/${id}`,
  delete: (id: string) => `${API_BASE_URL}/admin/avatars/${id}`,
};

export const statsEndpoints = {
  getOverview: `${API_BASE_URL}/admin/stats/overview`,
  getUserStats: `${API_BASE_URL}/admin/stats/users`,
  getChallengeStats: `${API_BASE_URL}/admin/stats/challenges`,
  getRevenueStats: `${API_BASE_URL}/admin/stats/revenue`,
  getEngagementStats: `${API_BASE_URL}/admin/stats/engagement`,
};
