import { Injectable } from '@nestjs/common';

@Injectable()
export class DeckService {
  private suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  private values = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A',
  ];

  // Générer un deck de cartes complet
  generateDeck() {
    const deck: { suit: string; value: string }[] = [];
    for (const suit of this.suits) {
      for (const value of this.values) {
        deck.push({ suit, value });
      }
    }
    return this.shuffle(deck);
  }

  private shuffle(deck: any[]) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }
}
