import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterWorkoutsTable1723148290526 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                ALTER TABLE "workouts"
                ADD "diet_level" int
            `);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                ALTER TABLE "users"
                DROP COLUMN "diet_level"
            `);
      }

}
