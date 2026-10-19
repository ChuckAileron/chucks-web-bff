import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WeightController } from './weight.controller.js';
import { WeightService } from './weight.service.js';

@Module({ imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule.register({ timeout: 10000 })], controllers: [WeightController], providers: [WeightService] })
export class WeightModule {}
