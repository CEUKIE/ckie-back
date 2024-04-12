import { Injectable } from '@nestjs/common';
import { IndividualsRepository } from './individuals.repository';
import { IndividualTypes } from '../types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IndividualsPrismaRepository implements IndividualsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: IndividualTypes.CreateIndividualData) {
    return this.prisma.individual
      .create({
        data,
      })
      .then((v) => ({
        id: v.id,
        name: v.name,
        gender: v.gender,
        hatchedAt: v.hatchedAt,
        memo: v.memo,
        weight: v.weight,
        weightUnit: v.weightUnit,
      }));
  }

  async findAllByUserId(userId: string): Promise<IndividualTypes.Individual[]> {
    return await this.prisma.individual.findMany({
      select: {
        id: true,
        name: true,
        gender: true,
        hatchedAt: true,
        memo: true,
      },
      where: { userId },
    });
  }
}
