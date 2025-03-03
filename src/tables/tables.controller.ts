import { Controller, Get } from '@nestjs/common';
import { TablesService } from './tables.service';

@Controller('tables')
export class TablesController {
  constructor(private tablesService: TablesService) {}
  @Get()
  findAll() {
    return this.tablesService.findAll();
    // return 'This action returns all cats';
  }
}
