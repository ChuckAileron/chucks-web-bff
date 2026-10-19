import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountsController } from './accounts.controller.js';
import { AccountsService } from './accounts.service.js';

@Module({ imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule.register({ timeout: 10000 })], controllers: [AccountsController], providers: [AccountsService] })
export class AccountsModule {}
