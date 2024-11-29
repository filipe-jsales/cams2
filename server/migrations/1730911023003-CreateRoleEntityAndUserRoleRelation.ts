import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateRoleEntityAndUserRoleRelation1730910843399
  implements MigrationInterface
{
  name = 'CreateRoleEntityAndUserRoleRelation1730910843399';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'role',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'user_roles',
        columns: [
          {
            name: 'userId',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'roleId',
            type: 'int',
            isPrimary: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'user_roles',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'user_roles',
      new TableForeignKey({
        columnNames: ['roleId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'role',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user_roles');
    const userForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );
    const roleForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('roleId') !== -1,
    );
    await queryRunner.dropForeignKey('user_roles', userForeignKey);
    await queryRunner.dropForeignKey('user_roles', roleForeignKey);

    await queryRunner.dropTable('user_roles');
    await queryRunner.dropTable('role');
  }
}
