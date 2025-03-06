import { DataSource } from 'typeorm';
import { User } from './user/user.entity';
import { Table } from './tables/table.entity';
import { Bet } from './game/bet.entity';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'yourpassword',
  database: process.env.DATABASE_NAME || 'poker',
  entities: [User, Table, Bet],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, 
  logging: true, 
});
