import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CageTypes } from '../types';
import { CagesRepository } from './cages.repository';

@Injectable()
export class CagesPrismaRepository implements CagesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CageTypes.CreateCageData): Promise<CageTypes.Cage> {
    return this.prisma.cage
      .create({
        data,
      })
      .then((v) => ({ id: v.id, name: v.name }));
  }

  async findAllByUserId(userId: string): Promise<CageTypes.Cage[]> {
    return await this.prisma.cage.findMany({
      select: {
        id: true,
        name: true,
      },
      where: { userId },
    });
  }
}
