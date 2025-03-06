import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TablesModule } from './tables/tables.module';
import { GameModule } from './game/game.module';
import { ActionModule } from './action/action.module';
import { User } from './user/user.entity';
import { Table } from './tables/table.entity';
import { AuthModule } from './auth/auth.module';

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
      synchronize: true,
      entities: [User, Table],
    }),
    UserModule,
    TablesModule,
    GameModule,
    ActionModule,
    AuthModule,
  ],
})
export class AppModule {}
