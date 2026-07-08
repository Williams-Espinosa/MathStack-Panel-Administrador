import { useState, useEffect } from 'react';
import { ChallengeService } from '../services/challengeService';
import type { Challenge } from '../models/types';
import { Plus, Edit, Trash2, Trophy, Calendar, Coins, TrendingUp, Users } from 'lucide-react';

export function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingChallengeId, setEditingChallengeId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: 'Aritmética',
    difficulty: 'intermediate' as Challenge['difficulty'],
    startDate: '',
    endDate: '',
    rewardCoins: 0,
    rewardXP: 0,
    targetScore: 80,
    createdBy: 'admin',
    isActive: true,
  });

  useEffect(() => {
    loadChallenges();
  }, []);

  const loadChallenges = async () => {
    setLoading(true);
    const data = await ChallengeService.getAllChallenges();
    setChallenges(data);
    setLoading(false);
  };

  const handleSubmitChallenge = async () => {
    if (!formData.title || !formData.description || !formData.startDate || !formData.endDate) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      if (editingChallengeId) {
        const updatedChallenge = await ChallengeService.updateChallenge(editingChallengeId, formData);
        setChallenges(challenges.map(c => c.id === editingChallengeId ? { ...c, ...updatedChallenge } : c));
      } else {
        const newChallenge = await ChallengeService.createChallenge(formData);
        setChallenges([...challenges, newChallenge]);
      }
      setShowCreateModal(false);
      setEditingChallengeId(null);
      setFormData({
        title: '',
        description: '',
        subject: 'Aritmética',
        difficulty: 'intermediate',
        startDate: '',
        endDate: '',
        rewardCoins: 0,
        rewardXP: 0,
        targetScore: 80,
        createdBy: 'admin',
        isActive: true,
      });
    } catch (error) {
      console.error('Failed to save challenge:', error);
    }
  };

  const handleDeleteChallenge = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este reto?')) return;

    try {
      await ChallengeService.deleteChallenge(id);
      setChallenges(challenges.filter((c) => c.id !== id));
    } catch (error) {
      console.error('Failed to delete challenge:', error);
    }
  };

  const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
    const colors = {
      beginner: 'bg-green-100 text-green-700',
      intermediate: 'bg-yellow-100 text-yellow-700',
      advanced: 'bg-red-100 text-red-700',
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-xl shadow-blue-500/30"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-blue-300/30 rounded-full animate-ping mx-auto"></div>
          </div>
          <p className="text-gray-600 font-medium">Cargando retos...</p>
        </div>
      </div>
    );
  }

  const activeChallenges = challenges.filter((c) => c.isActive);
  const inactiveChallenges = challenges.filter((c) => !c.isActive);

  return (
    <div className="p-8 min-h-screen">
      <div className="mb-8 animate-[fadeIn_0.6s_ease-out]">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600 flex items-center justify-center shadow-xl shadow-blue-500/50">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">Retos y Desafíos</h1>
            </div>
            <p className="text-gray-600 font-medium ml-15">Crea y gestiona retos para motivar a los estudiantes</p>
          </div>
          <button
            onClick={() => {
              setEditingChallengeId(null);
              setFormData({
                title: '',
                description: '',
                subject: 'Aritmética',
                difficulty: 'intermediate',
                startDate: '',
                endDate: '',
                rewardCoins: 0,
                rewardXP: 0,
                targetScore: 80,
                createdBy: 'admin',
                isActive: true,
              });
              setShowCreateModal(true);
            }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300 shadow-xl shadow-blue-500/40"
          >
            <Plus className="w-5 h-5" />
            Crear Reto
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-[fadeIn_0.8s_ease-out]">
        <div className="group bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-xl rounded-3xl shadow-xl shadow-blue-500/20 p-6 border-2 border-blue-200/50 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-blue-900 font-bold">Total Retos</p>
              <Trophy className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-5xl font-bold text-blue-900 mb-1">{challenges.length}</h3>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-green-50 to-emerald-100/50 backdrop-blur-xl rounded-3xl shadow-xl shadow-green-500/20 p-6 border-2 border-green-200/50 hover:shadow-2xl hover:shadow-green-500/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-green-900 font-bold">Retos Activos</p>
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-5xl font-bold text-green-900 mb-1">{activeChallenges.length}</h3>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-cyan-50 to-sky-100/50 backdrop-blur-xl rounded-3xl shadow-xl shadow-cyan-500/20 p-6 border-2 border-cyan-200/50 hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-cyan-900 font-bold">Participantes</p>
              <Users className="w-6 h-6 text-cyan-600" />
            </div>
            <h3 className="text-5xl font-bold text-cyan-900 mb-1">
              {challenges.reduce((sum, c) => sum + (c.participants || 0), 0)}
            </h3>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-amber-50 to-yellow-100/50 backdrop-blur-xl rounded-3xl shadow-xl shadow-amber-500/20 p-6 border-2 border-amber-200/50 hover:shadow-2xl hover:shadow-amber-500/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-amber-900 font-bold">Coins en Juego</p>
              <Coins className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-5xl font-bold text-amber-900 mb-1">
              {activeChallenges.reduce((sum, c) => sum + c.rewardCoins, 0)}
            </h3>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {activeChallenges.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Retos Activos</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeChallenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{challenge.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-medium capitalize ${getDifficultyColor(
                        challenge.difficulty
                      )}`}
                    >
                      {challenge.difficulty === 'beginner' ? 'Principiante' : challenge.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 rounded-2xl p-3">
                      <p className="text-xs text-blue-600 font-medium">Materia</p>
                      <p className="text-sm font-bold text-gray-900 mt-1">{challenge.subject}</p>
                    </div>
                    <div className="bg-green-50 rounded-2xl p-3">
                      <p className="text-xs text-green-600 font-medium">Meta</p>
                      <p className="text-sm font-bold text-gray-900 mt-1">{challenge.targetScore}%</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(challenge.startDate).toLocaleDateString('es-ES', {
                          month: 'short',
                          day: 'numeric',
                        })}{' '}
                        -{' '}
                        {new Date(challenge.endDate).toLocaleDateString('es-ES', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{challenge.participants}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Coins className="w-5 h-5 text-yellow-500" />
                        <span className="font-bold text-gray-900">{challenge.rewardCoins}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-500" />
                        <span className="font-bold text-gray-900">{challenge.rewardXP} XP</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-green-100 text-green-700 text-xs font-medium">
                      Activo
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        const toLocal = (dStr?: string) => dStr ? new Date(new Date(dStr).getTime() - new Date(dStr).getTimezoneOffset() * 60000).toISOString().slice(0, 16) : '';
                        setEditingChallengeId(challenge.id);
                        setFormData({
                          title: challenge.title || '',
                          description: challenge.description || '',
                          subject: challenge.subject || 'Aritmética',
                          difficulty: challenge.difficulty || 'intermediate',
                          startDate: toLocal(challenge.startDate),
                          endDate: toLocal(challenge.endDate),
                          rewardCoins: challenge.rewardCoins || 0,
                          rewardXP: challenge.rewardXP || 0,
                          targetScore: challenge.targetScore || 80,
                          createdBy: 'admin',
                          isActive: challenge.isActive,
                        });
                        setShowCreateModal(true);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="text-sm font-medium">Editar</span>
                    </button>
                    <button
                      onClick={() => handleDeleteChallenge(challenge.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Eliminar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {inactiveChallenges.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Retos Finalizados</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {inactiveChallenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-white rounded-3xl shadow-lg p-6 opacity-75 hover:opacity-100 transition-opacity"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{challenge.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium">
                      Finalizado
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{challenge.participants} participantes</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button 
                      onClick={() => {
                        const toLocal = (dStr?: string) => dStr ? new Date(new Date(dStr).getTime() - new Date(dStr).getTimezoneOffset() * 60000).toISOString().slice(0, 16) : '';
                        setEditingChallengeId(challenge.id);
                        setFormData({
                          title: challenge.title || '',
                          description: challenge.description || '',
                          subject: challenge.subject || 'Aritmética',
                          difficulty: challenge.difficulty || 'intermediate',
                          startDate: toLocal(challenge.startDate),
                          endDate: toLocal(challenge.endDate),
                          rewardCoins: challenge.rewardCoins || 0,
                          rewardXP: challenge.rewardXP || 0,
                          targetScore: challenge.targetScore || 80,
                          createdBy: 'admin',
                          isActive: challenge.isActive,
                        });
                        setShowCreateModal(true);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="text-sm font-medium">Editar</span>
                    </button>
                    <button
                      onClick={() => handleDeleteChallenge(challenge.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Eliminar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-blue-900/30 to-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full p-8 my-8 border-2 border-blue-200/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/40">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-cyan-900 bg-clip-text text-transparent">
                  {editingChallengeId ? 'Editar Reto' : 'Crear Nuevo Reto'}
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título del Reto
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl border-2 border-blue-200/50 bg-white/80 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 transition-all font-medium"
                    placeholder="Ej: Maestro del Álgebra"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl border-2 border-blue-200/50 bg-white/80 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 transition-all font-medium"
                    rows={3}
                    placeholder="Describe el objetivo del reto..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Materia
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl border-2 border-blue-200/50 bg-white/80 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 transition-all font-medium"
                    >
                      <option value="Aritmética">Aritmética</option>
                      <option value="Álgebra">Álgebra</option>
                      <option value="Cálculo Integral">Cálculo Integral</option>
                      <option value="Cálculo Diferencial">Cálculo Diferencial</option>
                      <option value="Cálculo de Varias Variables">Cálculo de Varias Variables</option>
                      <option value="Ecuaciones Diferenciales">Ecuaciones Diferenciales</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dificultad
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          difficulty: e.target.value as Challenge['difficulty'],
                        })
                      }
                      className="w-full px-4 py-3.5 rounded-2xl border-2 border-blue-200/50 bg-white/80 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 transition-all font-medium"
                    >
                      <option value="beginner">Principiante</option>
                      <option value="intermediate">Intermedio</option>
                      <option value="advanced">Avanzado</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Inicio
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                      className="w-full px-4 py-3.5 rounded-2xl border-2 border-blue-200/50 bg-white/80 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Fin
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                      className="w-full px-4 py-3.5 rounded-2xl border-2 border-blue-200/50 bg-white/80 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recompensa (Coins)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.rewardCoins}
                      onChange={(e) =>
                        setFormData({ ...formData, rewardCoins: Number(e.target.value) })
                      }
                      className="w-full px-4 py-3.5 rounded-2xl border-2 border-blue-200/50 bg-white/80 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recompensa (XP)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.rewardXP}
                      onChange={(e) =>
                        setFormData({ ...formData, rewardXP: Number(e.target.value) })
                      }
                      className="w-full px-4 py-3.5 rounded-2xl border-2 border-blue-200/50 bg-white/80 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Puntaje Meta (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.targetScore}
                      onChange={(e) =>
                        setFormData({ ...formData, targetScore: Number(e.target.value) })
                      }
                      className="w-full px-4 py-3.5 rounded-2xl border-2 border-blue-200/50 bg-white/80 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingChallengeId(null);
                  }}
                  className="flex-1 px-6 py-3.5 rounded-2xl border-2 border-gray-300 hover:bg-gray-50 hover:shadow-lg font-bold transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmitChallenge}
                  className="flex-1 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all"
                >
                  {editingChallengeId ? 'Guardar Cambios' : 'Crear Reto'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
