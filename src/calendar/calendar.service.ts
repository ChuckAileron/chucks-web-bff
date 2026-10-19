import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BackendProxyService } from '../common/backend-proxy.service.js';

@Injectable()
export class CalendarService extends BackendProxyService {
  private readonly base: string;
  constructor(http: HttpService, config: ConfigService) { super(http, config); this.base = `${this.backendUrl}/calendar`; }
  colors() { return this.forward(() => this.http.get(`${this.base}/colors`)); }
  list(start?: string, end?: string) { return this.forward(() => this.http.get(`${this.base}/events`, { params: { start, end } })); }
  create(body: Record<string, unknown>) { return this.forward(() => this.http.post(`${this.base}/events`, body)); }
  update(id: number, body: Record<string, unknown>) { return this.forward(() => this.http.patch(`${this.base}/events/${id}`, body)); }
  remove(id: number) { return this.forward(() => this.http.delete(`${this.base}/events/${id}`)); }
  holidays(year: string) { return this.forward(() => this.http.post(`${this.base}/holidays/${year}/refresh`)); }
}
