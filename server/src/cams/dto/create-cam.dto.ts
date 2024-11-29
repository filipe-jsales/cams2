import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CameraResolution } from '../enums/cam-resolution.enum';

export class CreateCamDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  protocol: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  URL?: string;

  @IsOptional()
  @IsBoolean()
  isAnalytical?: boolean;

  @IsOptional()
  @IsNumber()
  hostingDays?: number;

  @IsOptional()
  @IsString()
  storage?: string;

  @IsOptional()
  @IsEnum(CameraResolution)
  @IsString()
  resolution?: CameraResolution;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsNumber()
  userId?: number;
}
