import { Controller, Get, HttpCode, Query } from '@nestjs/common';

import { KakaoClient } from './oauth/kakao.client';
import { LoginResponse } from './dto/login-response';
import { ResponseForm } from '../common/format/response-form';

@Controller('auth')
export class AuthController {
  constructor(private readonly kakaoService: KakaoClient) {}

  /**
   * @tag auth
   * @summary 카카오 로그인
   * @returns access token
   */
  @HttpCode(200)
  @Get('kakao')
  async kakaoLogin(
    @Query('code') code: string,
  ): Promise<ResponseForm<LoginResponse>> {
    const token: LoginResponse = await this.kakaoService.login(code);
    return ResponseForm.ok(token);
  }
}
