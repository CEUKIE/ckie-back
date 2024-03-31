import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { KakaoService } from './kakao.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: KakaoService) {}

  @Get('kakao')
  kakaoLogin(@Res() res: Response) {
    this.authService.kakaoRedirect(res);
  }

  // 로그인하면 여기로 redirect.
  @Get('kakao-redirect')
  async kakaoRedirect(@Query('code') code: string) {
    this.authService.kakaoLogin(code);
  }
}
