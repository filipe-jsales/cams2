import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from 'src/role/entities/role.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsEnum(Role)
  @IsString()
  role?: Role;
}
