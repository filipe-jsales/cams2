import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MosaicsService } from './mosaics.service';
import { CreateMosaicDto } from './dto/create-mosaic.dto';
import { UpdateMosaicDto } from './dto/update-mosaic.dto';

@Controller('mosaics')
export class MosaicsController {
  constructor(private readonly mosaicsService: MosaicsService) {}

  @Post()
  create(@Body() createMosaicDto: CreateMosaicDto) {
    return this.mosaicsService.create(createMosaicDto);
  }

  @Get()
  findAll() {
    return this.mosaicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mosaicsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMosaicDto: UpdateMosaicDto) {
    return this.mosaicsService.update(+id, updateMosaicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mosaicsService.remove(+id);
  }
}
