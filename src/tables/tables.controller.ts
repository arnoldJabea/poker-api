import { Controller, Get, Post, Param, Body, BadRequestException } from '@nestjs/common';
import { TableService } from './tables.service';

@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  
  
  @Post()
  async createTable(@Body() body: { name: string; maxPlayers?: number }) {
    if (!body.name) {
      throw new BadRequestException('Table name is required');
    }
    return this.tableService.createTable(body.name, body.maxPlayers);
  }
  

  @Get()
  async findAll() {
    return this.tableService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tableService.findOne(Number(id));
  }

  @Post(':id')
  async joinOrLeaveTable(
    @Param('id') id: number,
    @Body() body: { userId: number; action: 'join' | 'leave' },
  ) {
    if (!body.userId || !body.action) {
      throw new BadRequestException('Missing userId or action');
    }

    if (body.action === 'join') {
      return this.tableService.joinTable(Number(id), body.userId);
    } else if (body.action === 'leave') {
      return this.tableService.leaveTable(body.userId);
    } else {
      throw new BadRequestException('Invalid action');
    }
  }

  @Post(':id/deal')
  async dealCards(@Param('id') id: number) {
    return this.tableService.dealCardsToPlayers(Number(id));
  }
}