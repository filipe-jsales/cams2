import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Cam } from 'src/cams/entities/cam.entity';
import { User } from 'src/user/entities/user.entity';
import { MosaicGridType } from '../enums/mosaic.enum';

@Entity()
export class Mosaic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: MosaicGridType,
    default: MosaicGridType.GRID1,
  })
  type: MosaicGridType;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false })
  capacity: number;

  @ManyToMany(() => Cam, { cascade: true })
  @JoinTable({
    name: 'mosaic_cams_cam',
    joinColumn: {
      name: 'mosaicId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'camId',
      referencedColumnName: 'id',
    },
  })
  cameras: Cam[];

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
