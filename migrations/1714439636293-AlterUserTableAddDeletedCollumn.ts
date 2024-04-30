import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserTableAddDeletedCollumn1714439636293
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "deletedDate" TIMESTAMP WITH TIME ZONE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
            DROP COLUMN "deletedDate"
        `);
  }
}
