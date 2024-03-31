import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { Response } from 'express';
import { postReq } from '../common';
import { Kakao } from './types';

@Injectable()
export class KakaoService {
  private readonly apiKey = process.env.KAKAO_LOGIN_API_KEY ?? '';
  private readonly redirectUri = process.env.KAKAO_REDIRECT_URI ?? '';

  async kakaoRedirect(res: Response) {
    const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${this.apiKey}&redirect_uri=${this.redirectUri}`;
    res.redirect(url);
  }

  async kakaoLogin(code: string) {
    const tokenRequestData: Kakao.KakaoTokenRequest = {
      grant_type: 'authorization_code',
      client_id: this.apiKey,
      redirect_uri: this.redirectUri,
      code,
    };
    const tokenRequestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const accessToken = await this.getKakaoToken(
      tokenRequestData,
      tokenRequestConfig,
    );

    const userData = await this.getKakaoUserData(
      tokenRequestData,
      tokenRequestConfig,
      accessToken,
    );

    console.log(userData);
  }

  async getKakaoToken(
    data: Kakao.KakaoTokenRequest,
    config: AxiosRequestConfig,
  ) {
    const url = 'https://kauth.kakao.com/oauth/token';
    const tokenResponse = await postReq<Kakao.KakaoResponse>(url, data, config);

    return tokenResponse.data.access_token;
  }

  async getKakaoUserData(
    data: Kakao.KakaoTokenRequest,
    config: AxiosRequestConfig,
    accessToken: string,
  ) {
    const url =
      'https://kapi.kakao.com/v2/user/me?secure_resource=true?property_keys=kakao_account.profile';
    const userDataResponse = await postReq<Kakao.KakaoUserDataResponse>(
      url,
      data,
      {
        headers: {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return userDataResponse.data;
  }
}
