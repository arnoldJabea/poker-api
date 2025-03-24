import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bet } from './bet.entity';
import { User } from '../../user/user.entity';
import { Table } from '../../tables/table.entity';

@Injectable()
export class BetService {
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
    
        if (user.balance < amount) {
            throw new BadRequestException('Fonds insuffisants');
        }
    
        user.balance -= amount;
        await this.userRepository.save(user);
    
        table.pot += amount;
        await this.tableRepository.save(table);
    
        const bet = this.betRepository.create({ user, table, amount });
        await this.betRepository.save(bet);
    
        return this.getBetsForTable(tableId); //  Retourne les mises mises à jour
    }
    

    async getBetsForTable(tableId: number): Promise<Bet[]> {
        return this.betRepository.find({ where: { table: { id: tableId } }, relations: ['user'] });
    }
    
}
