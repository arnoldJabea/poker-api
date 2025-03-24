import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Table } from './../tables/table.entity'; 
import { Bet } from './../game/bet/bet.entity';


@Entity('poker_user') 
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;
  
  @Column({ default: false })
  isAI!: boolean;

  @Column()
  password!: string;

  @Column({ default: 1000 })
  balance!: number;

  
  @ManyToOne(() => Table, (table) => table.players, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'tableId' })
  table!: Table | null;

 
  @OneToMany(() => Bet, (bet) => bet.user)
  bets!: Bet[];

  
  @Column({ nullable: true })
  tableId?: number;

  
  @Column({ nullable: true })
  position?: number;

  
  @Column({ default: 0 })
  currentBet!: number;
  @Column({ type: 'text', default: '' })
  hand!: string;
}