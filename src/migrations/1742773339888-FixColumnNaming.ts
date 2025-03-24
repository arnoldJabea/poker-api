import { MigrationInterface, QueryRunner } from "typeorm";

export class FixColumnNaming1742773339888 implements MigrationInterface {
    name = 'FixColumnNaming1742773339888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "poker_table" DROP COLUMN "smallBlind"`);
        await queryRunner.query(`ALTER TABLE "poker_table" DROP COLUMN "bigBlind"`);
        await queryRunner.query(`ALTER TABLE "poker_table" ADD "smallblind" integer NOT NULL DEFAULT '10'`);
        await queryRunner.query(`ALTER TABLE "poker_table" ADD "bigblind" integer NOT NULL DEFAULT '20'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "poker_table" DROP COLUMN "bigblind"`);
        await queryRunner.query(`ALTER TABLE "poker_table" DROP COLUMN "smallblind"`);
        await queryRunner.query(`ALTER TABLE "poker_table" ADD "bigBlind" integer NOT NULL DEFAULT '20'`);
        await queryRunner.query(`ALTER TABLE "poker_table" ADD "smallBlind" integer NOT NULL DEFAULT '10'`);
    }

}
