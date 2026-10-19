import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HijitosController } from './hijitos.controller.js';
import { HijitosService } from './hijitos.service.js';

@Module({ imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule.register({ timeout: 10000 })], controllers: [HijitosController], providers: [HijitosService] })
export class HijitosModule {}
