import { Controller, Post, Body } from '@nestjs/common';
import { ActionService } from './action.service';

@Controller('actions')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Post('/bet')
  bet(@Body() body: { playerId: number; amount: number }) {
    return this.actionService.bet(body.playerId, body.amount);
  }

  @Post('/fold')
  fold(@Body() body: { playerId: number }) {
    return this.actionService.fold(body.playerId);
  }

  @Post('/call')
  call(@Body() body: { playerId: number }) {
    return this.actionService.call(body.playerId);
  }

  @Post('/raise')
  raise(@Body() body: { playerId: number; amount: number }) {
    return this.actionService.raise(body.playerId, body.amount);
  }

  @Post('/check')
  check(@Body() body: { playerId: number }) {
    return this.actionService.check(body.playerId);
  }
}
