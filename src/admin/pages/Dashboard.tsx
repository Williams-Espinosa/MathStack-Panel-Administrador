import { useDashboard } from '../hooks/useDashboard';
import {
  Users,
  BookOpen,
  Trophy,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  RefreshCw,
  Star,
  Zap,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#2563EB', '#22C55E', '#FACC15', '#EF4444'];

function Sparkline({ data, color, positive }: { data: number[]; color: string; positive: boolean }) {
  const chartData = data.map((v, i) => ({ i, v }));
  return (
    <ResponsiveContainer width="100%" height={52}>
      <AreaChart data={chartData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`sg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.18} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={2}
          fill={`url(#sg-${color.replace('#', '')})`}
          dot={false}
          activeDot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  sub: string;
  change: number;
  sparkData: number[];
  color: string;
  icon: React.ReactNode;
  source: string;
}

function MetricCard({ label, value, sub, change, sparkData, color, icon, source }: MetricCardProps) {
  const positive = change >= 0;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900 leading-tight">{value}</p>
          <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
        </div>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + '18' }}>
          <span style={{ color }}>{icon}</span>
        </div>
      </div>
      <div className="-mx-1">
        <Sparkline data={sparkData} color={positive ? color : '#EF4444'} positive={positive} />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400 font-medium">{source}</p>
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
          }`}>
          {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {positive ? '+' : ''}{change.toFixed(1)}%
        </div>
      </div>
    </div>
  );
}

function makeSparkData(base: number, trend: 'up' | 'down' | 'flat', points = 12): number[] {
  const data: number[] = [];
  let current = base * 0.8;
  for (let i = 0; i < points; i++) {
    const noise = (Math.random() - 0.5) * base * 0.12;
    const trendDelta = trend === 'up' ? base * 0.02 : trend === 'down' ? -base * 0.015 : 0;
    current = Math.max(0, current + noise + trendDelta);
    data.push(Math.round(current));
  }
  return data;
}

export function Dashboard() {
  const { stats, loading, refresh } = useDashboard();

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-lg shadow-blue-500/20" style={{ borderWidth: 3 }} />
          <p className="text-sm text-gray-500 font-medium">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  const activeRate = stats.totalUsers > 0 ? Math.round((stats.activeUsers / stats.totalUsers) * 100) : 0;
  const lessonRate = stats.totalLessons > 0 ? Math.round((stats.completedLessons / stats.totalLessons) * 100) : 0;
  const challengeRate = stats.totalChallenges > 0 ? Math.round((stats.activeChallenges / stats.totalChallenges) * 100) : 0;

  const row1: MetricCardProps[] = [
    {
      label: 'Usuarios Totales',
      value: stats.totalUsers.toLocaleString(),
      sub: `${stats.activeUsers.toLocaleString()} activos hoy`,
      change: 4.1,
      sparkData: makeSparkData(stats.totalUsers, 'up'),
      color: '#2563EB',
      icon: <Users className="w-4 h-4" />,
      source: 'MathStack DB',
    },
    {
      label: 'Usuarios Activos',
      value: `${activeRate}%`,
      sub: `${stats.activeUsers.toLocaleString()} en 24h`,
      change: 3.5,
      sparkData: makeSparkData(activeRate, 'up'),
      color: '#22C55E',
      icon: <Zap className="w-4 h-4" />,
      source: 'Últimas 24 horas',
    },
    {
      label: 'Lecciones Completadas',
      value: stats.completedLessons.toLocaleString(),
      sub: `${lessonRate}% del total disponible`,
      change: 2.8,
      sparkData: makeSparkData(stats.completedLessons, 'up'),
      color: '#F59E0B',
      icon: <BookOpen className="w-4 h-4" />,
      source: `De ${stats.totalLessons.toLocaleString()} lecciones`,
    },
    {
      label: 'Retos Activos',
      value: stats.activeChallenges.toLocaleString(),
      sub: `${challengeRate}% del total`,
      change: -1.2,
      sparkData: makeSparkData(stats.activeChallenges, 'down'),
      color: '#8B5CF6',
      icon: <Trophy className="w-4 h-4" />,
      source: `De ${stats.totalChallenges.toLocaleString()} retos`,
    },
  ];

  const recentSections = [
    { label: 'Crecimiento de Usuarios', color: '#2563EB', icon: <Users className="w-4 h-4" /> },
    { label: 'Actividad por Materia', color: '#22C55E', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Nivel de Dificultad', color: '#F59E0B', icon: <AlertCircle className="w-4 h-4" /> },
    { label: 'Tasa de Éxito', color: '#8B5CF6', icon: <Star className="w-4 h-4" /> },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Resumen de rendimiento</h1>
          <p className="text-sm text-gray-500 mt-0.5">Métricas clave de MathStack en tiempo real</p>
        </div>
        <button
          onClick={refresh}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:text-[#2563EB] transition-all duration-200 shadow-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Actualizar
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {row1.map((card) => (
          <MetricCard key={card.label} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Crecimiento de Usuarios</h3>
              <p className="text-xs text-gray-400">Nuevos registros por día</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={stats.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="date"
                tickFormatter={(d) => new Date(d).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                stroke="#d1d5db"
                tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="#d1d5db"
                tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #f3f4f6',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                  padding: '10px 14px',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
                cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
              />
              <defs>
                <linearGradient id="lgBlue" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
              </defs>
              <Line
                type="monotone"
                dataKey="count"
                stroke="#2563EB"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: '#2563EB', stroke: '#fff', strokeWidth: 2 }}
                name="Nuevos Usuarios"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Actividad por Materia</h3>
              <p className="text-xs text-gray-400">Distribución de lecciones completadas</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="55%" height={200}>
              <PieChart>
                <Pie
                  data={stats.activityBySubject}
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={52}
                  dataKey="count"
                  paddingAngle={3}
                  stroke="none"
                >
                  {stats.activityBySubject.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid #f3f4f6',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                    padding: '10px 14px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2.5">
              {stats.activityBySubject.map((entry, i) => {
                const total = stats.activityBySubject.reduce((s, e) => s + e.count, 0);
                const pct = total ? Math.round((entry.count / total) * 100) : 0;
                return (
                  <div key={entry.subject} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-xs text-gray-700 font-medium flex-1 truncate">{entry.subject}</span>
                    <span className="text-xs font-bold text-gray-900">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center">
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Temas con Mayor Dificultad</h3>
            <p className="text-xs text-gray-400">Intentos vs. usuarios con dificultad por materia</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={stats.difficultyStats} barSize={18} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis
              dataKey="subjectName"
              stroke="#d1d5db"
              tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="#d1d5db"
              tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #f3f4f6',
                boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                padding: '10px 14px',
                fontSize: '12px',
                fontWeight: 600,
              }}
              cursor={{ fill: '#f9fafb' }}
            />
            <Legend wrapperStyle={{ paddingTop: '16px', fontSize: '12px', fontWeight: 600 }} />
            <defs>
              <linearGradient id="gradRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F87171" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
              <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>
            <Bar dataKey="usersStruggling" fill="url(#gradRed)" name="Con Dificultad" radius={[6, 6, 0, 0]} />
            <Bar dataKey="totalAttempts" fill="url(#gradBlue)" name="Intentos Totales" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Materia</th>
                <th className="text-right py-3 px-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Intentos</th>
                <th className="text-right py-3 px-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Tasa de Fallo</th>
                <th className="text-right py-3 px-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Promedio</th>
                <th className="text-right py-3 px-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Dificultad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stats.difficultyStats
                .sort((a, b) => (b.failureRate || 0) - (a.failureRate || 0))
                .map((stat) => (
                  <tr key={stat.subjectId} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-3 text-sm font-semibold text-gray-800">{stat.subjectName}</td>
                    <td className="py-3 px-3 text-right text-sm text-gray-600 font-medium">{stat.totalAttempts.toLocaleString()}</td>
                    <td className="py-3 px-3 text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${(stat.failureRate || 0) > 0.5
                        ? 'bg-red-50 text-red-600'
                        : (stat.failureRate || 0) > 0.35
                          ? 'bg-amber-50 text-amber-600'
                          : 'bg-green-50 text-green-600'
                        }`}>
                        {((stat.failureRate || 0) * 100).toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-sm text-gray-600 font-medium">{(stat.averageScore || 0).toFixed(1)}</td>
                    <td className="py-3 px-3 text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-600">
                        {stat.usersStruggling}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
