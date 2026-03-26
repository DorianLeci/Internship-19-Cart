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
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

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
  @ApiOkMessage({ message: 'User successfully authenticated', type: LoginResponseDto })
  @ApiUnauthorizedResponse({ description: 'Email or password does not exist' })
  async login(@Request() req: RequestWithUser): Promise<LoginResponseDto> {
    const access_token = await this.authService.login(req.user);
    return { token: access_token };
  }

  @Post('register')
  @ApiCreatedMessage({ message: 'User successfully registered', type: RegisterResponseDto })
  @ApiBadRequestResponse({
    description: 'Validation failed (e.g., invalid email or weak password)',
  })
  @ApiConflictResponse({ description: 'Email already exists' })
  async register(@Body() registerBody: RegisterRequestDto): Promise<RegisterResponseDto> {
    const access_token = await this.authService.register(registerBody);
    return { token: access_token };
  }
}
