import { MigrationInterface, QueryRunner } from "typeorm";

export class Addcolumnn1742800985201 implements MigrationInterface {
    name = 'Addcolumnn1742800985201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "poker_table" ADD "communityCards" text NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "poker_user" ADD "isAI" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "poker_user" ADD "hand" text NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "poker_user" DROP COLUMN "hand"`);
        await queryRunner.query(`ALTER TABLE "poker_user" DROP COLUMN "isAI"`);
        await queryRunner.query(`ALTER TABLE "poker_table" DROP COLUMN "communityCards"`);
    }

}
