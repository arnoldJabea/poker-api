import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TablesController } from './tables/tables.controller';
import { TablesService } from './tables/tables.service';
import { TablesModule } from './tables/tables.module';

@Module({
  imports: [TablesModule],
  controllers: [AppController, TablesController],
  providers: [AppService, TablesService],
})
export class AppModule {}
