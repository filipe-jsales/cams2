import { CameraProtocol } from 'src/cams/enums/cam-protocol.enum';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateFieldsCamsTable1731465147340 implements MigrationInterface {
  name = 'UpdateFieldsCamsTable1731465147340';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'cam',
      'type',
      new TableColumn({
        name: 'protocol',
        type: 'enum',
        enum: Object.values(CameraProtocol),
        isNullable: false,
        default: `'${CameraProtocol.RTSP}'`,
      }),
    );

    await queryRunner.addColumn(
      'cam',
      new TableColumn({
        name: 'URL',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'cam',
      'protocol',
      new TableColumn({
        name: 'type',
        type: 'varchar',
        isNullable: false,
      }),
    );

    await queryRunner.dropColumn('cam', 'URL');
  }
}
