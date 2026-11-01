import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BackendProxyService } from '../common/backend-proxy.service.js';

@Injectable()
export class SitesService extends BackendProxyService {
  private readonly baseUrl: string;

  constructor(http: HttpService, config: ConfigService) {
    super(http, config);
    this.baseUrl = `${this.backendUrl}/sites`;
  }

  listContexts() { return this.forward(() => this.http.get(`${this.baseUrl}/contexts`)); }
  createContext(body: Record<string, unknown>) { return this.forward(() => this.http.post(`${this.baseUrl}/contexts`, body)); }
  deleteContext(id: number) { return this.forward(() => this.http.delete(`${this.baseUrl}/contexts/${id}`)); }
  listPages(id: number) { return this.forward(() => this.http.get(`${this.baseUrl}/contexts/${id}/pages`)); }
  addPage(id: number, body: Record<string, unknown>) { return this.forward(() => this.http.post(`${this.baseUrl}/contexts/${id}/pages`, body)); }
  recapturePage(id: number) { return this.forward(() => this.http.post(`${this.baseUrl}/pages/${id}/capture`)); }
  deletePage(id: number) { return this.forward(() => this.http.delete(`${this.baseUrl}/pages/${id}`)); }
}
