import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LaunchboxService } from './launchbox.service.js';

@Controller('launchbox')
export class LaunchboxController {
  constructor(private readonly launchboxService: LaunchboxService) {}

  @Post('single')
  single(@Body() body: Record<string, unknown>) {
    return this.launchboxService.single(body);
  }

  @Post('apply-one')
  applyOne(@Body() body: Record<string, unknown>) {
    return this.launchboxService.applyOne(body);
  }

  @Post('csv/parse')
  parseCsv(@Body() body: Record<string, unknown>) {
    return this.launchboxService.parseCsv(body);
  }

  @Post('match-rows')
  matchRows(@Body() body: Record<string, unknown>) {
    return this.launchboxService.matchRows(body);
  }

  @Post('bulk')
  startBulk(@Body() body: Record<string, unknown>) {
    return this.launchboxService.startBulk(body);
  }

  @Get('bulk/:jobId')
  job(@Param('jobId') jobId: string) {
    return this.launchboxService.job(jobId);
  }

  @Get('bulk/:jobId/results')
  jobResults(@Param('jobId') jobId: string) {
    return this.launchboxService.jobResults(jobId);
  }

  @Post('bulk/:jobId/cancel')
  cancelJob(@Param('jobId') jobId: string) {
    return this.launchboxService.cancelJob(jobId);
  }

  @Post('apply-bulk')
  applyBulk(@Body() body: Record<string, unknown>) {
    return this.launchboxService.applyBulk(body);
  }

  @Post('apply-results-csv')
  applyResultsCsv(@Body() body: Record<string, unknown>) {
    return this.launchboxService.applyResultsCsv(body);
  }
}
