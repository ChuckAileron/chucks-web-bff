import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { Public } from '../auth/public.decorator.js';
import { CalendarService } from './calendar.service.js';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly proxy: CalendarService) {}
  @Get('colors') colors() { return this.proxy.colors(); }
  @Get('google/status') googleStatus() { return this.proxy.googleStatus(); }
  @Get('google/connect') googleConnect() { return this.proxy.googleConnect(); }
  @Public()
  @Get('google/callback') async googleCallback(
    @Query('code') code: string | undefined,
    @Query('state') state: string | undefined,
    @Query('error') error: string | undefined,
    @Res() response: Response,
  ) {
    const result = await this.proxy.googleCallback(code ?? '', state ?? '', error ?? '');
    response.redirect(result.redirectUrl);
  }
  @Post('google/sync') googleSync(@Body() body: Record<string, unknown>) { return this.proxy.googleSync(body['start'], body['end']); }
  @Delete('google') googleDisconnect() { return this.proxy.googleDisconnect(); }
  @Get('events') list(@Query('start') start?: string, @Query('end') end?: string) { return this.proxy.list(start, end); }
  @Post('events') create(@Body() body: Record<string, unknown>) { return this.proxy.create(body); }
  @Patch('events/:id') update(@Param('id', ParseIntPipe) id: number, @Body() body: Record<string, unknown>) { return this.proxy.update(id, body); }
  @Delete('events/:id') remove(@Param('id', ParseIntPipe) id: number) { return this.proxy.remove(id); }
  @Post('holidays/:year/refresh') holidays(@Param('year') year: string) { return this.proxy.holidays(year); }
}
