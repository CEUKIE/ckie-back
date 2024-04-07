import { Platform } from '../auth/types';
import { UserTypes } from '../types';

export interface UsersRepository {
  create(data: UserTypes.CreateUserData): Promise<UserTypes.CreateReturnData>;
  findOneByIdentifier(
    identifier: string,
    platform: Platform,
  ): Promise<UserTypes.UserForLogin | null>;
  findOneById(id: string): Promise<UserTypes.UserDetail | null>;
}

export const UsersRepository = Symbol('UsersRepository');
