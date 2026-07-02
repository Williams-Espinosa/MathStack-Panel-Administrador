import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { AuthService } from '../services/authService';
import type { AdminUser } from '../models/types';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Shield,
  Zap,
  BarChart3,
} from 'lucide-react';

type View = 'login' | 'forgot' | 'sent';

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" fill="#4285F4" />
      <path d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z" fill="#34A853" />
      <path d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z" fill="#FBBC05" />
      <path d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z" fill="#EA4335" />
    </svg>
  );
}

function BrandPanel() {
  const features = [
    { icon: BarChart3, text: 'Estadísticas en tiempo real' },
    { icon: Zap, text: 'Gestión de gamificación' },
    { icon: Shield, text: 'Panel seguro y confiable' },
  ];

  return (
    <div className="hidden lg:flex flex-col w-[45%] bg-gradient-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#2563EB] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute top-1/3 -left-20 w-64 h-64 bg-white/5 rounded-full" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-white/5 rounded-full" />
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full p-12">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="13" width="4" height="7" rx="1" fill="white" />
              <rect x="10" y="9" width="4" height="11" rx="1" fill="white" opacity="0.8" />
              <rect x="16" y="4" width="4" height="16" rx="1" fill="white" opacity="0.6" />
            </svg>
          </div>
          <span className="text-white text-xl font-bold tracking-tight">MathStack</span>
        </div>
        <div>
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Panel de Administración</span>
          </div>

          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Gestiona tu<br />plataforma<br />educativa
          </h2>
          <p className="text-blue-200 text-lg leading-relaxed mb-10">
            Controla usuarios, estadísticas y contenido desde un solo lugar.
          </p>

          <div className="space-y-4">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/85 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: '', label: '' },
            { value: '', label: '' },
            { value: '', label: '' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center">
              <p className="text-white text-2xl font-bold">{value}</p>
              <p className="text-blue-200 text-sm font-medium mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Login() {
  const { loginWithGoogle } = useAuth();
  const [view, setView] = useState<View>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState('');
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const { user, token } = await AuthService.loginWithEmail(email, password);
      AuthService.saveSession(user, token);
      window.location.reload();
    } catch {
      setError('Credenciales incorrectas. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
    } catch {
      setError('No se pudo iniciar sesión con Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      setResetError('Ingresa tu correo electrónico.');
      return;
    }
    setResetError('');
    setResetLoading(true);
    try {
      await AuthService.resetPassword(resetEmail);
      setView('sent');
    } catch {
      setResetError('No se pudo enviar el correo. Intenta de nuevo.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8f9fc]">
      <BrandPanel />
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="lg:hidden flex items-center gap-2.5 mb-10">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex items-center justify-center shadow-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="13" width="4" height="7" rx="1" fill="white" />
              <rect x="10" y="9" width="4" height="11" rx="1" fill="white" opacity="0.8" />
              <rect x="16" y="4" width="4" height="16" rx="1" fill="white" opacity="0.6" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900">MathStack</span>
        </div>

        <div className="w-full max-w-md">
          {view === 'login' && (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido de nuevo</h1>
                <p className="text-gray-500">Inicia sesión en tu panel de administración</p>
              </div>
              <button
                onClick={handleGoogle}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 py-3.5 rounded-2xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-sm disabled:opacity-50 mb-6"
              >
                <GoogleIcon />
                Continuar con Google
              </button>

              <div className="relative flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-sm text-gray-400 font-medium">o con tu correo</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <form onSubmit={handleLogin} className="space-y-5">
                {error && (
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@mathstack.com"
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-[#2563EB] focus:outline-none transition-colors text-base"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3.5 rounded-2xl border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-[#2563EB] focus:outline-none transition-colors text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <div
                      onClick={() => setRemember(!remember)}
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${remember
                          ? 'bg-[#2563EB] border-[#2563EB]'
                          : 'border-gray-300 hover:border-[#2563EB]'
                        }`}
                    >
                      {remember && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">Recordarme</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => { setView('forgot'); setResetEmail(email); setResetError(''); }}
                    className="text-sm font-semibold text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white py-4 rounded-2xl font-bold text-base transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Iniciando sesión...
                    </>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-gray-400 mt-8">
                MathStack Admin Panel &middot; v1.0
              </p>
            </>
          )}

          {view === 'forgot' && (
            <>
              <button
                onClick={() => setView('login')}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors mb-8 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al inicio de sesión
              </button>

              <div className="mb-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">
                  <Mail className="w-7 h-7 text-[#2563EB]" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Recuperar contraseña</h1>
                <p className="text-gray-500 leading-relaxed">
                  Ingresa el correo de tu cuenta y te enviaremos un enlace para restablecer tu contraseña.
                </p>
              </div>

              <form onSubmit={handleReset} className="space-y-5">
                {resetError && (
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {resetError}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="admin@mathstack.com"
                      autoFocus
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-[#2563EB] focus:outline-none transition-colors text-base"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={resetLoading}
                  className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white py-4 rounded-2xl font-bold text-base transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {resetLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar enlace de recuperación'
                  )}
                </button>
              </form>
            </>
          )}

          {view === 'sent' && (
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <div className="absolute inset-0 rounded-full bg-green-400/20 animate-ping" />
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-3">¡Correo enviado!</h1>
              <p className="text-gray-500 leading-relaxed mb-3">
                Enviamos un enlace de recuperación a
              </p>
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2 mb-8">
                <Mail className="w-4 h-4 text-[#2563EB]" />
                <span className="text-[#2563EB] font-semibold text-sm">{resetEmail}</span>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-8 text-left">
                <p className="text-amber-700 text-sm font-medium mb-1">¿No recibiste el correo?</p>
                <p className="text-amber-600 text-sm">
                  Revisa tu carpeta de spam o{' '}
                  <button
                    onClick={() => setView('forgot')}
                    className="font-semibold underline hover:no-underline"
                  >
                    intenta de nuevo
                  </button>
                  .
                </p>
              </div>

              <button
                onClick={() => { setView('login'); setResetEmail(''); }}
                className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white py-4 rounded-2xl font-bold text-base transition-all duration-200 shadow-lg shadow-blue-500/30"
              >
                Volver al inicio de sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
