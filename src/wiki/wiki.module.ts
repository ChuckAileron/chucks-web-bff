import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WikiController } from './wiki.controller.js';
import { WikiService } from './wiki.service.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule.register({ timeout: 5000 })],
  controllers: [WikiController],
  providers: [WikiService],
})
export class WikiModule {}
