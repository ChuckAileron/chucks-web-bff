import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BackendProxyService } from '../common/backend-proxy.service.js';

@Injectable()
export class ShoppingService extends BackendProxyService {
  private readonly baseUrl: string;

  constructor(http: HttpService, config: ConfigService) {
    super(http, config);
    this.baseUrl = `${this.backendUrl}/shopping`;
  }

  listContexts() {
    return this.forward(() => this.http.get(`${this.baseUrl}/contexts`));
  }

  createContext(body: Record<string, unknown>) {
    return this.forward(() => this.http.post(`${this.baseUrl}/contexts`, body));
  }

  deleteContext(id: number) {
    return this.forward(() => this.http.delete(`${this.baseUrl}/contexts/${id}`));
  }

  listItems(id: number, sort?: string) {
    return this.forward(() => this.http.get(`${this.baseUrl}/contexts/${id}/items`, { params: { sort } }));
  }

  addLinks(id: number, body: Record<string, unknown>) {
    return this.forward(() => this.http.post(`${this.baseUrl}/contexts/${id}/links`, body));
  }

  refreshItems(id: number) {
    return this.forward(() => this.http.post(`${this.baseUrl}/contexts/${id}/refresh`));
  }

  clearInactiveItems(id: number) {
    return this.forward(() => this.http.delete(`${this.baseUrl}/contexts/${id}/inactive`));
  }
}
