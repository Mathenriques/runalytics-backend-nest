import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateWorkoutsTable1718055212914 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'workouts',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'start_date',
            type: 'date',
          },
          {
            name: 'end_date',
            type: 'date',
          },
          {
            name: 'weekly_volume',
            type: 'int',
          },
          {
            name: 'strengthening_workouts',
            type: 'int',
          },
          {
            name: 'stress_level',
            type: 'int',
          },
          {
            name: 'sleep_hours',
            type: 'int',
          },
          {
            name: 'didMyofascialRelease',
            type: 'boolean',
          },
          {
            name: 'pain_discomfort',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'user_id',
            type: 'varchar',
          },
          {
            name: 'deletedDate',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'workouts',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('workouts');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('questionId') !== -1,
    );
    await queryRunner.dropForeignKey('workouts', foreignKey);
    await queryRunner.dropTable('workouts');
  }
}
