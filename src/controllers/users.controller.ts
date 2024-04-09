import { Controller, Get } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

interface TokenResponse {
  accessToken: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @tag users
   * @summary 토큰 발행 테스트
   * @returns access token
   */
  @Get()
  getToken(): Promise<TokenResponse> {
    return this.authService.generateAccessToken({
      id: 'cd8ea312-01d2-4821-8d2d-6a9950abac34',
      platform: 'KAKAO',
    });
  }
}
