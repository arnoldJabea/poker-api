import { MigrationInterface, QueryRunner } from "typeorm";

export class FixPokerTablesAndRelations1743000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    
    const tableExists = await queryRunner.query(`
      SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'table')
    `);
    
    if (tableExists[0].exists) {
      // Renommer "table" en "poker_table"
      await queryRunner.query(`
        ALTER TABLE "table" RENAME TO "poker_table"
      `);
    }

   
    await queryRunner.query(`
      ALTER TABLE "bet" DROP CONSTRAINT IF EXISTS "FK_22230e9b1a9ae74ec72916de074"
    `);

    await queryRunner.query(`
      ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "FK_9fb0a4a7ed6b7bd260088bb031e"
    `);

  
    await queryRunner.query(`
      ALTER TABLE "bet"
      ADD CONSTRAINT "FK_bet_tableId_poker_table"
      FOREIGN KEY ("tableId") REFERENCES "poker_table"("id")
      ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "user"
      ADD CONSTRAINT "FK_user_tableId_poker_table"
      FOREIGN KEY ("tableId") REFERENCES "poker_table"("id")
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
   
    await queryRunner.query(`
      ALTER TABLE "bet" DROP CONSTRAINT IF EXISTS "FK_bet_tableId_poker_table"
    `);

    await queryRunner.query(`
      ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "FK_user_tableId_poker_table"
    `);

   
    await queryRunner.query(`
      ALTER TABLE "poker_table" RENAME TO "table"
    `);


    await queryRunner.query(`
      ALTER TABLE "bet"
      ADD CONSTRAINT "FK_22230e9b1a9ae74ec72916de074"
      FOREIGN KEY ("tableId") REFERENCES "table"("id")
      ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "user"
      ADD CONSTRAINT "FK_9fb0a4a7ed6b7bd260088bb031e"
      FOREIGN KEY ("tableId") REFERENCES "table"("id")
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);
  }
}