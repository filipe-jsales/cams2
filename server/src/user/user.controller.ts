import {
  Controller,
  Get,
  Param,
  Delete,
  Body,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll(@Request() req) {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Post('find-by-email')
  findByEmail(@Body() { email }: { email: string }): Promise<User> {
    return this.userService.findByEmail(email);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<{ message: string; id: number }> {
    await this.userService.remove(+id);
    return { message: 'User deleted successfully', id: +id };
  }
}
