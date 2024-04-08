import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SpeciesRepository } from '../repositories/species.repository';
import { SpeciesPrismaRepository } from '../repositories/species.prisma.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    { provide: SpeciesRepository, useClass: SpeciesPrismaRepository },
  ],
})
export class SpeciesModule {}
