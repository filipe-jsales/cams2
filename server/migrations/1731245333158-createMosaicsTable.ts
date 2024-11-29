import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMosaicsTable1731245333158 implements MigrationInterface {
  name = 'CreateMosaicsTable1731245333158';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'mosaic',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['grid1', 'grid2', 'grid3'],
            default: `'grid1'`,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'capacity',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'mosaic_cams_cam',
        columns: [
          {
            name: 'mosaicId',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'camId',
            type: 'int',
            isPrimary: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys('mosaic_cams_cam', [
      new TableForeignKey({
        columnNames: ['mosaicId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'mosaic',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['camId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cam',
        onDelete: 'CASCADE',
      }),
    ]);

    await queryRunner.createTable(
      new Table({
        name: 'mosaic_users_user',
        columns: [
          {
            name: 'mosaicId',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'userId',
            type: 'int',
            isPrimary: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys('mosaic_users_user', [
      new TableForeignKey({
        columnNames: ['mosaicId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'mosaic',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('mosaic_users_user');
    await queryRunner.dropTable('mosaic_cams_cam');
    await queryRunner.dropTable('mosaic');
  }
}
