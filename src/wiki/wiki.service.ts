import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BackendProxyService } from '../common/backend-proxy.service.js';

@Injectable()
export class WikiService extends BackendProxyService {
  private readonly baseUrl: string;

  constructor(http: HttpService, config: ConfigService) {
    super(http, config);
    this.baseUrl = `${this.backendUrl}/wiki`;
  }

  list(query?: string) {
    return this.forward(() => this.http.get(`${this.baseUrl}/pages`, {
      params: query?.trim() ? { q: query.trim() } : {},
    }));
  }

  categories() {
    return this.forward(() => this.http.get(`${this.baseUrl}/categories`));
  }

  stats() {
    return this.forward(() => this.http.get(`${this.baseUrl}/stats`));
  }

  setCategoryBanner(body: { category: string; banner: string }) {
    return this.forward(() => this.http.post(`${this.baseUrl}/categories/banner`, body));
  }

  get(id: number) {
    return this.forward(() => this.http.get(`${this.baseUrl}/pages/${id}`));
  }

  create(body: Record<string, unknown>) {
    return this.forward(() => this.http.post(`${this.baseUrl}/pages`, body));
  }

  update(id: number, body: Record<string, unknown>) {
    return this.forward(() => this.http.patch(`${this.baseUrl}/pages/${id}`, body));
  }

  remove(id: number) {
    return this.forward(() => this.http.delete(`${this.baseUrl}/pages/${id}`));
  }
}
