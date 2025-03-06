import { Controller, Post, Body } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionDto } from './action.dto';

@Controller('actions')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Post('fold')
  async fold(@Body() actionDto: ActionDto) {
    if (!actionDto.playerId) {
      return { error: 'Missing playerId' }; 
    }
    return this.actionService.fold(actionDto.playerId);
  }
}
