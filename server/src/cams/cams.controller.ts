import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CamsService } from './cams.service';
import { CreateCamDto } from './dto/create-cam.dto';
import { UpdateCamDto } from './dto/update-cam.dto';

@Controller('cams')
export class CamsController {
  constructor(private readonly camsService: CamsService) {}

  @Post()
  create(@Body() createCamDto: CreateCamDto) {
    return this.camsService.create(createCamDto);
  }

  @Get()
  findAll() {
    return this.camsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.camsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCamDto: UpdateCamDto) {
    return this.camsService.update(+id, updateCamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.camsService.remove(+id);
  }
}
