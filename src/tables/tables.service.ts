import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from './table.entity';
import { User } from '../user/user.entity';
import { DeckService } from '../game/deck/deck.service';

@Injectable()
export class TableService {
  
  async findOne(id: number): Promise<Table> {
    const table = await this.tableRepository.findOne({ where: { id }, relations: ['players'] });
  
    if (!table) {
      throw new NotFoundException(`Table ${id} not found`);
    }
  
    return table;
  }
  
  async findAll(): Promise<Table[]> {
    return this.tableRepository.find({ relations: ['players'] });
  }
  constructor(
    @InjectRepository(Table) private tableRepository: Repository<Table>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private deckService: DeckService
  ) { }
  
  async dealCardsToPlayers(tableId: number) {
    const table = await this.tableRepository.findOne({ where: { id: tableId }, relations: ['players'] });

    if (!table) {
      throw new NotFoundException(`Table ${tableId} not found`);
    }
    if (table.players.length === 0) {
      throw new BadRequestException('No players at the table');
    }

    const deck = this.deckService.generateDeck();
    const hands = this.deckService.dealCards(deck, table.players.length);

    const playersHands = {};
    table.players.forEach((player, index) => {
        playersHands[player.id] = hands[index];  
    });


    return hands;
  }

  async getAllTables(): Promise<Table[]> {
    return this.tableRepository.find({ relations: ['players'] });
  }

  async getTableById(id: number): Promise<Table> {
    const table = await this.tableRepository.findOne({ where: { id }, relations: ['players'] });
    if (!table) {
      throw new NotFoundException(`Table ${id} not found`);
    }
    return table;
  }

  async joinTable(tableId: number, userId: number): Promise<Table> {
    const table = await this.getTableById(tableId);
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['table'] });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    if (user.table) {
      throw new BadRequestException(`User is already at a table`);
    }
    if (table.players.length >= table.maxPlayers) {
      throw new BadRequestException(`Table is full`);
    }

    user.table = table;
    await this.userRepository.save(user);
    return this.getTableById(tableId);
  }

  async leaveTable(userId: number): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['table'] });

    if (!user || !user.table) {
      throw new BadRequestException(`User is not at any table`);
    }

    user.table = null;
    await this.userRepository.save(user);
    return `User ${userId} left the table`;
  }
  
}
