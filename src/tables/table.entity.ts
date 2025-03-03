import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 'waiting' }) // waiting, ongoing, finished
  status: string;

  @OneToMany(() => User, (user) => user.table)
  players: User[];
}
