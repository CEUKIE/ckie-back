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
        avatarUrl: v.avatarUrl,
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
        avatarUrl: true,
        gender: true,
        hatchedAt: true,
        memo: true,
        species: true,
        cage: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: { userId, deleted: null },
    });
  }

  async findOneById(
    id: string,
  ): Promise<IndividualTypes.IndividualDetail | null> {
    return await this.prisma.individual.findUnique({
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        gender: true,
        hatchedAt: true,
        memo: true,
        weight: true,
        weightUnit: true,
      },
      where: {
        id,
        deleted: null,
      },
    });
  }

  async update(
    id: string,
    data: IndividualTypes.UpdateIndividual,
  ): Promise<IndividualTypes.IndividualDetail> {
    return this.prisma.individual.update({
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        gender: true,
        hatchedAt: true,
        memo: true,
        weight: true,
        weightUnit: true,
      },
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.individual.update({
      data: {
        deleted: new Date(),
      },
      where: { id },
    });
  }
}
