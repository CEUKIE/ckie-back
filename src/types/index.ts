import { Platform } from '../auth/types';

export namespace UserTypes {
  export interface UserDetail {
    id: string;
    nickname: string;
    avatarUrl: string;
    introduction: string;
    platform: Platform;
  }

  export interface CreateUserData {
    nickname: string;
    avatarUrl: string;
    introduction: string;
    platform: Platform;
    identifier: string;
  }
}
