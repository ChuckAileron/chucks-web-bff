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
export class BackendProxyService {
  protected readonly backendUrl: string;

  constructor(
    protected readonly http: HttpService,
    config: ConfigService,
  ) {
    this.backendUrl = config.get<string>(
      'BACKEND_URL',
      'http://localhost:3001',
    );
    const internalApiKey = config.get<string>('INTERNAL_API_KEY');
    const axiosCommonHeaders = this.http.axiosRef?.defaults?.headers?.common;
    if (internalApiKey && axiosCommonHeaders) {
      axiosCommonHeaders['x-internal-api-key'] = internalApiKey;
    }
  }

  protected async forward<T>(
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
