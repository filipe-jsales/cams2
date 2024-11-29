import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCamTable1631005291065 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cam',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'type', type: 'varchar', isNullable: false },
          { name: 'isAnalytical', type: 'boolean', default: false },
          { name: 'hostingDays', type: 'int', isNullable: true },
          { name: 'storage', type: 'varchar', isNullable: true },
          {
            name: 'resolution',
            type: 'enum',
            enum: [
              '640x480',
              '1280x720',
              '1920x1080',
              '3840x2160',
              '7680x4320',
            ],
            default: `'1280x720'`,
          },
          { name: 'status', type: 'varchar', default: `'inactive'` },
          { name: 'observations', type: 'text', isNullable: true },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          { name: 'deletedAt', type: 'timestamp', isNullable: true },
          { name: 'userId', type: 'int', isNullable: true },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'cam',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cam');
  }
}
