import { storeEndpoints } from '../api/endpoints';
import { fetchApi } from '../api/apiClient';
import type { StoreItem } from '../models/types';

export class StoreService {
  static async getAllItems(): Promise<StoreItem[]> {
    return fetchApi<StoreItem[]>(storeEndpoints.getAll);
  }

  static async createItem(item: Omit<StoreItem, 'id' | 'createdAt'>): Promise<StoreItem> {
    return fetchApi<StoreItem>(storeEndpoints.create, {
      method: 'POST',
      body: JSON.stringify(item),
    });
  }

  static async updateItem(id: string, updates: Partial<StoreItem>): Promise<StoreItem> {
    return fetchApi<StoreItem>(storeEndpoints.update(id), {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  static async deleteItem(id: string): Promise<void> {
    return fetchApi<void>(storeEndpoints.delete(id), {
      method: 'DELETE',
    });
  }
}
