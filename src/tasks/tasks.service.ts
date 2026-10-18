import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BackendProxyService } from '../common/backend-proxy.service.js';

@Injectable()
export class TasksService extends BackendProxyService {
  private readonly baseUrl: string;

  constructor(http: HttpService, config: ConfigService) {
    super(http, config);
    this.baseUrl = `${this.backendUrl}/tasks`;
  }

  findAll() {
    return this.forward(() => this.http.get(this.baseUrl));
  }

  findOne(id: string) {
    return this.forward(() => this.http.get(`${this.baseUrl}/${id}`));
  }

  create(body: Record<string, unknown>) {
    return this.forward(() => this.http.post(this.baseUrl, body));
  }

  update(id: string, body: Record<string, unknown>) {
    return this.forward(() => this.http.patch(`${this.baseUrl}/${id}`, body));
  }

  remove(id: string) {
    return this.forward(() => this.http.delete(`${this.baseUrl}/${id}`));
  }
}
