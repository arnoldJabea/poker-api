import { Controller, Get } from '@nestjs/common';
import { TablesService } from './tables.service';
import { Table } from './table.entity';

@Controller('tables')
export class TablesController {
  constructor(private tablesService: TablesService) {}
  @Get()
  findAll(): Table[] {
    return this.tablesService.findAll();
  }
}
