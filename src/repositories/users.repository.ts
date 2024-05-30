import { Platform } from '../auth/types';
import { UserTypes } from '../types';

export interface UsersRepository {
  create(data: UserTypes.CreateUserData): Promise<UserTypes.CreateReturnData>;
  findOneByIdentifierAndPlatform(
    identifier: string,
    platform: Platform,
  ): Promise<UserTypes.UserForLogin | null>;
  findOneById(id: string): Promise<UserTypes.UserDetail | null>;
  update(id: string, data: UserTypes.UpdateUserData): Promise<void>;
}

export const UsersRepository = Symbol('UsersRepository');
