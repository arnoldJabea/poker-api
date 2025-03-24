import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { BetService } from './bet.service';

@Controller('bets')
export class BetController {
  constructor(private readonly betService: BetService) { }

  @Post(':tableId/:userId')
  async placeBet(
    @Param('tableId') tableId: number,
    @Param('userId') userId: number,
    @Body('amount') amount: number,
  ) {
    return this.betService.placeBet(userId, tableId, amount);
  }

  @Get(':tableId')
  async getBetsForTable(@Param('tableId') tableId: number) {
    return this.betService.getBetsForTable(tableId);
  }
  @Post(':tableId/:userId/fold')
  async fold(@Param('tableId') tableId: number, @Param('userId') userId: number) {
    return this.betService.fold(userId, tableId);
  }

  @Post(':tableId/:userId/check')
  async check(@Param('tableId') tableId: number, @Param('userId') userId: number) {
    return this.betService.check(userId, tableId);
  }
}
