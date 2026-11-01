import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsEmail, IsString, MaxLength, MinLength, Matches } from 'class-validator';
import { AuthService } from './auth.service.js';
import { Public } from './public.decorator.js';

class CredentialsDto {
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsString()
  @MinLength(12)
  @MaxLength(128)
  password!: string;
}

class PasswordResetRequestDto {
  @IsEmail()
  @MaxLength(254)
  email!: string;
}

class PasswordResetConfirmDto {
  @IsString()
  @Matches(/^[a-f0-9]{64}$/i)
  token!: string;

  @IsString()
  @MinLength(12)
  @MaxLength(128)
  password!: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Get('me')
  me() {
    return { authenticated: true };
  }

  @Public()
  @Post('register')
  register(@Body() body: CredentialsDto) {
    return this.auth.register(body);
  }

  @Public()
  @Post('login')
  login(@Body() body: CredentialsDto) {
    return this.auth.login(body);
  }

  @Public()
  @Post('password-reset/request')
  requestPasswordReset(@Body() body: PasswordResetRequestDto) {
    return this.auth.requestPasswordReset(body);
  }

  @Public()
  @Post('password-reset/confirm')
  resetPassword(@Body() body: PasswordResetConfirmDto) {
    return this.auth.resetPassword(body);
  }
}
