import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service.js';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  list(@Query('q') q?: string) {
    return this.wishlistService.list(q);
  }

  @Post()
  create(@Body() body: Record<string, unknown>) {
    return this.wishlistService.create(body);
  }

  @Post('refresh')
  refreshAll() {
    return this.wishlistService.refreshAll();
  }

  @Post('prices/:priceId/refresh')
  refreshPrice(@Param('priceId', ParseIntPipe) priceId: number) {
    return this.wishlistService.refreshPrice(priceId);
  }

  @Delete('prices/:priceId')
  removePrice(@Param('priceId', ParseIntPipe) priceId: number) {
    return this.wishlistService.removePrice(priceId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Record<string, unknown>,
  ) {
    return this.wishlistService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.wishlistService.remove(id);
  }

  @Post(':id/prices')
  addPrice(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Record<string, unknown>,
  ) {
    return this.wishlistService.addPrice(id, body);
  }
}
