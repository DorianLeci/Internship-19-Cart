import { ApiProperty } from '@nestjs/swagger';
import { AccessToken } from '../entities/access_token.entity';

export class LoginResponseDto {
  @ApiProperty({ description: 'Signed access token', type: AccessToken })
  token: AccessToken;
}
