import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDealerAndCurrentTurn1742795056245 implements MigrationInterface {
    name = 'AddDealerAndCurrentTurn1742795056245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "poker_table" ADD "dealerPosition" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "poker_table" ADD "currentTurn" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "poker_table" DROP COLUMN "currentTurn"`);
        await queryRunner.query(`ALTER TABLE "poker_table" DROP COLUMN "dealerPosition"`);
    }

}
