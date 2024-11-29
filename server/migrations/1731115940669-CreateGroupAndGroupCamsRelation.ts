import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateGroupAndGroupCamsRelation1731115940669
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'group',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'usersQuantity', type: 'int', default: 0 },
          { name: 'isDefault', type: 'boolean', default: false },
          { name: 'isActive', type: 'boolean', default: true },
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
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'group_cams',
        columns: [
          { name: 'group_id', type: 'int', isPrimary: true },
          { name: 'cam_id', type: 'int', isPrimary: true },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'group_cams',
      new TableForeignKey({
        columnNames: ['group_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'group',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'group_cams',
      new TableForeignKey({
        columnNames: ['cam_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cam',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('group_cams', 'FK_group_id');
    await queryRunner.dropForeignKey('group_cams', 'FK_cam_id');
    await queryRunner.dropTable('group_cams');
    await queryRunner.dropTable('group');
  }
}
