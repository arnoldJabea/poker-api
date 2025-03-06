import { Injectable } from '@nestjs/common';

@Injectable()
export class DeckService {
  private suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  private values = [
    '2', '3', '4', '5', '6', '7', '8', '9', '10',
    'J', 'Q', 'K', 'A'
  ];
  
  generateDeck(): string[] {
    const deck: string[] = [];
    for (const suit of this.suits) {
      for (const value of this.values) {
        deck.push(`${value} of ${suit}`);
      }
    }
    return this.shuffle(deck);
  }

  shuffle(deck: string[]): string[] {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  dealCards(deck: string[], numPlayers: number): Record<number, string[]> {
    const hands: Record<number, string[]> = {};
    for (let i = 0; i < numPlayers; i++) {
      const card1 = deck.pop();
      const card2 = deck.pop();
      if (!card1 || !card2) {
        throw new Error('Not enough cards in the deck');
      }
      hands[i] = [card1, card2]; // 2 cartes par joueur
    }
    return hands;
  }
}