import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BackendProxyService } from '../common/backend-proxy.service.js';

@Injectable()
export class CollectionsService extends BackendProxyService {
  private readonly baseUrl: string;

  constructor(http: HttpService, config: ConfigService) {
    super(http, config);
    this.baseUrl = `${this.backendUrl}/collections`;
  }

  list() {
    return this.forward(() => this.http.get(this.baseUrl));
  }

  get(id: number) {
    return this.forward(() => this.http.get(`${this.baseUrl}/${id}`));
  }

  create(body: Record<string, unknown>) {
    return this.forward(() => this.http.post(this.baseUrl, body));
  }

  update(id: number, body: Record<string, unknown>) {
    return this.forward(() => this.http.patch(`${this.baseUrl}/${id}`, body));
  }

  remove(id: number) {
    return this.forward(() => this.http.delete(`${this.baseUrl}/${id}`));
  }

  reorder(ids: number[]) {
    return this.forward(() =>
      this.http.put(`${this.baseUrl}/reorder`, { ids }),
    );
  }

  listItems(collectionId: number, q?: string) {
    return this.forward(() =>
      this.http.get(`${this.baseUrl}/${collectionId}/items`, {
        params: q?.trim() ? { q: q.trim() } : {},
      }),
    );
  }

  createItem(collectionId: number, body: Record<string, unknown>) {
    return this.forward(() =>
      this.http.post(`${this.baseUrl}/${collectionId}/items`, body),
    );
  }

  updateItem(itemId: number, body: Record<string, unknown>) {
    return this.forward(() =>
      this.http.patch(`${this.baseUrl}/items/${itemId}`, body),
    );
  }

  removeItem(itemId: number) {
    return this.forward(() =>
      this.http.delete(`${this.baseUrl}/items/${itemId}`),
    );
  }
}
