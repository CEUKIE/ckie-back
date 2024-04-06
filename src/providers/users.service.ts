import { Inject, Injectable } from '@nestjs/common';

import { UserTypes } from '../types';
import { UsersRepository } from '../repositories/users.repository';
import { Platform, TokenData } from '../auth/types';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepository) private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  async login(data: TokenData) {
    return await this.authService.generateAccessToken(data);
  }

  async register(
    data: UserTypes.CreateUserData,
  ): Promise<UserTypes.CreateReturnData> {
    return await this.usersRepository.create(data);
  }

  async getUserByIdentifier(
    identifier: string,
    platform: Platform,
  ): Promise<UserTypes.UserForLogin | null> {
    return this.usersRepository.findOneByIdentifier(identifier, platform);
  }
}
