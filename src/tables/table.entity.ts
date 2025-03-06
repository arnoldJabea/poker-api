import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 6, name: 'max_players' }) 
  maxPlayers: number;

  @OneToMany(() => User, (user) => user.table)
  players: User[];
    bets: any;
}
