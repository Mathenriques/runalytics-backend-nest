import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUsersTableAddPastInjuriesCollumn1718038313979
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "users"
        ADD "past_injuries" VARCHAR(150) NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "users"
        DROP COLUMN "past_injuries"
    `);
  }
}
