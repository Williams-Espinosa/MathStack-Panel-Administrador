import { storeEndpoints } from '../api/endpoints';
import { fetchApi } from '../api/apiClient';
import type { StoreItem } from '../models/types';

export class StoreService {
  static async getAllItems(): Promise<StoreItem[]> {
    const data = await fetchApi<any[]>(storeEndpoints.getAll);
    return data.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description || '',
      itemTypeId: item.itemTypeId,
      category: item.itemTypeId === 1 ? 'avatar' : 'item' as any,
      price: item.cost,
      imageUrl: item.assetUrl,
      isAvailable: true,
      stock: item.stock
    }));
  }

  static async createItem(item: Omit<StoreItem, 'id' | 'createdAt'>): Promise<StoreItem> {
    const payload = {
      itemTypeId: item.category === 'avatar' ? 1 : (item.itemTypeId || 1),
      name: item.name,
      cost: item.price,
      assetUrl: item.imageUrl
    };

    const data = await fetchApi<any>(storeEndpoints.create, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return {
      id: data.id,
      name: data.name,
      description: data.description || item.description || '',
      itemTypeId: data.itemTypeId,
      category: item.category,
      price: data.cost,
      imageUrl: data.assetUrl,
      isAvailable: true
    };
  }

  static async updateItem(id: string, updates: Partial<StoreItem>): Promise<StoreItem> {
    const payload: any = {};
    if (updates.name !== undefined) payload.name = updates.name;
    if (updates.price !== undefined) payload.cost = updates.price;
    if (updates.imageUrl !== undefined) payload.assetUrl = updates.imageUrl;
    if (updates.itemTypeId !== undefined) payload.itemTypeId = updates.itemTypeId;

    const data = await fetchApi<any>(storeEndpoints.update(id), {
      method: 'PATCH', // or PUT depending on backend, backend uses PUT /api/admin/store/items/:id usually, but let's leave it as is if it's PATCH or PUT
      body: JSON.stringify(payload),
    });

    return {
      id: data.id,
      name: data.name,
      description: data.description || '',
      itemTypeId: data.itemTypeId,
      category: data.itemTypeId === 1 ? 'avatar' : 'item' as any,
      price: data.cost,
      imageUrl: data.assetUrl,
      isAvailable: true
    };
  }

  static async deleteItem(id: string): Promise<void> {
    return fetchApi<void>(storeEndpoints.delete(id), {
      method: 'DELETE',
    });
  }
}
