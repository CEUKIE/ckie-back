import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthService } from '../auth/auth.service';
import { UsersService } from '../providers/users.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { UserInfo } from '../common/decorators/user.decorator';
import { TokenData } from '../auth/types';
import { ResponseForm } from '../common/format/response-form';

interface TokenResponse {
  accessToken: string;
}

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * @tag users
   * @summary 토큰 발행 테스트
   * @returns access token
   */
  @Get('token-test')
  getToken(): Promise<TokenResponse> {
    return this.authService.generateAccessToken({
      id: 'cd8ea312-01d2-4821-8d2d-6a9950abac34',
      platform: 'KAKAO',
    });
  }

  /**
   * @tag users
   * @security bearer
   * @param user 토큰에서 추출한 회원 정보
   * @returns 회원 상세 정보
   */
  @UseGuards(AuthGuard)
  @Get()
  async getUserInfo(@UserInfo() user: TokenData) {
    const response = await this.usersService.getUserById(user.id);
    return ResponseForm.ok(response);
  }
}
