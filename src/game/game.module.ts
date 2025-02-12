import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { DeckService } from './deck/deck.service';

@Module({
  providers: [GameService, DeckService],
  controllers: [GameController],
  exports: [DeckService],
})
export class GameModule {}
