import { Injectable } from '@nestjs/common';

import { UserTypes } from '../types';
import { UsersRepository } from './users.repository';
import { PrismaService } from '../prisma/prisma.service';
import { Platform } from '../auth/types';

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: UserTypes.CreateUserData) {
    return this.prisma.user
      .create({
        data,
      })
      .then((v) => ({ id: v.id, platform: v.platform }));
  }

  async findOneByIdentifierAndPlatform(
    identifier: string,
    platform: Platform,
  ): Promise<UserTypes.UserForLogin | null> {
    return await this.prisma.user.findUnique({
      select: {
        id: true,
        platform: true,
      },
      where: {
        identifier,
        platform,
      },
    });
  }

  async findOneById(id: string): Promise<UserTypes.UserDetail | null> {
    return await this.prisma.user.findUnique({
      select: {
        id: true,
        nickname: true,
        avatarUrl: true,
        platform: true,
        introduction: true,
      },
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UserTypes.UpdateUserData) {
    await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }
}
