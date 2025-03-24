import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCurrentBetToPokerTable1742772017968 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "poker_table"
      ADD COLUMN "currentBet" INTEGER DEFAULT 0 NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "poker_table"
      DROP COLUMN "currentBet"
    `);
  }
}