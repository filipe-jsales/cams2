import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewFieldUsersTable1730860126651 implements MigrationInterface {
  name = 'AddNewFieldUsersTable1730860126651';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`recoveryCode\` \`recoveryCode\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`recoveryCode\` \`recoveryCode\` varchar(255) NULL DEFAULT 'NULL'`,
    );
  }
}
