import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
} from 'typeorm';
import { CameraResolution } from '../enums/cam-resolution.enum';
import { Group } from 'src/groups/entities/group.entity';
import { CameraProtocol } from '../enums/cam-protocol.enum';

@Entity()
export class Cam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: CameraProtocol,
    default: CameraProtocol.RTSP,
  })
  protocol: CameraProtocol;

  @Column({ nullable: false })
  URL: string;

  @Column({ default: false })
  isAnalytical: boolean;

  @Column({ type: 'int', nullable: true })
  hostingDays: number;

  @Column({ nullable: true })
  storage: string;

  @Column({
    type: 'enum',
    enum: CameraResolution,
    default: CameraResolution.HD,
  })
  resolution: CameraResolution;

  @Column({ default: 'inactive' })
  status: string;

  @Column({ type: 'text', nullable: true })
  observations: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.cams, { onDelete: 'CASCADE' })
  user: User;

  @ManyToMany(() => Group, (group) => group.cams)
  groups: Group[];
}
