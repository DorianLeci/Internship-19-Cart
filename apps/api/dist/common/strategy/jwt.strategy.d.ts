import { ConfigService } from '@nestjs/config';
import { AccessTokenPayload } from '@tstypes/access-token';
declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(payload: AccessTokenPayload): Promise<AccessTokenPayload>;
}
export {};
