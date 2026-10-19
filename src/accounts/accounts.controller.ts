import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { AccountsService } from './accounts.service.js';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly proxy: AccountsService) {}
  @Get() list() { return this.proxy.list(); }
  @Post() create(@Body() body: Record<string, unknown>) { return this.proxy.create(body); }
  @Put('reorder') reorder(@Body() body: { ids: number[] }) { return this.proxy.reorder(body); }
  @Get(':id/registers') registers(@Param('id', ParseIntPipe) id: number, @Query('q') q?: string) { return this.proxy.registers(id, q); }
  @Get(':id/years') years(@Param('id', ParseIntPipe) id: number) { return this.proxy.years(id); }
  @Get(':id/monthly') monthly(@Param('id', ParseIntPipe) id: number, @Query('year') year?: string) { return this.proxy.monthly(id, year); }
  @Patch('registers/:id') updateRegister(@Param('id', ParseIntPipe) id: number, @Body() body: Record<string, unknown>) { return this.proxy.updateRegister(id, body); }
  @Delete('registers/:id') deleteRegister(@Param('id', ParseIntPipe) id: number) { return this.proxy.deleteRegister(id); }
  @Post('registers') createRegister(@Body() body: Record<string, unknown>) { return this.proxy.createRegister(body); }
  @Get(':id') get(@Param('id', ParseIntPipe) id: number) { return this.proxy.get(id); }
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() body: Record<string, unknown>) { return this.proxy.update(id, body); }
  @Delete(':id') delete(@Param('id', ParseIntPipe) id: number) { return this.proxy.delete(id); }
}
