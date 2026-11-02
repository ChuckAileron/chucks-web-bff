import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ShoppingService } from './shopping.service.js';

@Controller('shopping')
export class ShoppingController {
  constructor(private readonly shopping: ShoppingService) {}

  @Get('contexts')
  listContexts() { return this.shopping.listContexts(); }

  @Post('contexts')
  createContext(@Body() body: Record<string, unknown>) { return this.shopping.createContext(body); }

  @Delete('contexts/:id')
  deleteContext(@Param('id', ParseIntPipe) id: number) { return this.shopping.deleteContext(id); }

  @Patch('contexts/:id')
  updateContext(@Param('id', ParseIntPipe) id: number, @Body() body: Record<string, unknown>) { return this.shopping.updateContext(id, body); }

  @Get('contexts/:id/items')
  listItems(@Param('id', ParseIntPipe) id: number, @Query('sort') sort?: string) {
    return this.shopping.listItems(id, sort);
  }

  @Delete('contexts/:contextId/items/:itemId')
  deleteItem(
    @Param('contextId', ParseIntPipe) contextId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) { return this.shopping.deleteItem(contextId, itemId); }

  @Patch('contexts/:contextId/items/:itemId')
  updateItem(
    @Param('contextId', ParseIntPipe) contextId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() body: Record<string, unknown>,
  ) { return this.shopping.updateItem(contextId, itemId, body); }

  @Post('contexts/:id/links')
  addLinks(@Param('id', ParseIntPipe) id: number, @Body() body: Record<string, unknown>) {
    return this.shopping.addLinks(id, body);
  }

  @Post('contexts/:id/refresh')
  refreshItems(@Param('id', ParseIntPipe) id: number) { return this.shopping.refreshItems(id); }

  @Delete('contexts/:id/inactive')
  clearInactiveItems(@Param('id', ParseIntPipe) id: number) { return this.shopping.clearInactiveItems(id); }
}
