import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { TableModule } from './tables/tables.module';
import { BetModule } from './game/bet/bet.module';  
import { Bet } from './game/bet/bet.entity';
import { Table } from './tables/table.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: false,
      entities: [User, Table, Bet],
    }),
    UserModule,
    AuthModule,
    TableModule,
    BetModule,  
  ],
})
export class AppModule { }

console.log('Vérification des variables d’environnement :');
console.log('DATABASE_HOST:', process.env.DATABASE_HOST);
console.log('DATABASE_PORT:', process.env.DATABASE_PORT);
console.log('DATABASE_USER:', process.env.DATABASE_USER);
console.log('DATABASE_PASSWORD:', process.env.DATABASE_PASSWORD ? ' Détecté' : ' Non défini');
console.log('DATABASE_NAME:', process.env.DATABASE_NAME);
