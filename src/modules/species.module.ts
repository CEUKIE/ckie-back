import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SpeciesRepository } from '../repositories/species.repository';
import { SpeciesPrismaRepository } from '../repositories/species.prisma.repository';
import { SpeciesController } from '../controllers/species.controller';
import { SpeciesService } from '../providers/species.service';

@Module({
  imports: [PrismaModule],
  controllers: [SpeciesController],
  providers: [
    SpeciesService,
    { provide: SpeciesRepository, useClass: SpeciesPrismaRepository },
  ],
})
export class SpeciesModule {}
