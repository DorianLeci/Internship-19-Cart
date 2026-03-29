import type { RequestWithJwtUser } from '@tstypes/request-types';
import { ProfileResponseDto } from './dto/response.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    me(req: RequestWithJwtUser): Promise<ProfileResponseDto>;
    updateMe(req: RequestWithJwtUser, dto: UpdateProfileDto): Promise<ProfileResponseDto>;
}
