import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CalendarService } from './calendar.service.js';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly proxy: CalendarService) {}
  @Get('colors') colors() { return this.proxy.colors(); }
  @Get('events') list(@Query('start') start?: string, @Query('end') end?: string) { return this.proxy.list(start, end); }
  @Post('events') create(@Body() body: Record<string, unknown>) { return this.proxy.create(body); }
  @Patch('events/:id') update(@Param('id', ParseIntPipe) id: number, @Body() body: Record<string, unknown>) { return this.proxy.update(id, body); }
  @Delete('events/:id') remove(@Param('id', ParseIntPipe) id: number) { return this.proxy.remove(id); }
  @Post('holidays/:year/refresh') holidays(@Param('year') year: string) { return this.proxy.holidays(year); }
}
