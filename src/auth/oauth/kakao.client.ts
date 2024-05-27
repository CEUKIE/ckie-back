import { Injectable } from '@nestjs/common';

import { Kakao, Platform } from '../types';
import { UsersService } from '../../providers/users.service';
import { OAuthClient } from './oauth.client';
import axios from 'axios';

@Injectable()
export class KakaoClient extends OAuthClient {
  private readonly USER_DATA_URL = process.env.KAKAO_USER_DATA_URL ?? '';
  private readonly platform: Platform = 'KAKAO';

  constructor(private readonly usersService: UsersService) {
    super();
  }

  async login(code: string) {
    const userData = await this.getUserData(code);
    const identifier = String(userData.id);

    let user = await this.usersService.getUserByIdentifier(
      identifier,
      this.platform,
    );

    if (!user) {
      user = await this.usersService.register({
        identifier,
        // TODO 랜덤 문자열 OR 클라이언트에서 입력
        nickname: 'test',
        introduction: '',
        platform: this.platform,
      });
    }

    return this.usersService.login({ id: user.id, platform: user.platform });
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
