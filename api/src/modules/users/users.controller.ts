import { RolesAuth } from '@decorators/auth.decorator';
import { Controller, Get, Req } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import type { RequestWithJwtUser } from '@tstypes/request-types';
import { ProfileResponseDto } from './dto/profile-response.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @RolesAuth(Role.ADMIN, Role.USER)
  @Get('me')
  @ApiOkResponse({ type: ProfileResponseDto, description: 'Returns current user profile' })
  async me(@Req() req: RequestWithJwtUser) {
    const id = req.user.sub;
    return this.usersService.getProfile(id);
  }
}
