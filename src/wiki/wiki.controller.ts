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
import { WikiService } from './wiki.service.js';

@Controller('wiki')
export class WikiController {
  constructor(private readonly wiki: WikiService) {}

  @Get('pages')
  list(@Query('q') query?: string) {
    return this.wiki.list(query);
  }

  @Get('categories')
  categories() {
    return this.wiki.categories();
  }

  @Get('stats')
  stats() {
    return this.wiki.stats();
  }

  @Post('categories/banner')
  setCategoryBanner(@Body() body: { category: string; banner: string }) {
    return this.wiki.setCategoryBanner(body);
  }

  @Get('pages/:id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.wiki.get(id);
  }

  @Post('pages')
  create(@Body() body: Record<string, unknown>) {
    return this.wiki.create(body);
  }

  @Patch('pages/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: Record<string, unknown>) {
    return this.wiki.update(id, body);
  }

  @Delete('pages/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.wiki.remove(id);
  }
}
