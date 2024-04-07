import { Platform } from '../auth/types';

export namespace UserTypes {
  export interface UserForLogin {
    id: string;
    platform: Platform;
  }

  export interface CreateUserData {
    nickname: string;
    avatarUrl?: string;
    introduction: string;
    platform: Platform;
    identifier: string;
  }

  export type CreateReturnData = UserForLogin;
}
