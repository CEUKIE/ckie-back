import { Platform } from '../auth/types';
import { UserTypes } from '../types';

export interface UsersRepository {
  findOneByIdentifier(
    identifier: string,
    platform: Platform,
  ): Promise<UserTypes.UserForLogin | null>;
  create(data: UserTypes.CreateUserData): Promise<UserTypes.CreateReturnData>;
}

export const UsersRepository = Symbol('UsersRepository');
