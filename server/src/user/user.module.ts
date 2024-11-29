import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { Role } from 'src/role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
