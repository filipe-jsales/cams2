import { PartialType } from '@nestjs/swagger';
import { CreateMosaicDto } from './create-mosaic.dto';

export class UpdateMosaicDto extends PartialType(CreateMosaicDto) {}
