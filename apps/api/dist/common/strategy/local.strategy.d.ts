import { User } from '@prisma/client';
import { AuthService } from '../../modules/auth/auth.service';
declare const LocalStrategy_base: any;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<User>;
}
export {};
