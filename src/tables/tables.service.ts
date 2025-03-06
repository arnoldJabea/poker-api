import { Injectable } from '@nestjs/common';
import { Table } from './table.entity';

@Injectable()
export class TablesService {
  tables: any[];

  constructor() {
    this.tables = ['noob', 'intermediate', 'pro'];
  }

  findAll(): Table[] {
    return this.tables;
  }
}
