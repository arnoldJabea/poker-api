import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../src/user/user.entity';
import { Table } from '../src/tables/table.entity';
import { Bet } from '../src/game/bet/bet.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'yourpassword',
  database: process.env.DATABASE_NAME || 'poker',
  synchronize: false,
  logging: true,
  entities: [Bet, Table, User],
  migrations:['/src/migrations/*.js'],
  
  //migrations: ['dist/ormconfig/migrations/*.js'],
  
  
});

export default AppDataSource;

