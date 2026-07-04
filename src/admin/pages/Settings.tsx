import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Bell, Shield, Save, Key, Eye, EyeOff } from 'lucide-react';
import { AuthService } from '../services/authService';
import type { AdminUser } from '../models/types';

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 ${checked ? 'bg-[#2563EB]' : 'bg-gray-200'}`}
    >
      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${checked ? 'left-5' : 'left-0.5'}`} />
    </button>
  );
}

export function Settings() {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('admin_settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        return {
          adminName: user?.username || parsed.adminName || 'Admin User',
          adminEmail: user?.email || parsed.adminEmail || 'admin@mathstack.com',
          emailNotifications: parsed.emailNotifications ?? true,
          challengeAlerts: parsed.challengeAlerts ?? true,
          newPassword: '',
          confirmPassword: '',
        };
      } catch (e) {
      }
    }
    return {
      adminName: user?.username || 'Admin User',
      adminEmail: user?.email || 'admin@mathstack.com',
      emailNotifications: true,
      challengeAlerts: true,
      newPassword: '',
      confirmPassword: '',
    };
  });

  useEffect(() => {
    if (user && !localStorage.getItem('admin_settings')) {
      setSettings(s => ({
        ...s,
        adminName: user.username,
        adminEmail: user.email,
      }));
    }
  }, [user]);

  const handleSave = () => {
    if (settings.newPassword || settings.confirmPassword) {
      if (settings.newPassword !== settings.confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
      }
    }

    const settingsToSave = {
      adminName: settings.adminName,
      adminEmail: settings.adminEmail,
      emailNotifications: settings.emailNotifications,
      challengeAlerts: settings.challengeAlerts,
    };
    localStorage.setItem('admin_settings', JSON.stringify(settingsToSave));

    if (user) {
      const updatedUser: AdminUser = {
        ...user,
        username: settings.adminName,
        email: settings.adminEmail,
      };
      const token = localStorage.getItem('admin_token') || '';
      AuthService.saveSession(updatedUser, token);
    }

    setSettings(s => ({
      ...s,
      newPassword: '',
      confirmPassword: '',
    }));

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const initials = settings.adminName
    .split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="p-6 max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Configuración</h1>
          <p className="text-sm text-gray-500 mt-0.5">Gestiona tu cuenta y preferencias</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all"
          >
            <Save className="w-4 h-4" />
            Guardar cambios
          </button>
          {saved && (
            <span className="text-sm font-semibold text-green-600 animate-[fadeIn_0.3s_ease-out]">
              ✓ Guardado
            </span>
          )}
        </div>
      </div>

      <div className="space-y-8">

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-5 h-5 text-[#2563EB]" />
            <h2 className="text-base font-bold text-gray-900">Perfil</h2>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex items-center justify-center text-white text-xl font-bold shadow-lg flex-shrink-0">
              {initials}
            </div>
            <div>
              <p className="font-bold text-gray-900">{settings.adminName}</p>
              <p className="text-sm text-gray-400">{user?.accessLevel === 'ADMIN' ? 'Administrador' : 'Usuario'}</p>
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                value={settings.adminName}
                onChange={(e) => setSettings({ ...settings, adminName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#2563EB] focus:outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Correo electrónico</label>
              <input
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#2563EB] focus:outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Rol</label>
              <input
                type="text"
                value={user?.accessLevel === 'ADMIN' ? 'Administrador' : 'Usuario'}
                disabled
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-400 text-sm cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-5 h-5 text-[#2563EB]" />
            <h2 className="text-base font-bold text-gray-900">Notificaciones</h2>
          </div>

          <div className="divide-y divide-gray-50 border border-gray-100 rounded-xl">
            {[
              { key: 'emailNotifications', label: 'Notificaciones por Email', desc: 'Recibe alertas importantes por correo' },
              { key: 'challengeAlerts', label: 'Alertas de Retos', desc: 'Cuando se crea o completa un reto' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
                <Toggle
                  checked={settings[key as keyof typeof settings] as boolean}
                  onChange={(v) => setSettings({ ...settings, [key]: v })}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-[#2563EB]" />
            <h2 className="text-base font-bold text-gray-900">Seguridad</h2>
          </div>

          <div className="border border-gray-100 rounded-xl px-6 py-5 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Key className="w-4 h-4 text-[#2563EB]" />
              <p className="text-sm font-bold text-gray-800">Cambiar contraseña</p>
            </div>
            {[
              { key: 'newPassword', label: 'Nueva contraseña', placeholder: '••••••••' },
              { key: 'confirmPassword', label: 'Confirmar contraseña', placeholder: '••••••••' },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={settings[key as keyof typeof settings] as string}
                    onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full px-4 pr-11 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#2563EB] focus:outline-none transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
