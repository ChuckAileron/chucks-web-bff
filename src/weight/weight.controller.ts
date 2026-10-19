import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { WeightService } from './weight.service.js';

@Controller('weight')
export class WeightController {
  constructor(private readonly proxy: WeightService) {}
  @Get() state() { return this.proxy.state(); }
  @Put('target') setTarget(@Body() body: { target: unknown }) { return this.proxy.setTarget(body); }
  @Post('entries') addEntry(@Body() body: { date: string; weight: unknown }) { return this.proxy.addEntry(body); }
  @Delete('entries/:date') deleteEntry(@Param('date') date: string) { return this.proxy.deleteEntry(date); }
}
