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

  async findAll() {
    return await this.prisma.cage.findMany();
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

  async findOneById(id: string): Promise<CageTypes.CageDetail | null> {
    return await this.prisma.cage.findUnique({
      select: {
        id: true,
        name: true,
        individuals: {
          select: {
            id: true,
            name: true,
            gender: true,
            avatarUrl: true,
            hatchedAt: true,
            memo: true,
            species: true,
          },
        },
        cageStates: {
          select: {
            temperature: true,
            humidity: true,
            createdAt: true,
          },
        },
      },
      where: { id },
    });
  }

  async update(
    id: string,
    userId: string,
    data: CageTypes.UpdateCageData,
  ): Promise<CageTypes.Cage> {
    return await this.prisma.cage.update({
      select: {
        id: true,
        name: true,
      },
      where: {
        id,
        userId,
      },
      data,
    });
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.prisma.cage.delete({
      where: { id, userId },
    });
  }
}
