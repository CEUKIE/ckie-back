import { Body, Controller, Post } from '@nestjs/common';

import { KakaoLoginDto } from './dto/kakao-login-dto';
import { KakaoClient } from './oauth/kakao.client';
import { LoginResponse } from './dto/login-response';
import { ResponseForm } from '../common/format/response-form';

@Controller('auth')
export class AuthController {
  constructor(private readonly kakaoService: KakaoClient) {}

  /**
   * @tag auth
   * @summary 카카오 로그인
   * @param dto 회원 정보
   * @returns access token
   */
  // TODO generate 오버로딩 함수 정의 후 endpoint 수정.
  @Post('kakao')
  async kakaoLogin(
    @Body() dto: KakaoLoginDto,
  ): Promise<ResponseForm<LoginResponse>> {
    const token: LoginResponse = await this.kakaoService.login(dto);
    return ResponseForm.ok(token);
  }

  // 테스트 (삭제 예정)
  // @Get('kakao')
  // kakaoLogin(@Query('code') code: string) {
  //   return this.kakaoService.login(code);
  // }
}
