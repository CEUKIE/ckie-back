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

  async signup(
    data: UserTypes.CreateUserData,
  ): Promise<UserTypes.CreateReturnData> {
    return await this.usersRepository.create(data);
  }

  async getUserByIdentifierAndPlatform(
    identifier: string,
    platform: Platform,
  ): Promise<UserTypes.UserForLogin | null> {
    return await this.usersRepository.findOneByIdentifierAndPlatform(
      identifier,
      platform,
    );
  }

  async getUserById(id: string): Promise<UserTypes.UserDetail | null> {
    return await this.usersRepository.findOneById(id);
  }
}
