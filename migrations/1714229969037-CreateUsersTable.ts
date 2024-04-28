import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1714229969037 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'password_hash',
            type: 'varchar',
          },
          {
            name: 'gender',
            type: 'enum',
            enum: ['male', 'female'],
          },
          {
            name: 'birth_date',
            type: 'date',
          },
          {
            name: 'diseases',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'weight',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'height',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'fitness_level',
            type: 'enum',
            enum: ['rookie', 'intermediary', 'advanced'],
            isNullable: true,
          },
          {
            name: 'isOnBalancedDiet',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'isAdmin',
            type: 'boolean',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
