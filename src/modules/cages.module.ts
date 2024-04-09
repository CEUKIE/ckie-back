import { Module } from '@nestjs/common';
import { CagesRepository } from '../repositories/cages.repository';
import { CagesPrismaRepository } from '../repositories/cages.prisma.repository';
import { CagesController } from '../controllers/cages.controller';
import { CagesService } from '../providers/cages.service';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersRepository } from '../repositories/users.repository';
import { UsersPrismaRepository } from '../repositories/users.prisma.repository';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [CagesController],
  providers: [
    CagesService,
    { provide: CagesRepository, useClass: CagesPrismaRepository },
    { provide: UsersRepository, useClass: UsersPrismaRepository },
  ],
})
export class CagesModule {}
