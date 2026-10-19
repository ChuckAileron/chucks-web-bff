import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BackendProxyService } from '../common/backend-proxy.service.js';

@Injectable()
export class AccountsService extends BackendProxyService {
  private readonly base: string;
  constructor(http: HttpService, config: ConfigService) { super(http, config); this.base = `${this.backendUrl}/accounts`; }
  list() { return this.forward(() => this.http.get(this.base)); }
  get(id: number) { return this.forward(() => this.http.get(`${this.base}/${id}`)); }
  create(body: Record<string, unknown>) { return this.forward(() => this.http.post(this.base, body)); }
  update(id: number, body: Record<string, unknown>) { return this.forward(() => this.http.patch(`${this.base}/${id}`, body)); }
  delete(id: number) { return this.forward(() => this.http.delete(`${this.base}/${id}`)); }
  reorder(body: { ids: number[] }) { return this.forward(() => this.http.put(`${this.base}/reorder`, body)); }
  registers(id: number, q?: string) { return this.forward(() => this.http.get(`${this.base}/${id}/registers`, { params: q?.trim() ? { q } : {} })); }
  years(id: number) { return this.forward(() => this.http.get(`${this.base}/${id}/years`)); }
  monthly(id: number, year?: string) { return this.forward(() => this.http.get(`${this.base}/${id}/monthly`, { params: { year } })); }
  createRegister(body: Record<string, unknown>) { return this.forward(() => this.http.post(`${this.base}/registers`, body)); }
  updateRegister(id: number, body: Record<string, unknown>) { return this.forward(() => this.http.patch(`${this.base}/registers/${id}`, body)); }
  deleteRegister(id: number) { return this.forward(() => this.http.delete(`${this.base}/registers/${id}`)); }
}
