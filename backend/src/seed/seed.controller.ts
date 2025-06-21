import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get('delete-tables')
  deleteTables() {
    return this.seedService.deleteTables();
  }

  @Get('run')
  runSeed() {
    return this.seedService.runSeed();
  }
}
