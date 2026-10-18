import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImagesController } from './images.controller.js';
import { ImagesService } from './images.service.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule.register({ timeout: 60000 }),
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
