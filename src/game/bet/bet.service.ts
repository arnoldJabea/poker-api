import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bet } from './bet.entity';
import { User } from '../../user/user.entity';
import { Table } from '../../tables/table.entity';

@Injectable()
export class BetService {
    tableService: any;
    constructor(
        @InjectRepository(Bet)
        private readonly betRepository: Repository<Bet>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Table)
        private readonly tableRepository: Repository<Table>,
    ) { }

    async placeBet(userId: number, tableId: number, amount: number): Promise<Bet[]> {
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['table'] });
        if (!user) throw new NotFoundException('Joueur introuvable');

        const table = await this.tableRepository.findOne({ where: { id: tableId }, relations: ['players'] });
        if (!table) throw new NotFoundException('Table introuvable');

        
        if (typeof table.currentTurn !== 'number') {
            throw new BadRequestException('Le tour de mise n’a pas été initialisé.');
        }

        const currentPlayer = table.players[table.currentTurn];
        if (!currentPlayer || currentPlayer.id !== userId) {
            throw new BadRequestException('Ce n’est pas ton tour de miser.');
        }

        
        if (amount < table.currentBet) {
            throw new BadRequestException(`Tu dois au moins miser ${table.currentBet}€.`);
        }

        if (user.balance < amount) {
            throw new BadRequestException('Fonds insuffisants pour cette mise.');
        }

        
        user.balance -= amount;
        user.currentBet += amount;
        await this.userRepository.save(user);

        
        if (amount > table.currentBet) {
            table.currentBet = amount;
        }
        table.pot += amount;
        await this.tableRepository.save(table);

        
        const allPlayersMatchedBet = table.players.every(p => p.currentBet === table.currentBet || p.balance === 0);
        if (allPlayersMatchedBet) {
            console.log('🛑 Fin du tour de mise. Passe au tour suivant.');
            table.currentTurn = -1; 
        } else {
            
            do {
                table.currentTurn = (table.currentTurn + 1) % table.players.length;
            } while (table.players[table.currentTurn].balance === 0); // Ignorer les joueurs sans jetons
        }

        await this.tableRepository.save(table);

       
        const bet = this.betRepository.create({ user, table, amount });
        await this.betRepository.save(bet);
        await this.tableService.processAITurn(tableId);

        return this.getBetsForTable(tableId);
    }

    async fold(userId: number, tableId: number): Promise<string> {
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['table'] });
        if (!user) throw new NotFoundException('Joueur introuvable');

        const table = await this.tableRepository.findOne({ where: { id: tableId }, relations: ['players'] });
        if (!table) throw new NotFoundException('Table introuvable');

        
        if (table.players[table.currentTurn].id !== userId) {
            throw new BadRequestException('Ce n’est pas ton tour de jouer.');
        }

       
        table.players = table.players.filter(player => player.id !== userId);
        await this.tableRepository.save(table);

        
        do {
            table.currentTurn = (table.currentTurn + 1) % table.players.length;
        } while (table.players[table.currentTurn].balance === 0); 

        await this.tableRepository.save(table);

        return `Le joueur ${userId} s'est couché.`;
    }

    async check(userId: number, tableId: number): Promise<string> {
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['table'] });
        if (!user) throw new NotFoundException('Joueur introuvable');

        const table = await this.tableRepository.findOne({ where: { id: tableId }, relations: ['players'] });
        if (!table) throw new NotFoundException('Table introuvable');

       
        if (table.players[table.currentTurn].id !== userId) {
            throw new BadRequestException('Ce n’est pas ton tour de jouer.');
        }

       
        if (user.currentBet < table.currentBet) {
            throw new BadRequestException('Tu dois suivre la mise actuelle ou te coucher.');
        }

        
        do {
            table.currentTurn = (table.currentTurn + 1) % table.players.length;
        } while (table.players[table.currentTurn].balance === 0);

        await this.tableRepository.save(table);

        return `Le joueur ${userId} a checké.`;
    }

    async getBetsForTable(tableId: number): Promise<Bet[]> {
        return this.betRepository.find({ where: { table: { id: tableId } }, relations: ['user'] });
    }
}