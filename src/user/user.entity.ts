import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Table } from '../tables/table.entity';
import { Bet } from '../game/bet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: 1000 })
  balance: number;

  @ManyToOne(() => Table, table => table.players, { nullable: true })
  @JoinColumn({ name: 'tableId' })
  table: Table | null;

  
  @OneToMany(() => Bet, bet => bet.user)
  bets: Bet[];


}