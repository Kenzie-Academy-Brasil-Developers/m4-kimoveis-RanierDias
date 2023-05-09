import { MigrationInterface, QueryRunner } from "typeorm";

export class FixColumnValue1683313976239 implements MigrationInterface {
    name = 'FixColumnValue1683313976239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD "value" numeric(12,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD "value" double precision NOT NULL DEFAULT '0'`);
    }

}
