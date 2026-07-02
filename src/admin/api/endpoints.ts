const API_BASE_URL = '/api/v1';

export const authEndpoints = {
  login: `${API_BASE_URL}/auth/login`,
  logout: `${API_BASE_URL}/auth/logout`,
  googleAuth: `${API_BASE_URL}/auth/google`,
  resetPassword: `${API_BASE_URL}/auth/reset-password`,
  verifyToken: `${API_BASE_URL}/auth/verify`,
};

export const dashboardEndpoints = {
  getStats: `${API_BASE_URL}/dashboard/stats`,
  getActiveUsers: `${API_BASE_URL}/dashboard/active-users`,
  getDifficultyStats: `${API_BASE_URL}/dashboard/difficulty-stats`,
  getUserGrowth: `${API_BASE_URL}/dashboard/user-growth`,
  getActivityBySubject: `${API_BASE_URL}/dashboard/activity-by-subject`,
};

export const userEndpoints = {
  getAll: `${API_BASE_URL}/users`,
  getById: (id: string) => `${API_BASE_URL}/users/${id}`,
  updateCoins: (id: string) => `${API_BASE_URL}/users/${id}/coins`,
  updateXP: (id: string) => `${API_BASE_URL}/users/${id}/xp`,
  getUserActivity: (id: string) => `${API_BASE_URL}/users/${id}/activity`,
  banUser: (id: string) => `${API_BASE_URL}/users/${id}/ban`,
  unbanUser: (id: string) => `${API_BASE_URL}/users/${id}/unban`,
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
  getAll: `${API_BASE_URL}/social/challenges`,
  getById: (id: string) => `${API_BASE_URL}/social/challenges/${id}`,
  create: `${API_BASE_URL}/social/challenges`,
  update: (id: string) => `${API_BASE_URL}/social/challenges/${id}`,
  delete: (id: string) => `${API_BASE_URL}/social/challenges/${id}`,
  getParticipants: (id: string) => `${API_BASE_URL}/social/challenges/${id}/participants`,
};

export const lessonEndpoints = {
  getAll: `${API_BASE_URL}/academic/lessons`,
  getById: (id: string) => `${API_BASE_URL}/academic/lessons/${id}`,
  create: `${API_BASE_URL}/academic/lessons`,
  update: (id: string) => `${API_BASE_URL}/academic/lessons/${id}`,
  delete: (id: string) => `${API_BASE_URL}/academic/lessons/${id}`,
};

export const exerciseEndpoints = {
  getAll: `${API_BASE_URL}/academic/exercises`,
  getById: (id: string) => `${API_BASE_URL}/academic/exercises/${id}`,
  create: `${API_BASE_URL}/academic/exercises`,
  update: (id: string) => `${API_BASE_URL}/academic/exercises/${id}`,
  delete: (id: string) => `${API_BASE_URL}/academic/exercises/${id}`,
  getByLessonId: (lessonId: string) => `${API_BASE_URL}/academic/lessons/${lessonId}/exercises`,
};

export const subjectEndpoints = {
  getAll: `${API_BASE_URL}/academic/subjects`,
  getById: (id: number) => `${API_BASE_URL}/academic/subjects/${id}`,
  create: `${API_BASE_URL}/academic/subjects`,
  update: (id: number) => `${API_BASE_URL}/academic/subjects/${id}`,
  delete: (id: number) => `${API_BASE_URL}/academic/subjects/${id}`,
};

export const diagnosticEndpoints = {
  getAll: `${API_BASE_URL}/diagnostics`,
  getByUserId: (userId: string) => `${API_BASE_URL}/users/${userId}/diagnostics`,
  create: `${API_BASE_URL}/diagnostics`,
};

export const practiceEndpoints = {
  getAll: `${API_BASE_URL}/practice`,
  getByUserId: (userId: string) => `${API_BASE_URL}/practice/users/${userId}`,
};

export const avatarEndpoints = {
  generate: `${API_BASE_URL}/avatars/generate`,
  getAll: `${API_BASE_URL}/avatars`,
  getById: (id: string) => `${API_BASE_URL}/avatars/${id}`,
  delete: (id: string) => `${API_BASE_URL}/avatars/${id}`,
};

export const statsEndpoints = {
  getOverview: `${API_BASE_URL}/stats/overview`,
  getUserStats: `${API_BASE_URL}/stats/users`,
  getChallengeStats: `${API_BASE_URL}/stats/challenges`,
  getRevenueStats: `${API_BASE_URL}/stats/revenue`,
  getEngagementStats: `${API_BASE_URL}/stats/engagement`,
};
