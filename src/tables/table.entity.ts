import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Bet } from '../game/bet/bet.entity'; 

@Entity('poker_table')
export class Table {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ default: 6, name: 'max_players' })
  maxPlayers!: number;

  @OneToMany(() => User, (user) => user.table)
  players!: User[];

  @OneToMany(() => Bet, (bet) => bet.table)
  bets!: Bet[];

  @Column({ default: 0 })
  currentBet!: number;

  @Column({ default: 10 })
  smallblind!: number;

  @Column({ default: 20 })
  bigblind!: number;

  @Column({ default: 0 })
  pot!: number;

  @Column({ default: 0 }) 
  dealerPosition!: number;

  @Column({ default: 0 }) 
  currentTurn!: number;
  
  @Column({ type: 'text', default: '' }) 
  communityCards!: string;
}