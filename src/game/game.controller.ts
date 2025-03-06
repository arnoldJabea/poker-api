import { Controller, Get } from '@nestjs/common';
import { DeckService } from './deck/deck.service';

@Controller('game')
export class GameController {
  constructor(private readonly deckService: DeckService) {}

  @Get('deck')
  getDeck() {
    return this.deckService.generateDeck();
  }
}
