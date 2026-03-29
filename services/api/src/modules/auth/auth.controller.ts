import { ApiCreatedMessage, ApiOkMessage } from '@decorators/api-response.decorator';
import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { seconds, Throttle, ThrottlerGuard } from '@nestjs/throttler';
import type { RequestWithUser } from '@tstypes/request-types';
import { AuthService } from './auth.service';
import { AccessTokenDto } from './dto/access-token.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(ThrottlerGuard, AuthGuard('local'))
  @Throttle({
    default: {
      limit: 5,
      ttl: seconds(60),
      blockDuration: seconds(900),
    },
  })
  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: LoginRequestDto })
  @ApiOkMessage({ message: 'User successfully authenticated', type: AccessTokenDto })
  @ApiUnauthorizedResponse({ description: 'Email or password does not exist' })
  async login(@Request() req: RequestWithUser): Promise<AccessTokenDto> {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiCreatedMessage({ message: 'User successfully registered', type: AccessTokenDto })
  @ApiBadRequestResponse({
    description: 'Validation failed (e.g., invalid email or weak password)',
  })
  @ApiConflictResponse({ description: 'Email already exists' })
  async register(@Body() registerBody: RegisterRequestDto): Promise<AccessTokenDto> {
    return this.authService.register(registerBody);
  }
}
