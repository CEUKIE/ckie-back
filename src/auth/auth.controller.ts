import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { KakaoClient } from './oauth/kakao.client';
import { LoginResponse } from './dto/login-response';
import { ResponseForm } from '../common/format/response-form';
import { UserInfo } from '../common/decorators/user.decorator';
import { TokenData } from './types';
import { UsersService } from '../providers/users.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { LoginDto } from './dto/login-dto';
import { SignupResponse } from './dto/signup-response';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly kakaoService: KakaoClient,
    private readonly usersService: UsersService,
  ) {}

  /**
   * @tag auth
   * @param token 카카오 access token
   * @returns 가입자: 크키 access token, 미가입자: isRegisterd: false
   */
  @HttpCode(200)
  @Post('kakao-check')
  async kakaoLogin(
    // TODO 문자열 검증
    @Query('token') token: string,
  ): Promise<ResponseForm<LoginResponse>> {
    const response: LoginResponse = await this.kakaoService.login(token);
    return ResponseForm.ok(response);
  }

  /**
   * @tag auth
   * @param dto 회원 가입 데이터
   * @returns 크키 access token
   */
  @HttpCode(200)
  @Post('kakao-signup')
  async kakaoSignup(
    // TODO 문자열 검증
    @Body() dto: LoginDto,
  ): Promise<ResponseForm<SignupResponse>> {
    const response: SignupResponse = await this.kakaoService.signup(dto);
    return ResponseForm.ok(response);
  }

  /**
   * @tag auth
   * @security bearer
   * @returns access token 유효 여부
   */
  @UseGuards(AuthGuard)
  @Get('verify')
  async varifyAccessToken(
    @UserInfo() user: TokenData,
  ): Promise<ResponseForm<{ isVerified: boolean }>> {
    const userExists = await this.usersService.getUserById(user.id);
    return ResponseForm.ok({ isVerified: !!userExists });
  }
}
