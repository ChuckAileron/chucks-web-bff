import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BackendProxyService } from '../common/backend-proxy.service.js';

@Injectable()
export class WishlistService extends BackendProxyService {
  private readonly baseUrl: string;

  constructor(http: HttpService, config: ConfigService) {
    super(http, config);
    this.baseUrl = `${this.backendUrl}/wishlist`;
  }

  list(q?: string) {
    return this.forward(() =>
      this.http.get(this.baseUrl, {
        params: q?.trim() ? { q: q.trim() } : {},
      }),
    );
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

  addPrice(id: number, body: Record<string, unknown>) {
    return this.forward(() =>
      this.http.post(`${this.baseUrl}/${id}/prices`, body),
    );
  }

  removePrice(priceId: number) {
    return this.forward(() =>
      this.http.delete(`${this.baseUrl}/prices/${priceId}`),
    );
  }

  refreshPrice(priceId: number) {
    return this.forward(() =>
      this.http.post(`${this.baseUrl}/prices/${priceId}/refresh`, {}),
    );
  }

  refreshAll() {
    return this.forward(() => this.http.post(`${this.baseUrl}/refresh`, {}));
  }
}
