import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { DeckService } from './deck/deck.service';
import{Bet} from './bet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [GameService, DeckService],
  controllers: [GameController],
  exports: [DeckService],
  imports: [TypeOrmModule.forFeature([Bet])],
})
export class GameModule {}
