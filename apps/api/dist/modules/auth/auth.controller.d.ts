import type { RequestWithUser } from '@tstypes/request-types';
import { AuthService } from './auth.service';
import { AccessTokenDto } from './dto/access-token.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: RequestWithUser): Promise<AccessTokenDto>;
    register(registerBody: RegisterRequestDto): Promise<AccessTokenDto>;
}
