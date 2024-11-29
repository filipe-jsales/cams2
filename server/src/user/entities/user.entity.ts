import { Cam } from 'src/cams/entities/cam.entity';
import { Role } from 'src/role/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  recoveryCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Cam, (cam) => cam.user)
  cams: Cam[];
}
