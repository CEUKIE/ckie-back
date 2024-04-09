import { Module } from '@nestjs/common';
import { CagesRepository } from '../repositories/cages.repository';
import { CagesPrismaRepository } from '../repositories/cages.prisma.repository';
import { CagesController } from '../controllers/cages.controller';
import { CagesService } from '../providers/cages.service';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [CagesController],
  providers: [
    CagesService,
    { provide: CagesRepository, useClass: CagesPrismaRepository },
  ],
})
export class CagesModule {}
