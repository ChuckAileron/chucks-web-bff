import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShoppingController } from './shopping.controller.js';
import { ShoppingService } from './shopping.service.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule.register({ timeout: 60000 })],
  controllers: [ShoppingController],
  providers: [ShoppingService],
})
export class ShoppingModule {}
