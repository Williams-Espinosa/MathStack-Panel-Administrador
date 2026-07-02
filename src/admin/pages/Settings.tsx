import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Bell, Shield, Save, Key, Eye, EyeOff } from 'lucide-react';

type Tab = 'profile' | 'notifications' | 'security';

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
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    adminName: user?.name || 'Admin User',
    adminEmail: user?.email || 'admin@mathstack.com',
    emailNotifications: true,
    challengeAlerts: true,
    userReports: false,
    systemUpdates: true,
    twoFactorAuth: false,
    sessionTimeout: 30,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'security', label: 'Seguridad', icon: Shield },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const initials = settings.adminName
    .split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="p-6 max-w-2xl space-y-6">
      <div>
        <h1 className="text-lg font-bold text-gray-900">Configuración</h1>
        <p className="text-sm text-gray-500 mt-0.5">Gestiona tu cuenta y preferencias</p>
      </div>

      <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-2xl w-fit">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === id
                ? 'bg-white text-[#2563EB] shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex items-center justify-center text-white text-xl font-bold shadow-lg flex-shrink-0">
              {initials}
            </div>
            <div>
              <p className="font-bold text-gray-900">{settings.adminName}</p>
              <p className="text-sm text-gray-400">{user?.role === 'super_admin' ? 'Super Admin' : 'Administrador'}</p>
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
                value={user?.role === 'super_admin' ? 'Super Admin' : 'Administrador'}
                disabled
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-400 text-sm cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
          {[
            { key: 'emailNotifications', label: 'Notificaciones por Email', desc: 'Recibe alertas importantes por correo' },
            { key: 'challengeAlerts', label: 'Alertas de Retos', desc: 'Cuando se crea o completa un reto' },
            { key: 'userReports', label: 'Reportes de Usuarios', desc: 'Alertas de reportes o problemas' },
            { key: 'systemUpdates', label: 'Actualizaciones del Sistema', desc: 'Mantenimiento y novedades' },
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
      )}

      {activeTab === 'security' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-800">Autenticación de dos factores</p>
              <p className="text-xs text-gray-400 mt-0.5">Agrega una capa extra de seguridad</p>
            </div>
            <Toggle
              checked={settings.twoFactorAuth}
              onChange={(v) => setSettings({ ...settings, twoFactorAuth: v })}
            />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Tiempo de expiración de sesión
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({ ...settings, sessionTimeout: Number(e.target.value) })}
                className="flex-1 accent-[#2563EB]"
              />
              <span className="w-20 text-center text-sm font-bold text-[#2563EB] bg-blue-50 px-3 py-1.5 rounded-xl">
                {settings.sessionTimeout} min
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Key className="w-4 h-4 text-[#2563EB]" />
              <p className="text-sm font-bold text-gray-800">Cambiar contraseña</p>
            </div>
            {[
              { key: 'currentPassword', label: 'Contraseña actual', placeholder: '••••••••' },
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
      )}

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
            ✓ Guardado correctamente
          </span>
        )}
      </div>
    </div>
  );
}
