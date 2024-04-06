import { Inject, Injectable } from '@nestjs/common';
import { UserTypes } from '../types';
import { UsersRepository } from '../repositories/users.repository';
import { Platform } from '../auth/types';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepository) private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  async login(identifier: string, platform: Platform) {
    return await this.authService.generateAccessToken({ identifier, platform });
  }

  async register(data: UserTypes.CreateUserData): Promise<string> {
    return await this.usersRepository.create(data);
  }

  async getUserByIdentifier(
    identifier: string,
  ): Promise<UserTypes.UserDetail | null> {
    return this.usersRepository.findOneByIdentifier(identifier);
  }
}
