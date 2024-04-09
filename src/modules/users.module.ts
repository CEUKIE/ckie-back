import { Module } from '@nestjs/common';

import { UsersService } from '../providers/users.service';
import { UsersRepository } from '../repositories/users.repository';
import { UsersPrismaRepository } from '../repositories/users.prisma.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UsersController } from '../controllers/users.controller';

@Module({
  controllers: [UsersController],
  imports: [PrismaModule, AuthModule],
  providers: [
    UsersService,
    { provide: UsersRepository, useClass: UsersPrismaRepository },
  ],
})
export class UsersModule {}
