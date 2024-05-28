import { Injectable } from '@nestjs/common';

import { Kakao, Platform } from '../types';
import { UsersService } from '../../providers/users.service';
import axios from 'axios';
import { LoginDto } from '../dto/login-dto';

@Injectable()
export class KakaoClient {
  private readonly USER_DATA_URL = process.env.KAKAO_USER_DATA_URL ?? '';
  private readonly platform: Platform = 'KAKAO';

  constructor(private readonly usersService: UsersService) {}

  async login(
    token: string,
  ): Promise<{ accessToken: string } | { isRegisterd: boolean }> {
    const { user } = await this.checkSignupStatus(token);

    return !!user
      ? await this.usersService.login({ id: user.id, platform: user.platform })
      : { isRegisterd: false };
  }

  async signup(dto: LoginDto) {
    const { identifier } = await this.checkSignupStatus(dto.accessToken);

    const user = await this.usersService.signup({
      identifier,
      nickname: dto.nickname,
      avatarUrl: dto.avatarUrl,
      introduction: dto.introduction,
      platform: this.platform,
    });

    return await this.usersService.login({
      id: user.id,
      platform: user.platform,
    });
  }

  async checkSignupStatus(token: string) {
    const userData = await this.getUserData(token);
    const identifier = String(userData.id);
    const user = await this.usersService.getUserByIdentifierAndPlatform(
      identifier,
      this.platform,
    );

    return { user, identifier };
  }

  protected async getUserData(token: string) {
    const userDataResponse = await axios.post<Kakao.KakaoUserDataResponse>(
      this.USER_DATA_URL,
      '',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return userDataResponse.data;
  }
}
