import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { RoleEnum } from 'src/role/enums/role.enum';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, email, password, role } = createUserDto;

    const hashedPassword = await this.hashPassword(password);

    const userRoleName = (role || RoleEnum.User) as string;
    const userRole = await this.rolesRepository.findOne({
      where: { name: userRoleName },
    });

    if (!userRole) {
      this.logger.warn(`Role ${userRoleName} not found`);
      throw new BadRequestException(`Role ${userRoleName} not found`);
    }

    const user = this.usersRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roles: [userRole],
    });
    return this.usersRepository.save(user);
  }

  private async hashPassword(password: string) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async findAll() {
    const users = await this.usersRepository.find({
      relations: ['roles'],
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...user }) => ({
      ...user,
      roles: user.roles.map((role) => role.name),
    }));
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    this.logger.log('email recebido no service', email);
    return this.usersRepository.findOne({
      where: { email: email },
      relations: ['roles'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
}
