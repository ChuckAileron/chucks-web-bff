import { HttpService } from '@nestjs/axios';
import {
  BadGatewayException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, type AxiosResponse } from 'axios';
import { type Observable, firstValueFrom } from 'rxjs';

@Injectable()
export class TasksService {
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpService,
    config: ConfigService,
  ) {
    const backendUrl = config.get<string>(
      'BACKEND_URL',
      'http://localhost:3001',
    );
    this.baseUrl = `${backendUrl}/tasks`;
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

  private async forward<T>(
    fn: () => Observable<AxiosResponse<T>>,
  ): Promise<T> {
    try {
      const response = await firstValueFrom(fn());
      return response.data;
    } catch (error) {
      throw this.toHttpException(error);
    }
  }

  private toHttpException(error: unknown): Error {
    if (error instanceof AxiosError && error.response) {
      return new HttpException(error.response.data, error.response.status);
    }
    return new BadGatewayException('Backend unavailable');
  }
}
