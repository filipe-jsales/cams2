import { Module } from '@nestjs/common';
import { MosaicsService } from './mosaics.service';
import { MosaicsController } from './mosaics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mosaic } from './entities/mosaic.entity';
import { User } from 'src/user/entities/user.entity';
import { Cam } from 'src/cams/entities/cam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mosaic, User, Cam])],
  controllers: [MosaicsController],
  providers: [MosaicsService],
  exports: [MosaicsService],
})
export class MosaicsModule {}
