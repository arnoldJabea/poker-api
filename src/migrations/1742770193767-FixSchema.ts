import { MigrationInterface, QueryRunner } from "typeorm";

export class FixSchema1742770193767 implements MigrationInterface {
    name = 'FixSchema1742770193767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bet" DROP CONSTRAINT "FK_23a1f21c2ca2a0b6797564d2b41"`);
        await queryRunner.query(`ALTER TABLE "bet" DROP CONSTRAINT "FK_bet_tableId_poker_table"`);
        await queryRunner.query(`CREATE TABLE "poker_user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "balance" integer NOT NULL DEFAULT '1000', "tableId" integer, "position" integer, "currentBet" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_ac2b207f93b6e073ae54cb6ad6a" UNIQUE ("username"), CONSTRAINT "PK_edc0879fcb34a17b2be32f72c8a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "poker_table" ADD "currentBet" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "poker_table" ADD "smallBlind" integer NOT NULL DEFAULT '10'`);
        await queryRunner.query(`ALTER TABLE "poker_table" ADD "bigBlind" integer NOT NULL DEFAULT '20'`);
        await queryRunner.query(`ALTER TABLE "poker_table" ADD "pot" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "bet" ALTER COLUMN "amount" SET DEFAULT '0'`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "poker_table_id_seq" OWNED BY "poker_table"."id"`);
        await queryRunner.query(`ALTER TABLE "poker_table" ALTER COLUMN "id" SET DEFAULT nextval('"poker_table_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "poker_table" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "bet" ADD CONSTRAINT "FK_23a1f21c2ca2a0b6797564d2b41" FOREIGN KEY ("userId") REFERENCES "poker_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bet" ADD CONSTRAINT "FK_22230e9b1a9ae74ec72916de074" FOREIGN KEY ("tableId") REFERENCES "poker_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "poker_user" ADD CONSTRAINT "FK_af896585aaaf04a5f4b3a146874" FOREIGN KEY ("tableId") REFERENCES "poker_table"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "poker_user" DROP CONSTRAINT "FK_af896585aaaf04a5f4b3a146874"`);
        await queryRunner.query(`ALTER TABLE "bet" DROP CONSTRAINT "FK_22230e9b1a9ae74ec72916de074"`);
        await queryRunner.query(`ALTER TABLE "bet" DROP CONSTRAINT "FK_23a1f21c2ca2a0b6797564d2b41"`);
        await queryRunner.query(`ALTER TABLE "poker_table" ALTER COLUMN "id" SET DEFAULT nextval('table_id_seq')`);
        await queryRunner.query(`ALTER TABLE "poker_table" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "poker_table_id_seq"`);
        await queryRunner.query(`ALTER TABLE "bet" ALTER COLUMN "amount" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "poker_table" DROP COLUMN "pot"`);
        await queryRunner.query(`ALTER TABLE "poker_table" DROP COLUMN "bigBlind"`);
        await queryRunner.query(`ALTER TABLE "poker_table" DROP COLUMN "smallBlind"`);
        await queryRunner.query(`ALTER TABLE "poker_table" DROP COLUMN "currentBet"`);
        await queryRunner.query(`DROP TABLE "poker_user"`);
        await queryRunner.query(`ALTER TABLE "bet" ADD CONSTRAINT "FK_bet_tableId_poker_table" FOREIGN KEY ("tableId") REFERENCES "poker_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bet" ADD CONSTRAINT "FK_23a1f21c2ca2a0b6797564d2b41" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
