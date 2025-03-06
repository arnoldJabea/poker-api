import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from './table.entity';
import { TableService } from './tables.service';
import { TableController } from './tables.controller';
import { User } from '../user/user.entity';
import { GameModule } from '../game/game.module';


@Module({
  imports: [TypeOrmModule.forFeature([Table, User]) , GameModule],
  controllers: [TableController],
  providers: [TableService],
  exports: [TableService],
})
export class TableModule {}
