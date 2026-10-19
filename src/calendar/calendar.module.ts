import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CalendarController } from './calendar.controller.js';
import { CalendarService } from './calendar.service.js';

@Module({ imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule.register({ timeout: 30000 })], controllers: [CalendarController], providers: [CalendarService] })
export class CalendarModule {}
