export namespace UserTypes {
  export interface UserDetail {
    id: string;
    nickname: string;
    avatarUrl: string;
    introduction: string;
  }

  export interface CreateUserData {
    nickname: string;
    avatarUrl: string;
    introduction: string;
    platform: 'kakao' | 'google' | 'naver';
    identifier: string;
  }
}
