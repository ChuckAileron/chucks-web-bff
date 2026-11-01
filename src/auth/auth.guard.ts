import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { IS_PUBLIC_KEY } from './public.decorator.js';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly backendUrl = (process.env['BACKEND_URL'] || 'http://localhost:3001').replace(/\/$/, '');

  constructor(
    private readonly reflector: Reflector,
    private readonly http: HttpService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers.authorization;
    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Inicia sesión para continuar.');
    }
    try {
      await firstValueFrom(
        this.http.get(`${this.backendUrl}/auth/me`, {
          headers: { authorization, 'x-internal-api-key': '' },
          timeout: 5000,
        }),
      );
      return true;
    } catch {
      throw new UnauthorizedException('La sesión no es válida o ha caducado.');
    }
  }
}
