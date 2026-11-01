import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SitesController } from './sites.controller.js';
import { SitesService } from './sites.service.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule.register({ timeout: 60000 })],
  controllers: [SitesController],
  providers: [SitesService],
})
export class SitesModule {}
