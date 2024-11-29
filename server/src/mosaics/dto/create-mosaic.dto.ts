import {
  IsEnum,
  IsString,
  IsInt,
  IsBoolean,
  IsArray,
  IsOptional,
} from 'class-validator';
import { MosaicGridType } from '../enums/mosaic.enum';

export class CreateMosaicDto {
  @IsEnum(MosaicGridType, { message: 'Type must be a valid MosaicGridType' })
  type: MosaicGridType;

  @IsString()
  name: string;

  @IsInt()
  capacity: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true, message: 'Each camera ID must be an integer' })
  cameras: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true, message: 'Each user ID must be an integer' })
  users: number[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}
