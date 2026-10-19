import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { HijitosService } from './hijitos.service.js';

@Controller('hijitos')
export class HijitosController {
  constructor(private readonly proxy: HijitosService) {}
  @Get() list() { return this.proxy.list(); }
  @Get('banner') banner() { return this.proxy.banner(); }
  @Put('banner') setBanner(@Body() body: { banner: string }) { return this.proxy.setBanner(body); }
  @Patch('tracks/:slug') updateTrack(@Param('slug') slug: string, @Body() body: Record<string, unknown>) { return this.proxy.updateTrack(slug, body); }
  @Post('tasks') createTask(@Body() body: Record<string, unknown>) { return this.proxy.createTask(body); }
  @Patch('tasks/:id') updateTask(@Param('id', ParseIntPipe) id: number, @Body() body: Record<string, unknown>) { return this.proxy.updateTask(id, body); }
  @Delete('tasks/:id') deleteTask(@Param('id', ParseIntPipe) id: number) { return this.proxy.deleteTask(id); }
  @Post('tasks/:id/subtasks') createSubtask(@Param('id', ParseIntPipe) id: number, @Body() body: { description: string }) { return this.proxy.createSubtask(id, body); }
  @Patch('subtasks/:id') updateSubtask(@Param('id', ParseIntPipe) id: number, @Body() body: Record<string, unknown>) { return this.proxy.updateSubtask(id, body); }
  @Delete('subtasks/:id') deleteSubtask(@Param('id', ParseIntPipe) id: number) { return this.proxy.deleteSubtask(id); }
}
