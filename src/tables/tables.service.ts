import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from './table.entity';
import { User } from '../user/user.entity';
import { DeckService, Card } from '../game/deck/deck.service';

@Injectable()
export class TableService {
  leaveTable(userId: number) {
    throw new Error('Method not implemented.');
  }
  joinTable(arg0: number, userId: number) {
    throw new Error('Method not implemented.');
  }
  handEvaluator: any;
  constructor(
    @InjectRepository(Table) private tableRepository: Repository<Table>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private deckService: DeckService
  ) {}

  async createTable(name: string, maxPlayers = 6): Promise<Table> {
    try {
      const newTable = this.tableRepository.create({ name, maxPlayers });
      return await this.tableRepository.save(newTable);
    } catch (error) {
      console.error('❌ Error creating table:', error);
      throw new BadRequestException('Error creating table');
    }
  }

  async findAll(): Promise<Table[]> {
    return this.tableRepository.find({ relations: ['players'] });
  }

  async findOne(id: number): Promise<Table> {
    const table = await this.tableRepository.findOne({ where: { id }, relations: ['players'] });
    if (!table) {
      throw new NotFoundException(`Table ${id} not found`);
    }
    return table;
  }

  async dealCardsToPlayers(tableId: number) {
    const table = await this.tableRepository.findOne({
      where: { id: tableId },
      relations: ['players'],
    });

    if (!table) {
      throw new NotFoundException(`Table ${tableId} not found`);
    }
    if (table.players.length < 2) {
      throw new BadRequestException('Pas assez de joueurs pour distribuer les cartes.');
    }

    const deck = this.deckService.generateDeck();
    const hands = this.deckService.dealCards(deck, table.players.length);

    for (let i = 0; i < table.players.length; i++) {
      table.players[i].hand = JSON.stringify(hands[i]);
      await this.userRepository.save(table.players[i]);
    }

    table.communityCards = JSON.stringify([
      deck.pop(), deck.pop(), deck.pop(), // Flop
      deck.pop(), // Turn
      deck.pop()  // River
    ]);
    await this.tableRepository.save(table);

    return {
      playersHands: hands,
      communityCards: JSON.parse(table.communityCards),
    };
  }

  async startGame(tableId: number) {
    const table = await this.tableRepository.findOne({
        where: { id: tableId },
        relations: ['players'],
    });

    if (!table || table.players.length < 2) {
        throw new BadRequestException('Pas assez de joueurs pour commencer.');
    }

    const dealerIndex = table.dealerPosition ?? 0;
    const smallBlindIndex = (dealerIndex + 1) % table.players.length;
    const bigBlindIndex = (dealerIndex + 2) % table.players.length;

    const smallBlind = table.players[smallBlindIndex];
    const bigBlind = table.players[bigBlindIndex];

    if (smallBlind.balance < 10 || bigBlind.balance < 20) {
        throw new BadRequestException('Un joueur n’a pas assez de jetons pour les blindes.');
    }

    smallBlind.balance -= 10;
    smallBlind.currentBet = 10;
    bigBlind.balance -= 20;
    bigBlind.currentBet = 20;

    await this.userRepository.save([smallBlind, bigBlind]);

    table.currentBet = 20;
    table.dealerPosition = (dealerIndex + 1) % table.players.length;
    table.currentTurn = (bigBlindIndex + 1) % table.players.length;
    
    await this.tableRepository.save(table);
  }

  async nextTurn(tableId: number) {
    const table = await this.tableRepository.findOne({
      where: { id: tableId },
      relations: ['players'],
    });

    if (!table) {
      throw new NotFoundException(`Table ${tableId} not found`);
    }

    table.currentTurn = (table.currentTurn + 1) % table.players.length;
    await this.tableRepository.save(table);

    return { currentTurn: table.currentTurn };
  }

  async determineWinner(tableId: number) {
    const table = await this.tableRepository.findOne({
      where: { id: tableId },
      relations: ['players'],
    });

    if (!table) {
      throw new NotFoundException(`Table ${tableId} not found`);
    }

    const communityCards: Card[] = JSON.parse(table.communityCards);
    let bestScore = -1;
    let winner: User | null = null;

    for (const player of table.players) {
      const playerCards: Card[] = JSON.parse(player.hand);
      const score = this.handEvaluator.evaluateHand(playerCards, communityCards);
      if (score > bestScore) {
        bestScore = score;
        winner = player;
      }
    }

    if (winner) {
      winner.balance += table.pot;
      table.pot = 0;
      await this.userRepository.save(winner);
      await this.tableRepository.save(table);
      return `Le gagnant est ${winner.username} avec une main de rang ${bestScore}`;
    }

    return "Égalité, pot partagé.";
  }
}