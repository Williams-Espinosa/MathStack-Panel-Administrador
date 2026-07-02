import { useState } from 'react';
import { AvatarService } from '../services/avatarService';
import type { Avatar } from '../models/types';
import { Wand2, Download, RefreshCw, Copy, Check } from 'lucide-react';

export function Avatars() {
  const [selectedStyle, setSelectedStyle] = useState('bottts');
  const [generatedAvatars, setGeneratedAvatars] = useState<Avatar[]>([]);
  const [customSeed, setCustomSeed] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const styles = AvatarService.getStyles();
  const stylePreviews = AvatarService.getStylePreviews();

  const handleGenerateMultiple = async () => {
    setGenerating(true);
    try {
      const avatars = await AvatarService.generateMultipleAvatars(selectedStyle, 12);
      setGeneratedAvatars(avatars);
    } catch (error) {
      console.error('Failed to generate avatars:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateCustom = async () => {
    if (!customSeed.trim()) return;

    setGenerating(true);
    try {
      const avatar = await AvatarService.generateAvatar(selectedStyle, customSeed);
      setGeneratedAvatars([avatar, ...generatedAvatars]);
      setCustomSeed('');
    } catch (error) {
      console.error('Failed to generate custom avatar:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="p-8 min-h-screen">
      <div className="mb-8 animate-[fadeIn_0.6s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600 flex items-center justify-center shadow-xl shadow-blue-500/50">
            <Wand2 className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">Generador de Avatares</h1>
        </div>
        <p className="text-gray-600 font-medium ml-15">
          Crea avatares únicos usando DiceBear API
        </p>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-500/10 p-6 mb-8 border-2 border-blue-100/50 animate-[fadeIn_0.8s_ease-out]">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Selecciona un Estilo</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {stylePreviews.map((preview) => (
            <button
              key={preview.style}
              onClick={() => setSelectedStyle(preview.style)}
              className={`group relative aspect-square rounded-2xl overflow-hidden border-4 transition-all ${selectedStyle === preview.style
                  ? 'border-blue-600 shadow-xl shadow-blue-500/40 scale-105'
                  : 'border-gray-200 hover:border-blue-300'
                }`}
            >
              <img
                src={preview.previewUrl}
                alt={preview.style}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                <p className="text-white text-xs font-medium truncate w-full">
                  {preview.style}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-[fadeIn_1s_ease-out]">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-500/10 p-6 border-2 border-blue-100/50">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Generación Automática</h3>
          <p className="text-gray-600 text-sm mb-6 font-medium">
            Genera 12 avatares aleatorios con el estilo seleccionado
          </p>

          <button
            onClick={handleGenerateMultiple}
            disabled={generating}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300 shadow-xl shadow-blue-500/40 disabled:opacity-50"
          >
            {generating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Generando...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generar Avatares
              </>
            )}
          </button>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-500/10 p-6 border-2 border-blue-100/50">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Generación Personalizada</h3>
          <p className="text-gray-600 text-sm mb-4 font-medium">
            Crea un avatar con un identificador específico
          </p>

          <div className="flex gap-3">
            <input
              type="text"
              value={customSeed}
              onChange={(e) => setCustomSeed(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerateCustom()}
              placeholder="Ej: user-123, robot-blue..."
              className="flex-1 px-4 py-3.5 rounded-2xl border-2 border-blue-200/70 bg-white/90 focus:border-blue-500 focus:outline-none transition-all shadow-md font-medium"
            />
            <button
              onClick={handleGenerateCustom}
              disabled={!customSeed.trim() || generating}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-xl hover:shadow-blue-500/40 transition-all disabled:opacity-50"
            >
              Crear
            </button>
          </div>
        </div>
      </div>

      {generatedAvatars.length > 0 && (
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-500/10 p-6 border-2 border-blue-100/50 animate-[fadeIn_1.2s_ease-out]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">
              Avatares Generados ({generatedAvatars.length})
            </h3>
            <button
              onClick={() => setGeneratedAvatars([])}
              className="text-sm text-red-600 hover:underline"
            >
              Limpiar Todo
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {generatedAvatars.map((avatar) => (
              <div
                key={avatar.id}
                className="group relative bg-gray-50 rounded-2xl p-4 hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-white">
                  <img
                    src={avatar.imageUrl}
                    alt={avatar.seed}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-gray-500 truncate">
                    <strong>Estilo:</strong> {avatar.style}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    <strong>ID:</strong> {avatar.seed}
                  </p>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleCopyUrl(avatar.imageUrl)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      title="Copiar URL"
                    >
                      {copiedUrl === avatar.imageUrl ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span className="text-xs font-medium">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span className="text-xs font-medium">Copiar</span>
                        </>
                      )}
                    </button>

                    <a
                      href={avatar.imageUrl}
                      download={`avatar-${avatar.seed}.svg`}
                      className="flex items-center justify-center p-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                      title="Descargar"
                    >
                      <Download className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {generatedAvatars.length === 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 text-center border-2 border-blue-200/50 shadow-xl shadow-blue-500/10 animate-[fadeIn_1.2s_ease-out]">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 shadow-xl shadow-blue-500/40 mx-auto mb-4 flex items-center justify-center">
            <Wand2 className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-900 to-cyan-900 bg-clip-text text-transparent mb-2">
            Genera Avatares Únicos
          </h3>
          <p className="text-gray-600 max-w-md mx-auto font-medium">
            Selecciona un estilo y genera avatares automáticamente, o crea uno
            personalizado con un identificador único.
          </p>
        </div>
      )}
    </div>
  );
}
