import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetService } from './bet.service';
import { BetController } from './bet.controller';
import { Bet } from './bet.entity';
import { User } from '../../user/user.entity';
import { Table } from '../../tables/table.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Bet, User, Table])],
    controllers: [BetController],
    providers: [BetService],
    exports: [BetService],
})
export class BetModule { }
