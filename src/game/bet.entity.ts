import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Table } from '../tables/table.entity';

@Entity()
export class Bet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bets)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Table, (table) => table.bets)
  @JoinColumn({ name: 'tableId' })
  table: Table;

  @Column()
  amount: number;
}
