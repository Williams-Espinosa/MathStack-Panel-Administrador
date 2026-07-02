import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { AdminLayout } from './components/AdminLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Users } from './pages/Users';
import { Store } from './pages/Store';
import { Avatars } from './pages/Avatars';
import { Challenges } from './pages/Challenges';
import { Materials } from './pages/Materials';
import { Stats } from './pages/Stats';
import { Settings } from './pages/Settings';

export function AdminApp() {
  const { isAuthenticated, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc]">
        <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <Users />;
      case 'store':
        return <Store />;
      case 'avatars':
        return <Avatars />;
      case 'challenges':
        return <Challenges />;
      case 'materials':
        return <Materials />;
      case 'stats':
        return <Stats />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </AdminLayout>
  );
}
