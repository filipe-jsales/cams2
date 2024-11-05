import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UsersService } from 'src/user/user.service';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const { email, password } = signInDto;
    this.logger.log(`Attempting to sign in with email: ${email}`);

    const user = await this.findUserByEmail(email);
    await this.authenticateUser(password, user, email);
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    this.logger.log(`User signed in successfully: ${email}`);
    this.logger.debug(`Generated JWT token: ${token}`);
    return { access_token: token };
  }

  async signUp(
    createUserDto: CreateUserDto,
  ): Promise<{ access_token: string }> {
    this.logger.log(`Attempting to sign up with dto: ${createUserDto}`);
    const user = await this.usersService.create(createUserDto);
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  private async authenticateUser(password: string, user: User, email: string) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      this.logger.warn(`Invalid password attempt for email: ${email}`);
      throw new UnauthorizedException();
    }
  }

  private async findUserByEmail(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      this.logger.warn(`User with email ${email} not found`);
      throw new UnauthorizedException();
    }
    return user;
  }
}
