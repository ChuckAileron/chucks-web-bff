import { Body, Controller, Post } from '@nestjs/common';
import { ImagesService } from './images.service.js';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('search')
  search(@Body() body: Record<string, unknown>) {
    return this.imagesService.search(body);
  }
}
