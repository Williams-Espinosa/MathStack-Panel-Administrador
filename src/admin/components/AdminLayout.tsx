import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Trophy,
  BookOpen,
  ImageIcon,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'Usuarios', icon: Users },
  { id: 'store', label: 'Tienda', icon: ShoppingBag },
  { id: 'challenges', label: 'Retos', icon: Trophy },
  { id: 'materials', label: 'Material', icon: BookOpen },
  { id: 'avatars', label: 'Avatares', icon: ImageIcon },
  { id: 'stats', label: 'Estadísticas', icon: BarChart3 },
  { id: 'settings', label: 'Configuración', icon: Settings },
];

const pageNames: Record<string, string> = {
  dashboard: 'Dashboard',
  users: 'Usuarios',
  store: 'Tienda',
  challenges: 'Retos',
  materials: 'Material Educativo',
  avatars: 'Avatares',
  stats: 'Estadísticas',
  settings: 'Configuración',
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días';
  if (hour < 18) return 'Buenas tardes';
  return 'Buenas noches';
}

export function AdminLayout({ children, currentPage, onNavigate }: AdminLayoutProps) {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'AD';

  return (
    <div className="flex h-screen bg-[#f8f9fc] overflow-hidden">

      <aside className="hidden lg:flex flex-col w-[100px] bg-white border-r border-gray-100 shadow-sm z-30 flex-shrink-0">

        <div className="flex items-center justify-center h-[80px] border-b border-gray-100">
          <div className="w-13 h-13 w-[52px] h-[52px] rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex items-center justify-center shadow-lg shadow-blue-500/30">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="13" width="4" height="7" rx="1" fill="white" />
              <rect x="10" y="9" width="4" height="11" rx="1" fill="white" opacity="0.8" />
              <rect x="16" y="4" width="4" height="16" rx="1" fill="white" opacity="0.6" />
            </svg>
          </div>
        </div>

        <nav className="flex-1 flex flex-col items-center py-5 gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <div key={item.id} className="relative w-full flex justify-center">
                <button
                  onClick={() => onNavigate(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`w-[68px] h-[68px] flex items-center justify-center rounded-2xl transition-all duration-200 ${isActive
                    ? 'bg-[#2563EB] text-white shadow-xl shadow-blue-500/35 scale-105'
                    : 'text-gray-400 hover:bg-blue-50 hover:text-[#2563EB]'
                    }`}
                >
                  <Icon className="w-7 h-7" />
                </button>

                {hoveredItem === item.id && (
                  <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
                    <div className="bg-gray-900 text-white text-base font-semibold px-4 py-2.5 rounded-xl whitespace-nowrap shadow-2xl flex items-center gap-2.5">
                      <Icon className="w-5 h-5 opacity-70" />
                      {item.label}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-[7px] border-transparent border-r-gray-900" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex flex-col items-center pb-5 gap-3 border-t border-gray-100 pt-4">
          <div className="relative w-full flex justify-center">
            <button
              onClick={handleLogout}
              onMouseEnter={() => setHoveredItem('logout')}
              onMouseLeave={() => setHoveredItem(null)}
              className="w-[68px] h-[68px] flex items-center justify-center rounded-2xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
            >
              <LogOut className="w-7 h-7" />
            </button>
            {hoveredItem === 'logout' && (
              <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
                <div className="bg-gray-900 text-white text-base font-semibold px-4 py-2.5 rounded-xl whitespace-nowrap shadow-2xl flex items-center gap-2.5">
                  <LogOut className="w-5 h-5 opacity-70" />
                  Cerrar Sesión
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-[7px] border-transparent border-r-gray-900" />
                </div>
              </div>
            )}
          </div>

          <div
            className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex items-center justify-center text-white text-base font-bold cursor-pointer ring-2 ring-white shadow-md"
            title={user?.name || 'Admin'}
          >
            {initials}
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative flex flex-col w-72 bg-white shadow-2xl z-10">
            <div className="flex items-center justify-between px-5 h-20 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex items-center justify-center shadow-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="13" width="4" height="7" rx="1" fill="white" />
                    <rect x="10" y="9" width="4" height="11" rx="1" fill="white" opacity="0.8" />
                    <rect x="16" y="4" width="4" height="16" rx="1" fill="white" opacity="0.6" />
                  </svg>
                </div>
                <span className="text-lg font-bold text-gray-900">MathStack</span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 ${isActive
                      ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/30'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                  >
                    <Icon className="w-6 h-6 flex-shrink-0" />
                    <span className="text-base font-semibold">{item.label}</span>
                    {isActive && <ChevronRight className="w-5 h-5 ml-auto" />}
                  </button>
                );
              })}
            </nav>
            <div className="p-5 border-t border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex items-center justify-center text-white text-sm font-bold">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-gray-900 truncate">{user?.name || 'Admin'}</p>
                  <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors text-base font-semibold"
              >
                <LogOut className="w-5 h-5" />
                Cerrar Sesión
              </button>
            </div>
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        <header className="flex-shrink-0 h-[80px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shadow-sm z-20">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-900 leading-tight">
                {getGreeting()}, {user?.name?.split(' ')[0] || 'Admin'}!
              </h2>
              <p className="text-sm text-gray-500 font-medium leading-tight">{pageNames[currentPage] || 'MathStack'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 w-64 focus-within:border-blue-300 focus-within:bg-white transition-all duration-200">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-transparent text-base text-gray-700 placeholder-gray-400 outline-none w-full"
              />
            </div>

            <button className="relative w-11 h-11 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#2563EB] rounded-full border-2 border-white" />
            </button>

            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex items-center justify-center text-white text-base font-bold shadow-md cursor-pointer ring-2 ring-white ring-offset-1">
              {initials}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
