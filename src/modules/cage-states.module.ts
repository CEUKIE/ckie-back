import { Module } from '@nestjs/common';
import { CageStatesController } from '../controllers/cage-states.controller';
import { CageStatesRepository } from '../repositories/cage-states.repository';
import { CageStatesPrismaRepository } from '../repositories/cage-states.prisma.repository';
import { CageStatesService } from '../providers/cage-states.service';
import { CagesRepository } from '../repositories/cages.repository';
import { CagesPrismaRepository } from '../repositories/cages.prisma.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CageStatesController],
  providers: [
    CageStatesService,
    { provide: CageStatesRepository, useClass: CageStatesPrismaRepository },
    { provide: CagesRepository, useClass: CagesPrismaRepository },
  ],
})
export class CageStatesModule {}
