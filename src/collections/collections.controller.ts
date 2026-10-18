import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CollectionsService } from './collections.service.js';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  list() {
    return this.collectionsService.list();
  }

  @Put('reorder')
  reorder(@Body() body: { ids: number[] }) {
    return this.collectionsService.reorder(body.ids);
  }

  @Post('import')
  importCollection(@Body() body: { payload: Record<string, unknown> }) {
    return this.collectionsService.importCollection(body.payload);
  }

  @Get(':id/export')
  exportCollection(@Param('id', ParseIntPipe) id: number) {
    return this.collectionsService.exportCollection(id);
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.collectionsService.get(id);
  }

  @Post()
  create(@Body() body: Record<string, unknown>) {
    return this.collectionsService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Record<string, unknown>,
  ) {
    return this.collectionsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.collectionsService.remove(id);
  }

  @Get(':id/items')
  listItems(
    @Param('id', ParseIntPipe) id: number,
    @Query('q') q?: string,
  ) {
    return this.collectionsService.listItems(id, q);
  }

  @Post(':id/items')
  createItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Record<string, unknown>,
  ) {
    return this.collectionsService.createItem(id, body);
  }

  @Patch('items/:itemId')
  updateItem(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() body: Record<string, unknown>,
  ) {
    return this.collectionsService.updateItem(itemId, body);
  }

  @Delete('items/:itemId')
  removeItem(@Param('itemId', ParseIntPipe) itemId: number) {
    return this.collectionsService.removeItem(itemId);
  }
}
