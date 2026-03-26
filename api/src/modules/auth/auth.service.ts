import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { AccessTokenPayload } from '@tstypes/access-token';
import { UsersService } from '@users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterRequestDto } from './dto/register-request.dto';
import { AccessToken } from './entities/access_token.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('User not found');

    return user;
  }

  async login(user: User): Promise<AccessToken> {
    const payload: AccessTokenPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(user: RegisterRequestDto): Promise<AccessToken> {
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.usersService.create({
      ...user,
      password: hashedPassword,
    });

    return this.login(newUser);
  }
}
