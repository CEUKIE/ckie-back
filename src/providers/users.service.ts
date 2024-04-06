import { Inject, Injectable } from '@nestjs/common';
import { UserTypes } from '../types';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepository) private readonly usersRepository: UsersRepository,
  ) {}

  register(data: UserTypes.CreateUserData): Promise<string> {
    return this.usersRepository.create(data);
  }
}
