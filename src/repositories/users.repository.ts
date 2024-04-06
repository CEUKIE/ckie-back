import { UserTypes } from '../types';

export interface UsersRepository {
  findOneByIdentifier(identifier: string): Promise<UserTypes.UserDetail | null>;
  create(data: UserTypes.CreateUserData): Promise<string>;
}

export const UsersRepository = Symbol('UsersRepository');
