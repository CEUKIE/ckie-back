import { Module } from '@nestjs/common';
import { UsersService } from '../providers/users.service';
import { UsersRepository } from '../repositories/users.repository';
import { UsersPrismaRepository } from '../repositories/users.prisma.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    UsersService,
    { provide: UsersRepository, useClass: UsersPrismaRepository },
  ],
})
export class UsersModule {}
