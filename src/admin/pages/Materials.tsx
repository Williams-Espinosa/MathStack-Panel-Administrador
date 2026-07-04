import { useState, useEffect } from 'react';
import { MaterialService } from '../services/materialService';
import type { LearningMaterial, Subject } from '../models/types';
import type { LessonTypeRecord } from '../models/database.types';
import { Plus, Edit, Trash2, BookOpen, FileText, Video, FileSpreadsheet, Clock } from 'lucide-react';

export function Materials() {
  const [materials, setMaterials] = useState<LearningMaterial[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [lessonTypes, setLessonTypes] = useState<LessonTypeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState<Partial<LearningMaterial>>({
    title: '',
    description: '',
    subjectId: 1,
    lessonTypeId: 1,
    difficultyLevel: 1,
    type: 'lesson',
    content: '',
    contentUrl: '',
    lessonId: '',
  });

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    setLoading(true);
    const [data, subjectsData, lessonTypesData] = await Promise.all([
      MaterialService.getAllMaterials(),
      MaterialService.getSubjects(),
      MaterialService.getLessonTypes(),
    ]);
    setMaterials(data);
    setSubjects(subjectsData);
    setLessonTypes(lessonTypesData);
    
    if (subjectsData.length > 0) {
      setFormData(prev => ({ ...prev, subjectId: subjectsData[0].id }));
    }
    if (lessonTypesData.length > 0) {
      setFormData(prev => ({ ...prev, lessonTypeId: lessonTypesData[0].id }));
    }
    setLoading(false);
  };

  const handleCreateMaterial = async () => {
    if (!formData.title || !formData.description) {
      alert('Por favor completa al menos el título y la descripción');
      return;
    }

    try {
      const newMaterial = await MaterialService.createMaterial(formData);
      setMaterials([...materials, newMaterial]);
      setShowCreateModal(false);
      setFormData(prev => ({
        ...prev,
        title: '',
        description: '',
        content: '',
        contentUrl: '',
      }));
    } catch (error) {
      console.error('Failed to create material:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, contentUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteMaterial = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este material?')) return;

    try {
      await MaterialService.deleteMaterial(id);
      setMaterials(materials.filter((m) => m.id !== id));
    } catch (error) {
      console.error('Failed to delete material:', error);
    }
  };

  const getTypeIcon = (type: LearningMaterial['type']) => {
    const icons = {
      lesson: BookOpen,
      exercise: FileText,
      video: Video,
      pdf: FileSpreadsheet,
    };
    return icons[type];
  };

  const getDifficultyColor = (difficulty: LearningMaterial['difficulty']) => {
    const colors = {
      beginner: 'bg-green-100 text-green-700',
      intermediate: 'bg-yellow-100 text-yellow-700',
      advanced: 'bg-red-100 text-red-700',
    };
    return colors[difficulty];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-xl shadow-blue-500/30"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-blue-300/30 rounded-full animate-ping mx-auto"></div>
          </div>
          <p className="text-gray-600 font-medium">Cargando material...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen">
      <div className="mb-8 animate-[fadeIn_0.6s_ease-out]">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600 flex items-center justify-center shadow-xl shadow-blue-500/50">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">Material de Aprendizaje</h1>
            </div>
            <p className="text-gray-600 font-medium ml-15">Gestiona lecciones, ejercicios y recursos educativos</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300 shadow-xl shadow-blue-500/40"
          >
            <Plus className="w-5 h-5" />
            Agregar Material
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-[fadeIn_0.8s_ease-out]">
        <div className="group bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-xl rounded-3xl shadow-xl shadow-blue-500/20 p-6 border-2 border-blue-200/50 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-blue-900 font-bold">Total Material</p>
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-5xl font-bold text-blue-900 mb-1">{materials.length}</h3>
          </div>
        </div>

        {[
          { type: 'lesson', color: 'green' },
          { type: 'exercise', color: 'cyan' },
          { type: 'video', color: 'amber' }
        ].map(({ type, color }) => (
          <div key={type} className={`group bg-gradient-to-br from-${color}-50 to-${color === 'cyan' ? 'sky' : color === 'amber' ? 'yellow' : 'emerald'}-100/50 backdrop-blur-xl rounded-3xl shadow-xl shadow-${color}-500/20 p-6 border-2 border-${color}-200/50 hover:shadow-2xl hover:shadow-${color}-500/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden`}>
            <div className={`absolute inset-0 bg-gradient-to-br from-${color}-100/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            <div className="relative z-10">
              <p className={`text-${color}-900 font-bold text-sm capitalize mb-2`}>{type}s</p>
              <h3 className={`text-5xl font-bold text-${color}-900 mb-1`}>
                {materials.filter((m) => m.type === type).length}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-500/10 overflow-hidden border-2 border-blue-100/50 animate-[fadeIn_1s_ease-out]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-bold text-blue-900">Material</th>
                <th className="text-center py-4 px-6 text-sm font-bold text-blue-900">Tipo</th>
                <th className="text-center py-4 px-6 text-sm font-bold text-blue-900">Materia</th>
                <th className="text-center py-4 px-6 text-sm font-bold text-blue-900">Dificultad</th>
                <th className="text-center py-4 px-6 text-sm font-bold text-blue-900">Duración</th>
                <th className="text-center py-4 px-6 text-sm font-bold text-blue-900">XP</th>
                <th className="text-center py-4 px-6 text-sm font-bold text-blue-900">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => {
                const TypeIcon = getTypeIcon(material.type);

                return (
                  <tr key={material.id} className="border-b border-blue-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent transition-all">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{material.title}</p>
                        <p className="text-sm text-gray-500 line-clamp-1">{material.description}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50">
                        <TypeIcon className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700 capitalize">
                          {material.type}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center font-medium text-gray-900">
                      {material.subject}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-flex px-3 py-1 rounded-lg text-xs font-medium ${getDifficultyColor(
                          material.difficulty
                        )}`}
                      >
                        {material.difficulty}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="inline-flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">{material.estimatedTime} min</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg bg-purple-100 text-purple-700 font-medium">
                        +{material.xpReward} XP
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 rounded-lg hover:bg-blue-100 text-blue-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMaterial(material.id)}
                          className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-blue-900/30 to-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full p-8 my-8 border-2 border-blue-200/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/40">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-cyan-900 bg-clip-text text-transparent">Agregar Nuevo Material</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl border-2 border-blue-200/50 bg-white/80 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 transition-all font-medium"
                    placeholder="Ej: Introducción a las Derivadas"
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
                    placeholder="Describe el contenido del material..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          type: e.target.value as LearningMaterial['type'],
                        })
                      }
                      className="w-full px-4 py-3.5 rounded-2xl border-2 border-blue-200/50 bg-white/80 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 transition-all font-medium"
                    >
                      <option value="lesson">Lección</option>
                      <option value="exercise">Ejercicio</option>
                      <option value="video">Video</option>
                      <option value="pdf">PDF</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Materia
                    </label>
                    <select
                      value={formData.subjectId}
                      onChange={(e) => setFormData({ ...formData, subjectId: Number(e.target.value) })}
                      className="w-full px-4 py-3.5 rounded-2xl border-2 border-blue-200/50 bg-white/80 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 transition-all font-medium"
                    >
                      {subjects.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dificultad
                    </label>
                    <select
                      value={formData.difficultyLevel}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          difficultyLevel: Number(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3.5 rounded-2xl border-2 border-blue-200/50 bg-white/80 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 transition-all font-medium"
                    >
                      <option value={1}>Principiante</option>
                      <option value={5}>Intermedio</option>
                      <option value={10}>Avanzado</option>
                    </select>
                  </div>

                  {formData.type === 'exercise' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lección Padre (Requerido para Ejercicios)
                      </label>
                      <select
                        value={formData.lessonId || ''}
                        onChange={(e) => setFormData({ ...formData, lessonId: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-2xl border-2 border-blue-200/50 bg-white/80 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 transition-all font-medium"
                      >
                        <option value="">Selecciona una lección</option>
                        {materials.filter(m => m.type === 'lesson').map(l => (
                          <option key={l.id} value={l.id}>{l.title}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Legacy fields that are not supported by the backend are hidden or removed here, but we will leave them hidden if needed, or remove them */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL del Contenido (opcional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.contentUrl}
                      onChange={(e) => setFormData({ ...formData, contentUrl: e.target.value })}
                      className="flex-1 px-4 py-3.5 rounded-2xl border-2 border-blue-200/50 bg-white/80 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 transition-all font-medium"
                      placeholder="https://... o selecciona un archivo"
                    />
                    <label className="cursor-pointer px-6 py-3.5 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 transition-colors flex items-center justify-center">
                      Subir
                      <input type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contenido (opcional)
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl border-2 border-blue-200/50 bg-white/80 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 transition-all font-medium"
                    rows={4}
                    placeholder="Contenido del material en texto..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3.5 rounded-2xl border-2 border-gray-300 hover:bg-gray-50 hover:shadow-lg font-bold transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateMaterial}
                  className="flex-1 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all"
                >
                  Agregar Material
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
