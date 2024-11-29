import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  usersQuantity: number;

  @IsOptional()
  @IsBoolean()
  isDefault: boolean;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsString()
  observations: string;
}
