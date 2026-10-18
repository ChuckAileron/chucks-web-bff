import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LaunchboxController } from './launchbox.controller.js';
import { LaunchboxService } from './launchbox.service.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule.register({ timeout: 60000 }),
  ],
  controllers: [LaunchboxController],
  providers: [LaunchboxService],
})
export class LaunchboxModule {}
