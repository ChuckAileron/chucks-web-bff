import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BackendProxyService } from '../common/backend-proxy.service.js';

@Injectable()
export class LaunchboxService extends BackendProxyService {
  private readonly baseUrl: string;

  constructor(http: HttpService, config: ConfigService) {
    super(http, config);
    this.baseUrl = `${this.backendUrl}/launchbox`;
  }

  single(body: Record<string, unknown>) {
    return this.forward(() => this.http.post(`${this.baseUrl}/single`, body));
  }

  applyOne(body: Record<string, unknown>) {
    return this.forward(() =>
      this.http.post(`${this.baseUrl}/apply-one`, body),
    );
  }

  parseCsv(body: Record<string, unknown>) {
    return this.forward(() =>
      this.http.post(`${this.baseUrl}/csv/parse`, body),
    );
  }

  matchRows(body: Record<string, unknown>) {
    return this.forward(() =>
      this.http.post(`${this.baseUrl}/match-rows`, body),
    );
  }

  startBulk(body: Record<string, unknown>) {
    return this.forward(() => this.http.post(`${this.baseUrl}/bulk`, body));
  }

  job(jobId: string) {
    return this.forward(() => this.http.get(`${this.baseUrl}/bulk/${jobId}`));
  }

  jobResults(jobId: string) {
    return this.forward(() =>
      this.http.get(`${this.baseUrl}/bulk/${jobId}/results`),
    );
  }

  cancelJob(jobId: string) {
    return this.forward(() =>
      this.http.post(`${this.baseUrl}/bulk/${jobId}/cancel`, {}),
    );
  }

  applyBulk(body: Record<string, unknown>) {
    return this.forward(() =>
      this.http.post(`${this.baseUrl}/apply-bulk`, body),
    );
  }

  applyResultsCsv(body: Record<string, unknown>) {
    return this.forward(() =>
      this.http.post(`${this.baseUrl}/apply-results-csv`, body),
    );
  }
}
