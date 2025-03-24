import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { DeckService } from './deck/deck.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetModule } from './bet/bet.module';  // ✅ A
import { Bet } from './bet/bet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bet]),
    BetModule,  
  ],
  providers: [GameService, DeckService],
  controllers: [GameController],
  exports: [DeckService],
})
export class GameModule { }
