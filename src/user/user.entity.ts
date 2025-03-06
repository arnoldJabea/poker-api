import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Table } from '../tables/table.entity';

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

  @ManyToOne(() => Table, (table) => table.players, { nullable: true })
  table: Table | null;
}
