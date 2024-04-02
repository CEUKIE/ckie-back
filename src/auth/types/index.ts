export namespace Kakao {
  export interface KakaoTokenRequest {
    grant_type: 'authorization_code';
    client_id: string;
    redirect_uri: string;
    code: string;
  }

  export interface KakaoResponse {
    access_token: string;
    token_type: 'bearer';
    refresh_token: string;
    expires_in: number;
    scope: string;
    refresh_token_expires_in: number;
  }

  export interface KakaoUserDataResponse {
    id: number;
    connected_at: 'string';
    properties: {
      nickname: string;
      profile_image?: string;
      thumbnail_image?: string;
    };
    kakao_account: {
      profile_nickname_needs_agreement: boolean;
      profile_image_needs_agreement: boolean;
      profile: {
        nickname: string;
        thumbnail_image_url?: string;
        profile_image_url?: string;
        is_default_image?: boolean;
        is_default_nickname: boolean;
      };
    };
  }
}
