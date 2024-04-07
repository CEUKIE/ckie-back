import { Injectable } from '@nestjs/common';

import { postReq } from '../../common';
import { Kakao, Platform } from '../types';
import { UsersService } from '../../providers/users.service';
import { KakaoLoginDto } from '../dto/kakao-login-dto';
import { OAuthClient } from './oauth.client';

@Injectable()
export class KakaoClient extends OAuthClient {
  private readonly apiKey = process.env.KAKAO_LOGIN_API_KEY ?? '';
  private readonly redirectUri = process.env.KAKAO_REDIRECT_URI ?? '';
  private readonly TOKEN_URL = process.env.KAKAO_TOKEN_URL ?? '';
  private readonly USER_DATA_URL = process.env.KAKAO_DATA_URL ?? '';
  private readonly platform: Platform = 'KAKAO';

  // TODO 의존성 밖으로 밀어내기.
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async login(dto: KakaoLoginDto) {
    const tokenRequestData: Kakao.KakaoTokenRequest = {
      grant_type: 'authorization_code',
      client_id: this.apiKey,
      redirect_uri: this.redirectUri,
      code: dto.code,
    };

    const accessToken = await this.getToken(tokenRequestData);
    const userData = await this.getUserData(tokenRequestData, accessToken);

    const identifier = String(userData.id);
    let user = await this.usersService.getUserByIdentifier(
      identifier,
      this.platform,
    );

    if (!user) {
      user = await this.usersService.register({
        identifier,
        avatarUrl: dto.avatarUrl,
        nickname: dto.nickname,
        introduction: dto.introduction,
        platform: this.platform,
      });
    }

    return this.usersService.login({ id: user.id, platform: user.platform });
  }

  // 테스트 (삭제 예정)
  // async login(code: string) {
  //   const tokenRequestData: Kakao.KakaoTokenRequest = {
  //     grant_type: 'authorization_code',
  //     client_id: this.apiKey,
  //     redirect_uri: this.redirectUri,
  //     code,
  //   };

  //   const accessToken = await this.getToken(tokenRequestData);
  //   const userData = await this.getUserData(tokenRequestData, accessToken);

  //   const identifier = String(userData.id);
  //   const user = await this.usersService.getUserByIdentifier(identifier);

  //   return !!user && user.platform === this.platform
  //     ? this.usersService.login(identifier, user.platform)
  //     : this.usersService.register({
  //         identifier,
  //         avatarUrl: 'test-avatar',
  //         nickname: 'snail',
  //         introduction: 'iontro',
  //         platform: this.platform,
  //       });
  // }

  protected async getToken(data: Kakao.KakaoTokenRequest) {
    const tokenResponse = await postReq<Kakao.KakaoResponse>(
      this.TOKEN_URL,
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return tokenResponse.data.access_token;
  }

  protected async getUserData(data: Kakao.KakaoTokenRequest, token: string) {
    const userDataResponse = await postReq<Kakao.KakaoUserDataResponse>(
      this.USER_DATA_URL,
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return userDataResponse.data;
  }
}
