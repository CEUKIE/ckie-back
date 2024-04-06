import { Injectable } from '@nestjs/common';
import { UserTypes } from '../types';
import { UsersRepository } from './users.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: UserTypes.CreateUserData) {
    return this.prisma.user
      .create({
        data,
      })
      .then((v) => v.id);
  }

  async findOneByIdentifier(
    identifier: string,
  ): Promise<UserTypes.UserDetail | null> {
    return await this.prisma.user.findUnique({
      select: {
        id: true,
        nickname: true,
        avatarUrl: true,
        introduction: true,
      },
      where: {
        identifier,
      },
    });
  }
}
