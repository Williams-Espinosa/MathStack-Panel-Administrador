import { useState, useEffect } from 'react';
import { DashboardService } from '../services/dashboardService';
import type { DashboardStats } from '../models/types';

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await DashboardService.getStats();
      setStats(data);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard stats');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    loadStats();
  };

  return {
    stats,
    loading,
    error,
    refresh,
  };
}
