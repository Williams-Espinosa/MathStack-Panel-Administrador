import { useState, useEffect } from 'react';
import { UserService } from '../services/userService';
import type { User } from '../models/types';
import {
  Search,
  Filter,
  TrendingUp,
  Eye,
  Plus,
  Minus,
  MoreVertical,
  Users as UsersIcon,
  Zap,
  X,
  Star,
  Flame,
  BookOpen,
  Clock,
  Calendar,
  Trophy,
  CircleDollarSign,
  Activity,
  ChevronRight,
  Mail,
} from 'lucide-react';

function UserProfileModal({ user, onClose }: { user: User; onClose: () => void }) {
  const joinDate = new Date(user.joinedAt).toLocaleDateString('es-ES', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const lastActive = user.lastActive
    ? new Date(user.lastActive).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })
    : 'Nunca';

  const xpForNextLevel = (user.level + 1) * 500;
  const xpProgress = Math.min(100, Math.round((user.xp / xpForNextLevel) * 100));

  const avatarLetter = user.username.charAt(0).toUpperCase();

  const stats = [
    { label: 'Nivel actual', value: user.level, icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'XP Total', value: user.xp.toLocaleString(), icon: Zap, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Math Coins', value: user.coins.toLocaleString(), icon: CircleDollarSign, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { label: 'Lecciones', value: user.completedLessons, icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Racha actual', value: `${user.currentStreak} días`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Mejor racha', value: `${user.bestStreak} días`, icon: Trophy, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Min. practicados', value: user.minutesPracticed.toLocaleString(), icon: Clock, color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { label: 'Estado', value: user.isActive ? 'Activo' : 'Inactivo', icon: Activity, color: user.isActive ? 'text-green-500' : 'text-gray-400', bg: user.isActive ? 'bg-green-50' : 'bg-gray-50' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-72 overflow-hidden animate-[fadeIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-24 bg-gradient-to-br from-[#1e3a8a] via-[#2563EB] to-[#60a5fa]">
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pg" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pg)" />
          </svg>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${user.isActive ? 'bg-green-400/20 text-green-200 border border-green-400/30' : 'bg-gray-400/20 text-gray-200 border border-gray-400/30'
              }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${user.isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
              {user.isActive ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        </div>

        <div className="px-5 pb-5">
          <div className="flex items-end gap-3 -mt-8 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex items-center justify-center text-white text-xl font-bold shadow-xl ring-4 ring-white flex-shrink-0">
              {avatarLetter}
            </div>
            <div className="pb-1 min-w-0">
              <h2 className="text-base font-bold text-gray-900 truncate">{user.username}</h2>
              <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-500">Nivel {user.level + 1}</span>
              <span className="text-xs font-bold text-[#2563EB]">{xpProgress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#60a5fa]"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1.5 mb-5">
            {stats.map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className={`${bg} rounded-xl p-2 flex flex-col items-center text-center`}>
                <Icon className={`w-3.5 h-3.5 ${color} mb-0.5`} />
                <p className="text-xs font-bold text-gray-900 leading-tight">{value}</p>
                <p className="text-[9px] text-gray-500 font-medium leading-tight mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Info rows */}
          <div className="border-t border-gray-100 pt-3 space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Miembro desde</span>
              </div>
              <span className="font-semibold text-gray-800">{joinDate}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Activity className="w-4 h-4" />
                <span>Última actividad</span>
              </div>
              <span className="font-semibold text-gray-800">{lastActive}</span>
            </div>
            {user.lastPracticeDate && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Última práctica</span>
                </div>
                <span className="font-semibold text-gray-800">
                  {new Date(user.lastPracticeDate).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────
export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showCoinModal, setShowCoinModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [coinAmount, setCoinAmount] = useState(0);
  const [coinOperation, setCoinOperation] = useState<'add' | 'remove'>('add');

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    setLoading(true);
    const data = await UserService.getAllUsers();
    setUsers(data);
    setLoading(false);
  };

  const handleUpdateCoins = async () => {
    if (!selectedUser || coinAmount <= 0) return;
    try {
      const updated = await UserService.updateUserCoins(selectedUser.id, coinAmount, coinOperation);
      setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
      setShowCoinModal(false);
      setSelectedUser(null);
      setCoinAmount(0);
    } catch (error) {
      console.error('Failed to update coins:', error);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg font-bold text-gray-900">Gestión de Usuarios</h1>
        <p className="text-sm text-gray-500 mt-0.5">Administra usuarios y sus Math Coins</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Usuarios Totales', value: users.length, icon: UsersIcon, color: '#2563EB', bg: 'bg-blue-50' },
          { label: 'Usuarios Activos', value: users.filter((u) => u.isActive).length, icon: Zap, color: '#22C55E', bg: 'bg-green-50' },
          { label: 'Nivel Promedio', value: users.length ? Math.round(users.reduce((s, u) => s + u.level, 0) / users.length) : 0, icon: TrendingUp, color: '#F59E0B', bg: 'bg-amber-50' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-6 h-6" style={{ color }} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 w-[18px] h-[18px]" />
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#2563EB] focus:outline-none transition-all text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-semibold text-gray-600">
          <Filter className="w-4 h-4" />
          Filtros
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left py-3.5 px-5 text-xs font-bold text-gray-400 uppercase tracking-wide">Usuario</th>
                <th className="text-center py-3.5 px-4 text-xs font-bold text-gray-400 uppercase tracking-wide">Nivel</th>
                <th className="text-center py-3.5 px-4 text-xs font-bold text-gray-400 uppercase tracking-wide">XP</th>
                <th className="text-center py-3.5 px-4 text-xs font-bold text-gray-400 uppercase tracking-wide">Coins</th>
                <th className="text-center py-3.5 px-4 text-xs font-bold text-gray-400 uppercase tracking-wide">Racha</th>
                <th className="text-center py-3.5 px-4 text-xs font-bold text-gray-400 uppercase tracking-wide">Lecciones</th>
                <th className="text-center py-3.5 px-4 text-xs font-bold text-gray-400 uppercase tracking-wide">Estado</th>
                <th className="text-center py-3.5 px-4 text-xs font-bold text-gray-400 uppercase tracking-wide">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/70 transition-colors group">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{user.username}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-amber-50 text-amber-600 font-bold text-sm">
                      {user.level}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center text-sm font-semibold text-gray-700">
                    {user.xp.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-yellow-50 text-yellow-700 font-bold text-sm">
                      <CircleDollarSign className="w-3.5 h-3.5" />
                      {user.coins}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="text-sm font-semibold text-gray-700">{user.currentStreak}d</span>
                    <p className="text-xs text-gray-400">Máx: {user.bestStreak}</p>
                  </td>
                  <td className="py-3.5 px-4 text-center text-sm font-semibold text-gray-700">
                    {user.completedLessons}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${user.isActive ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
                      }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                      {user.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => { setSelectedUser(user); setCoinOperation('add'); setShowCoinModal(true); }}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-green-50 text-gray-400 hover:text-green-600 transition-colors"
                        title="Agregar Coins"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { setSelectedUser(user); setCoinOperation('remove'); setShowCoinModal(true); }}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                        title="Quitar Coins"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { setProfileUser(user); setShowProfile(true); }}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-gray-400 hover:text-[#2563EB] transition-colors"
                        title="Ver perfil"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfile && profileUser && (
        <UserProfileModal user={profileUser} onClose={() => { setShowProfile(false); setProfileUser(null); }} />
      )}

      {/* Coin Modal */}
      {showCoinModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(6px)' }}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-7">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {coinOperation === 'add' ? 'Agregar' : 'Quitar'} Math Coins
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              Usuario: <span className="font-semibold text-gray-800">{selectedUser.username}</span> · Saldo: <span className="font-bold text-yellow-600">{selectedUser.coins}</span>
            </p>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Cantidad</label>
              <input
                type="number"
                min="1"
                value={coinAmount || ''}
                onChange={(e) => setCoinAmount(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2563EB] focus:outline-none transition-colors text-lg font-bold"
                placeholder="0"
                autoFocus
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { setShowCoinModal(false); setSelectedUser(null); setCoinAmount(0); }}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 hover:bg-gray-50 font-semibold text-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdateCoins}
                disabled={coinAmount <= 0}
                className={`flex-1 py-3 rounded-xl font-bold text-white transition-all disabled:opacity-50 ${coinOperation === 'add' ? 'bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/25' : 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25'
                  }`}
              >
                {coinOperation === 'add' ? 'Agregar' : 'Quitar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
