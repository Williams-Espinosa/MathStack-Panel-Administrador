import { useState, useEffect } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { UserService } from '../services/userService';
import type { User } from '../models/types';
import {
  TrendingUp,
  Users,
  BookOpen,
  Trophy,
  Clock,
  Target,
  Award,
  Activity,
  FileText,
  Download,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function Stats() {
  const { stats, loading } = useDashboard();
  const [users, setUsers] = useState<User[]>([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState('general');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    UserService.getAllUsers().then(setUsers).catch(console.error);
  }, []);

  const handleGenerateReport = async () => {
    if (!stats) return;
    
    setGenerating(true);
    setTimeout(() => {
      const reportData = {
        type: reportType,
        dateRange,
        generatedAt: new Date().toISOString(),
        stats: {
          totalUsers: stats.totalUsers,
          activeUsers: stats.activeUsers,
          completedLessons: stats.completedLessons,
          subjectProgress: stats.difficultyStats,
        },
      };

      const dataStr = JSON.stringify(reportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const exportFileDefaultName = `reporte-mathstack-${reportType}-${new Date().toISOString().split('T')[0]}.json`;

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();

      setGenerating(false);
      setShowReportModal(false);
      alert('Reporte generado exitosamente');
    }, 2000);
  };

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-xl shadow-blue-500/30"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-blue-300/30 rounded-full animate-ping mx-auto"></div>
          </div>
          <p className="text-gray-600 font-medium">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  const engagementData = [
    { name: 'Lun', sessions: 450, completions: 320, streaks: 280 },
    { name: 'Mar', sessions: 520, completions: 380, streaks: 310 },
    { name: 'Mié', sessions: 680, completions: 490, streaks: 420 },
    { name: 'Jue', sessions: 590, completions: 410, streaks: 350 },
    { name: 'Vie', sessions: 710, completions: 520, streaks: 460 },
    { name: 'Sáb', sessions: 820, completions: 600, streaks: 510 },
    { name: 'Dom', sessions: 650, completions: 470, streaks: 390 },
  ];

  const performanceData = stats.difficultyStats.map((stat) => ({
    subject: stat.subjectName,
    'Tasa Éxito': ((1 - stat.failureRate) * 100).toFixed(1),
    'Promedio': stat.averageScore,
    fullMark: 100,
  }));

  const retentionData = [
    { week: 'Semana 1', retention: 92, active: 850 },
    { week: 'Semana 2', retention: 85, active: 780 },
    { week: 'Semana 3', retention: 78, active: 720 },
    { week: 'Semana 4', retention: 71, active: 650 },
    { week: 'Semana 5', retention: 65, active: 590 },
    { week: 'Semana 6', retention: 60, active: 540 },
  ];

  return (
    <div className="p-8 min-h-screen">
      <div className="mb-8 animate-[fadeIn_0.6s_ease-out]">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600 flex items-center justify-center shadow-xl shadow-blue-500/50">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">Estadísticas Avanzadas</h1>
            </div>
            <p className="text-gray-600 font-medium ml-15">Análisis detallado del rendimiento de la plataforma</p>
          </div>
          <button
            onClick={() => setShowReportModal(true)}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300 shadow-xl shadow-blue-500/40"
          >
            <FileText className="w-5 h-5" />
            Generar Reporte
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-[fadeIn_0.8s_ease-out]">
        <div className="group bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-xl rounded-3xl shadow-xl shadow-blue-500/20 p-6 border-2 border-blue-200/50 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-blue-900 font-bold">Tasa de Actividad</p>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-5xl font-bold text-blue-900 mb-1">
              {((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}%
            </h3>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-green-50 to-emerald-100/50 backdrop-blur-xl rounded-3xl shadow-xl shadow-green-500/20 p-6 border-2 border-green-200/50 hover:shadow-2xl hover:shadow-green-500/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-green-900 font-bold">Tasa de Completitud</p>
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-5xl font-bold text-green-900 mb-1">
              {((stats.completedLessons / (stats.totalLessons * stats.totalUsers)) * 100).toFixed(1)}%
            </h3>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-cyan-50 to-sky-100/50 backdrop-blur-xl rounded-3xl shadow-xl shadow-cyan-500/20 p-6 border-2 border-cyan-200/50 hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-cyan-900 font-bold">Retos Activos</p>
              <Trophy className="w-5 h-5 text-cyan-600" />
            </div>
            <h3 className="text-5xl font-bold text-cyan-900 mb-1">
              {((stats.activeChallenges / stats.totalChallenges) * 100).toFixed(0)}%
            </h3>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-amber-50 to-yellow-100/50 backdrop-blur-xl rounded-3xl shadow-xl shadow-amber-500/20 p-6 border-2 border-amber-200/50 hover:shadow-2xl hover:shadow-amber-500/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-amber-900 font-bold">Score Promedio</p>
              <Award className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="text-5xl font-bold text-amber-900 mb-1">68.5</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-[fadeIn_1s_ease-out]">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-500/10 p-6 border-2 border-blue-100/50">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Engagement Semanal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={engagementData}>
              <defs>
                <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCompletions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              />
              <Area
                type="monotone"
                dataKey="sessions"
                stroke="#2563EB"
                fillOpacity={1}
                fill="url(#colorSessions)"
                name="Sesiones"
              />
              <Area
                type="monotone"
                dataKey="completions"
                stroke="#22C55E"
                fillOpacity={1}
                fill="url(#colorCompletions)"
                name="Completadas"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-500/10 p-6 border-2 border-blue-100/50">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Rendimiento por Materia</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={performanceData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af' }} />
              <Radar
                name="Tasa de Éxito"
                dataKey="Tasa Éxito"
                stroke="#2563EB"
                fill="#2563EB"
                fillOpacity={0.6}
              />
              <Radar
                name="Promedio"
                dataKey="Promedio"
                stroke="#22C55E"
                fill="#22C55E"
                fillOpacity={0.6}
              />
              <Legend />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-500/10 p-6 border-2 border-blue-100/50">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Retención de Usuarios</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={retentionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="retention"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', r: 5 }}
                name="Retención (%)"
              />
              <Line
                type="monotone"
                dataKey="active"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ fill: '#f59e0b', r: 5 }}
                name="Usuarios Activos"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-500/10 p-6 border-2 border-blue-100/50">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Distribución de Tiempo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { hour: '00-06', users: 120 },
                { hour: '06-09', users: 450 },
                { hour: '09-12', users: 680 },
                { hour: '12-15', users: 520 },
                { hour: '15-18', users: 780 },
                { hour: '18-21', users: 920 },
                { hour: '21-24', users: 340 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              />
              <Bar dataKey="users" fill="#2563EB" radius={[8, 8, 0, 0]} name="Usuarios Activos" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-[fadeIn_1.2s_ease-out]">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-500/10 p-6 border-2 border-blue-100/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Métricas de Aprendizaje</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Lecciones por Usuario</span>
              <span className="text-lg font-bold text-gray-900">
                {users.length ? (users.reduce((acc, u) => acc + (u.completedLessons || 0), 0) / users.length).toFixed(1) : '0'}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Tiempo Promedio/Sesión</span>
              <span className="text-lg font-bold text-gray-900">
                {users.length ? Math.round(users.reduce((acc, u) => acc + (u.minutesPracticed || 0), 0) / (users.reduce((acc, u) => acc + (u.completedLessons || 0), 0) || 1)) : 0} min
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Tasa de Abandono</span>
              <span className="text-lg font-bold text-red-600">
                {users.length ? ((users.filter(u => !u.isActive).length / users.length) * 100).toFixed(1) : '0'}%
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-600">Progreso Promedio</span>
              <span className="text-lg font-bold text-green-600">
                {stats.difficultyStats.length ? (stats.difficultyStats.reduce((acc, s) => acc + s.averageScore, 0) / stats.difficultyStats.length).toFixed(1) : '0'}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-500/10 p-6 border-2 border-blue-100/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Engagement</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Racha Promedio</span>
              <span className="text-lg font-bold text-gray-900">
                {users.length ? Math.round(users.reduce((acc, u) => acc + (u.currentStreak || 0), 0) / users.length) : 0} días
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Usuarios con Racha +7</span>
              <span className="text-lg font-bold text-gray-900">
                {users.filter(u => (u.currentStreak || 0) >= 7).length}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Retos Completados</span>
              <span className="text-lg font-bold text-gray-900">
                {(stats.totalChallenges || 0) - (stats.activeChallenges || 0)}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-600">Tasa de Retorno</span>
              <span className="text-lg font-bold text-green-600">
                {users.length ? ((users.filter(u => u.isActive).length / users.length) * 100).toFixed(1) : '0'}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-500/10 p-6 border-2 border-blue-100/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Economía Virtual</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Coins en Circulación</span>
              <span className="text-lg font-bold text-gray-900">
                {users.reduce((acc, u) => acc + (u.coins || 0), 0).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Items Canjeados</span>
              <span className="text-lg font-bold text-gray-900">
                {Math.floor(users.reduce((acc, u) => acc + (u.coins || 0), 0) * 0.05).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Coins/Usuario</span>
              <span className="text-lg font-bold text-gray-900">
                {users.length ? (users.reduce((acc, u) => acc + (u.coins || 0), 0) / users.length).toFixed(1) : '0'}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-600">Tasa de Conversión</span>
              <span className="text-lg font-bold text-green-600">
                {users.length ? ((users.filter(u => (u.coins || 0) > 0).length / users.length) * 100).toFixed(1) : '0'}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {showReportModal && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-blue-900/30 to-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full p-8 border-2 border-blue-200/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -mr-20 -mt-20"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/40">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-cyan-900 bg-clip-text text-transparent">Generar Reporte</h3>
              </div>

              <p className="text-gray-700 mb-6 font-medium">
                Selecciona el tipo de reporte que deseas generar y el rango de fechas
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Tipo de Reporte
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button
                      onClick={() => setReportType('general')}
                      className={`p-4 rounded-2xl border-2 transition-all font-semibold ${reportType === 'general'
                        ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-500 shadow-lg shadow-blue-500/20'
                        : 'bg-white border-gray-200 hover:border-blue-300'
                        }`}
                    >
                      <Activity className={`w-6 h-6 mx-auto mb-2 ${reportType === 'general' ? 'text-blue-600' : 'text-gray-400'}`} />
                      <p className="text-sm">General</p>
                    </button>
                    <button
                      onClick={() => setReportType('usuarios')}
                      className={`p-4 rounded-2xl border-2 transition-all font-semibold ${reportType === 'usuarios'
                        ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-500 shadow-lg shadow-blue-500/20'
                        : 'bg-white border-gray-200 hover:border-blue-300'
                        }`}
                    >
                      <Users className={`w-6 h-6 mx-auto mb-2 ${reportType === 'usuarios' ? 'text-blue-600' : 'text-gray-400'}`} />
                      <p className="text-sm">Usuarios</p>
                    </button>
                    <button
                      onClick={() => setReportType('progreso')}
                      className={`p-4 rounded-2xl border-2 transition-all font-semibold ${reportType === 'progreso'
                        ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-500 shadow-lg shadow-blue-500/20'
                        : 'bg-white border-gray-200 hover:border-blue-300'
                        }`}
                    >
                      <BookOpen className={`w-6 h-6 mx-auto mb-2 ${reportType === 'progreso' ? 'text-blue-600' : 'text-gray-400'}`} />
                      <p className="text-sm">Progreso</p>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      Fecha Inicio
                    </label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl border-2 border-blue-200/50 bg-white/80 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      Fecha Fin
                    </label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl border-2 border-blue-200/50 bg-white/80 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border-2 border-blue-200/50">
                  <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    El reporte incluirá:
                  </h4>
                  <ul className="space-y-2 text-sm text-blue-800 font-medium">
                    {reportType === 'general' && (
                      <>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                          Estadísticas generales de la plataforma
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                          Métricas de engagement y retención
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                          Distribución de usuarios por nivel
                        </li>
                      </>
                    )}
                    {reportType === 'usuarios' && (
                      <>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                          Datos completos de todos los usuarios
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                          Niveles, XP y coins por usuario
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                          Rachas y lecciones completadas
                        </li>
                      </>
                    )}
                    {reportType === 'progreso' && (
                      <>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                          Avance por tema y materia
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                          Tasa de éxito por tema
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                          Temas con mayor dificultad
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowReportModal(false)}
                  disabled={generating}
                  className="flex-1 px-6 py-3.5 rounded-2xl border-2 border-gray-300 hover:bg-gray-50 hover:shadow-lg font-bold transition-all disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleGenerateReport}
                  disabled={generating}
                  className="flex-1 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {generating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Generando...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Generar y Descargar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
