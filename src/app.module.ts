import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TablesController } from './tables/tables.controller';
import { TablesService } from './tables/tables.service';
import { TablesModule } from './tables/tables.module';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { ActionService } from './action/action.service';
import { ActionModule } from './action/action.module';
//import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.entity';
import { Table } from 'typeorm';

@Module({
  imports: [
    TablesModule,
    UserModule,
    GameModule,
    ActionModule,
    ConfigModule.forRoot(),
    /*TypeOrmModule.forRoot({
      type: 'postgres', // a disparaitre pendant le déploiement( sqlite de singuila)
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Table],
    }),*/
  ],
  controllers: [AppController, TablesController],
  providers: [AppService, TablesService, ActionService],
})
export class AppModule { }
