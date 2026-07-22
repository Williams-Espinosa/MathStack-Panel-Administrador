import { useState, useEffect } from 'react';
import { StoreService } from '../services/storeService';
import type { StoreItem } from '../models/types';
import {
  Plus, Edit, Trash2, Search, TrendingUp, Sparkles,
  Users2, X, Tag, Percent, Calendar, CircleDollarSign,
  ImageIcon, AlignLeft, BadgePercent, CheckCircle,
} from 'lucide-react';

interface Promo {
  active: boolean;
  discount: number;
  label: string;
  endsAt: string;
}

type ItemWithPromo = StoreItem & { promo?: Promo };

const defaultPromo = (): Promo => ({
  active: false,
  discount: 10,
  label: 'Oferta',
  endsAt: '',
});

interface EditModalProps {
  item: ItemWithPromo | null;
  onClose: () => void;
  onSave: (data: Partial<ItemWithPromo> & { promo: Promo }) => void;
}

function EditModal({ item, onClose, onSave }: EditModalProps) {
  const isCreate = !item;

  const [name, setName] = useState(item?.name ?? '');
  const [description, setDescription] = useState(item?.description ?? '');
  const [price, setPrice] = useState(item?.price ?? 0);
  const [imageUrl, setImageUrl] = useState(item?.imageUrl ?? '');
  const [isAvailable, setIsAvailable] = useState(item?.isAvailable ?? true);
  const [promo, setPromo] = useState<Promo>(item?.promo ?? defaultPromo());

  const promoPrice = promo.active && promo.discount > 0
    ? Math.round(price * (1 - promo.discount / 100))
    : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!name.trim()) return alert('El nombre es obligatorio.');
    if (price <= 0) return alert('El precio debe ser mayor a 0.');
    onSave({ name, description, price, imageUrl, isAvailable, promo });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-[fadeIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
              {isCreate ? <Plus className="w-5 h-5 text-[#2563EB]" /> : <Edit className="w-5 h-5 text-[#2563EB]" />}
            </div>
            <h2 className="text-lg font-bold text-gray-900">
              {isCreate ? 'Subir nuevo avatar' : 'Editar avatar'}
            </h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-400 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-7 py-6 space-y-5 max-h-[75vh] overflow-y-auto">

          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2">
              <Tag className="w-4 h-4 text-gray-400" /> Nombre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Robot Espacial"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#2563EB] focus:outline-none transition-all text-sm"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2">
              <AlignLeft className="w-4 h-4 text-gray-400" /> Descripción
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe el avatar..."
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#2563EB] focus:outline-none transition-all text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2">
                <CircleDollarSign className="w-4 h-4 text-gray-400" /> Precio (coins)
              </label>
              <input
                type="number"
                min="0"
                value={price || ''}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="100"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#2563EB] focus:outline-none transition-all text-sm font-bold"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Disponibilidad</label>
              <button
                type="button"
                onClick={() => setIsAvailable(!isAvailable)}
                className={`w-full py-3 rounded-xl border text-sm font-semibold transition-all ${isAvailable
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-gray-200 bg-gray-50 text-gray-500'
                  }`}
              >
                {isAvailable ? '✓ Disponible' : '✗ No disponible'}
              </button>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2">
              <ImageIcon className="w-4 h-4 text-gray-400" /> Imagen del Avatar
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="URL o sube un archivo..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#2563EB] focus:outline-none transition-all text-sm"
              />
              <label className="cursor-pointer px-4 py-3 bg-[#2563EB] text-white rounded-xl text-sm font-bold hover:bg-[#1d4ed8] transition-colors flex items-center justify-center">
                Subir
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
            {imageUrl && (
              <div className="mt-2 w-16 h-16 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                <img src={imageUrl} alt="preview" className="w-full h-full object-contain" />
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-gray-200 overflow-hidden">
            <button
              type="button"
              onClick={() => setPromo({ ...promo, active: !promo.active })}
              className={`w-full flex items-center justify-between px-5 py-4 transition-colors ${promo.active ? 'bg-orange-50' : 'bg-gray-50 hover:bg-gray-100'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <BadgePercent className={`w-5 h-5 ${promo.active ? 'text-orange-500' : 'text-gray-400'}`} />
                <span className={`text-sm font-bold ${promo.active ? 'text-orange-700' : 'text-gray-600'}`}>
                  Promoción / Descuento
                </span>
              </div>
              <div className={`w-11 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 ${promo.active ? 'bg-orange-500' : 'bg-gray-300'}`}>
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${promo.active ? 'left-5' : 'left-0.5'}`} />
              </div>
            </button>

            {promo.active && (
              <div className="px-5 py-4 space-y-4 border-t border-orange-100 bg-orange-50/30">

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center gap-1 text-xs font-semibold text-gray-600 mb-1.5">
                      <Percent className="w-3.5 h-3.5" /> Descuento
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={promo.discount}
                        onChange={(e) => setPromo({ ...promo, discount: Math.min(99, Math.max(1, Number(e.target.value))) })}
                        className="w-full pl-4 pr-8 py-2.5 rounded-xl border border-orange-200 bg-white focus:border-orange-400 focus:outline-none text-sm font-bold"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center gap-1 text-xs font-semibold text-gray-600 mb-1.5">
                      <Tag className="w-3.5 h-3.5" /> Etiqueta
                    </label>
                    <input
                      type="text"
                      value={promo.label}
                      onChange={(e) => setPromo({ ...promo, label: e.target.value })}
                      placeholder="Oferta"
                      maxLength={16}
                      className="w-full px-4 py-2.5 rounded-xl border border-orange-200 bg-white focus:border-orange-400 focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1 text-xs font-semibold text-gray-600 mb-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Fecha de fin (opcional)
                  </label>
                  <input
                    type="date"
                    value={promo.endsAt}
                    onChange={(e) => setPromo({ ...promo, endsAt: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-orange-200 bg-white focus:border-orange-400 focus:outline-none text-sm"
                  />
                </div>

                {promoPrice !== null && (
                  <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-orange-200">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <div className="text-sm">
                      <span className="text-gray-400 line-through mr-2">{price} coins</span>
                      <span className="font-bold text-orange-600">{promoPrice} coins</span>
                      <span className="ml-2 text-xs bg-orange-100 text-orange-600 font-bold px-2 py-0.5 rounded-full">
                        -{promo.discount}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="px-7 py-5 border-t border-gray-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 font-semibold text-sm transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-sm transition-colors shadow-lg shadow-blue-500/25"
          >
            {isCreate ? 'Subir avatar' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Store() {
  const [items, setItems] = useState<ItemWithPromo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [editItem, setEditItem] = useState<ItemWithPromo | null>(null);

  useEffect(() => { loadItems(); }, []);

  const loadItems = async () => {
    setLoading(true);
    const data = await StoreService.getAllItems();
    setItems(data.filter((i) => i.category === 'avatar'));
    setLoading(false);
  };

  const handleSave = async (data: Partial<ItemWithPromo> & { promo: Promo }) => {
    if (editItem) {
      const updated: ItemWithPromo = { ...editItem, ...data };
      setItems(items.map((i) => (i.id === editItem.id ? updated : i)));
      setEditItem(null);
    } else {
      try {
        const created = await StoreService.createItem({
          name: data.name!,
          description: data.description,
          category: 'avatar',
          price: data.price!,
          imageUrl: data.imageUrl!,
          isAvailable: data.isAvailable ?? true,
        });
        setItems([...items, { ...created, promo: data.promo }]);
        setShowCreate(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este avatar?')) return;
    try {
      await StoreService.deleteItem(id);
      setItems(items.filter((i) => i.id !== id));
    } catch (e) { console.error(e); }
  };

  const filtered = items.filter((i) =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (i.description ?? '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValue = items.reduce((s, i) => s + i.price, 0);
  const available = items.filter((i) => i.isAvailable).length;
  const withPromo = items.filter((i) => i.promo?.active).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-12 h-12 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Tienda — Avatares</h1>
          <p className="text-sm text-gray-500 mt-0.5">Administra los avatares disponibles para canje</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          Subir Avatar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Avatares', value: items.length, sub: `${available} disponibles`, icon: Users2, color: '#2563EB', bg: 'bg-blue-50' },
          { label: 'Valor Total', value: `${totalValue.toLocaleString()}`, sub: 'coins en catálogo', icon: CircleDollarSign, color: '#F59E0B', bg: 'bg-yellow-50' },
          { label: 'Con Promoción', value: withPromo, sub: 'avatares en oferta', icon: BadgePercent, color: '#F97316', bg: 'bg-orange-50' },
        ].map(({ label, value, sub, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-6 h-6" style={{ color }} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-400">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar avatares..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-[#2563EB] focus:outline-none transition-all text-sm"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-gray-400" />
          </div>
          <p className="font-semibold text-gray-700">No se encontraron avatares</p>
          <p className="text-sm text-gray-400 mt-1">Intenta otra búsqueda o sube un nuevo avatar</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item) => {
            const promo = item.promo;
            const promoPrice = promo?.active && promo.discount > 0
              ? Math.round(item.price * (1 - promo.discount / 100))
              : null;

            return (
              <div
                key={item.id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden relative"
              >
                {promo?.active && (
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                    <Percent className="w-3 h-3" />
                    {promo.label || 'Oferta'} -{promo.discount}%
                  </div>
                )}

                <div className={`absolute top-3 right-3 z-10 w-2.5 h-2.5 rounded-full border-2 border-white shadow ${item.isAvailable ? 'bg-green-500' : 'bg-gray-400'}`} />

                <div className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex items-center justify-center">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 line-clamp-1">{item.name}</h3>
                  <p className="text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed">{item.description}</p>

                  <div className="flex items-center gap-2 mb-4">
                    {promoPrice !== null ? (
                      <>
                        <span className="text-lg font-bold text-orange-600">{promoPrice}</span>
                        <span className="text-xs text-gray-400 line-through">{item.price}</span>
                        <span className="text-xs font-semibold text-gray-500">coins</span>
                      </>
                    ) : (
                      <>
                        <span className="text-lg font-bold text-gray-900">{item.price}</span>
                        <span className="text-xs font-semibold text-gray-400">coins</span>
                      </>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditItem(item)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#2563EB] font-semibold text-xs transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 font-semibold text-xs transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showCreate && (
        <EditModal item={null} onClose={() => setShowCreate(false)} onSave={handleSave} />
      )}
      {editItem && (
        <EditModal item={editItem} onClose={() => setEditItem(null)} onSave={handleSave} />
      )}
    </div>
  );
}
