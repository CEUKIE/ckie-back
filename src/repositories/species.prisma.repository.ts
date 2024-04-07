import { Injectable } from '@nestjs/common';
import { SpeciesRepository } from './species.repository';
import { SpeciesTypes } from '../types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SpeciesPrismaRepository implements SpeciesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: string): Promise<SpeciesTypes.Species | null> {
    return await this.prisma.species.findUnique({
      select: {
        id: true,
        name: true,
        optimalTemperature: true,
        optiamlHumidity: true,
      },
      where: {
        id,
      },
    });
  }
}
