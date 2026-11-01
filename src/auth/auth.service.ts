import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BackendProxyService } from '../common/backend-proxy.service.js';

@Injectable()
export class AuthService extends BackendProxyService {
  private readonly base: string;

  constructor(http: HttpService, config: ConfigService) {
    super(http, config);
    this.base = `${this.backendUrl}/auth`;
  }

  register(body: { email: string; password: string }) {
    return this.forward(() => this.http.post(`${this.base}/register`, body));
  }

  login(body: { email: string; password: string }) {
    return this.forward(() => this.http.post(`${this.base}/login`, body));
  }

  requestPasswordReset(body: { email: string }) {
    return this.forward(() => this.http.post(`${this.base}/password-reset/request`, body));
  }

  resetPassword(body: { token: string; password: string }) {
    return this.forward(() => this.http.post(`${this.base}/password-reset/confirm`, body));
  }
}
