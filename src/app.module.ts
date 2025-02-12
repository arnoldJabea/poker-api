import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TablesController } from './tables/tables.controller';
import { TablesService } from './tables/tables.service';
import { TablesModule } from './tables/tables.module';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { ActionService } from './action/action.service';

@Module({
  imports: [TablesModule, UserModule, GameModule],
  controllers: [AppController, TablesController],
  providers: [AppService, TablesService, ActionService],
})
export class AppModule {}
