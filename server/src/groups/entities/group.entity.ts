import { Cam } from 'src/cams/entities/cam.entity';
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

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToMany(() => Cam, (cam) => cam.groups)
  @JoinTable({
    name: 'group_cams',
    joinColumn: { name: 'group_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'cam_id', referencedColumnName: 'id' },
  })
  cams: Cam[];

  @Column({ type: 'int', default: 0 })
  usersQuantity: number;

  @Column({ default: false })
  isDefault: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'text', nullable: true })
  observations: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
