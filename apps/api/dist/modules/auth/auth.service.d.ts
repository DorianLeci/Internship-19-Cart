import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '@users/users.service';
import { AccessTokenDto } from './dto/access-token.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<User>;
    login(user: User): Promise<AccessTokenDto>;
    register(user: RegisterRequestDto): Promise<AccessTokenDto>;
}
