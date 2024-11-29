import { Module } from '@nestjs/common';
import { CamsService } from './cams.service';
import { CamsController } from './cams.controller';
import { Cam } from './entities/cam.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cam, User])],
  controllers: [CamsController],
  providers: [CamsService],
  exports: [CamsService],
})
export class CamsModule {}
