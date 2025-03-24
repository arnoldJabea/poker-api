import { Injectable } from '@nestjs/common';

export interface Card {
  value: string;
  suit: string;
}

@Injectable()
export class DeckService {
  private suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  private values = [
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'
  ];

  generateDeck(): Card[] {
    const deck: Card[] = [];
    for (const suit of this.suits) {
      for (const value of this.values) {
        deck.push({ value, suit });
      }
    }
    return this.shuffle(deck);
  }

  shuffle(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  dealCards(deck: Card[], numPlayers: number): Record<number, Card[]> {
    const hands: Record<number, Card[]> = {};
    for (let i = 0; i < numPlayers; i++) {
      hands[i] = [deck.pop()!, deck.pop()!]; 
    }
    return hands;
  }
}