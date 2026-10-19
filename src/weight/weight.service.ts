import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BackendProxyService } from '../common/backend-proxy.service.js';

@Injectable()
export class WeightService extends BackendProxyService {
  private readonly base: string;
  constructor(http: HttpService, config: ConfigService) { super(http, config); this.base = `${this.backendUrl}/weight`; }
  state() { return this.forward(() => this.http.get(this.base)); }
  setTarget(body: { target: unknown }) { return this.forward(() => this.http.put(`${this.base}/target`, body)); }
  addEntry(body: { date: string; weight: unknown }) { return this.forward(() => this.http.post(`${this.base}/entries`, body)); }
  deleteEntry(date: string) { return this.forward(() => this.http.delete(`${this.base}/entries/${encodeURIComponent(date)}`)); }
}
