import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WishlistController } from './wishlist.controller.js';
import { WishlistService } from './wishlist.service.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule.register({ timeout: 60000 }),
  ],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
