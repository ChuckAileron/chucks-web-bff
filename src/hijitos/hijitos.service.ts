import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BackendProxyService } from '../common/backend-proxy.service.js';

@Injectable()
export class HijitosService extends BackendProxyService {
  private readonly base: string;
  constructor(http: HttpService, config: ConfigService) { super(http, config); this.base = `${this.backendUrl}/hijitos`; }
  list() { return this.forward(() => this.http.get(this.base)); }
  banner() { return this.forward(() => this.http.get(`${this.base}/banner`)); }
  setBanner(body: { banner: string }) { return this.forward(() => this.http.put(`${this.base}/banner`, body)); }
  updateTrack(slug: string, body: Record<string, unknown>) { return this.forward(() => this.http.patch(`${this.base}/tracks/${encodeURIComponent(slug)}`, body)); }
  createTask(body: Record<string, unknown>) { return this.forward(() => this.http.post(`${this.base}/tasks`, body)); }
  updateTask(id: number, body: Record<string, unknown>) { return this.forward(() => this.http.patch(`${this.base}/tasks/${id}`, body)); }
  deleteTask(id: number) { return this.forward(() => this.http.delete(`${this.base}/tasks/${id}`)); }
  createSubtask(id: number, body: { description: string }) { return this.forward(() => this.http.post(`${this.base}/tasks/${id}/subtasks`, body)); }
  updateSubtask(id: number, body: Record<string, unknown>) { return this.forward(() => this.http.patch(`${this.base}/subtasks/${id}`, body)); }
  deleteSubtask(id: number) { return this.forward(() => this.http.delete(`${this.base}/subtasks/${id}`)); }
}
