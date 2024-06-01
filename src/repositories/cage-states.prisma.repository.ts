import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CageStateTypes } from '../types';
import { CageStatesRepository } from './cage-states.repository';

@Injectable()
export class CageStatesPrismaRepository implements CageStatesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CageStateTypes.CreateCageStatesData,
  ): Promise<CageStateTypes.CageState> {
    return await this.prisma.cageState
      .create({
        data,
      })
      .then((v) => ({
        id: v.id,
        temperature: v.temperature,
        humidity: v.humidity,
        createdAt: v.createdAt,
      }));
  }
}
