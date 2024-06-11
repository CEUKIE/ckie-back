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

  async findAllByCageIdToday(
    cageId: string,
  ): Promise<CageStateTypes.CageState[]> {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    return await this.prisma.cageState.findMany({
      select: {
        temperature: true,
        humidity: true,
        createdAt: true,
      },
      where: {
        cageId,
        // createdAt: {
        //   gte: new Date(),
        // },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
