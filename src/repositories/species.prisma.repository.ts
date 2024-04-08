import { Injectable } from '@nestjs/common';
import { SpeciesRepository } from './species.repository';
import { SpeciesTypes } from '../types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SpeciesPrismaRepository implements SpeciesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: SpeciesTypes.CreateSpeciesData): Promise<SpeciesTypes.Species> {
    return this.prisma.species
      .create({
        data,
      })
      .then((v) => ({
        id: v.id,
        name: v.name,
        minTemperature: v.minTemperature,
        maxTemperature: v.maxTemperature,
        minHumidity: v.minHumidity,
        maxHumidity: v.maxHumidity,
      }));
  }

  async findAll(): Promise<SpeciesTypes.Species[]> {
    return await this.prisma.species.findMany({
      select: {
        id: true,
        name: true,
        minTemperature: true,
        maxTemperature: true,
        minHumidity: true,
        maxHumidity: true,
      },
    });
  }

  async findOneById(id: string): Promise<SpeciesTypes.Species | null> {
    return await this.prisma.species.findUnique({
      select: {
        id: true,
        name: true,
        minTemperature: true,
        maxTemperature: true,
        minHumidity: true,
        maxHumidity: true,
      },
      where: {
        id,
      },
    });
  }

  async findOneByName(name: string): Promise<SpeciesTypes.Species | null> {
    return await this.prisma.species.findUnique({
      select: {
        id: true,
        name: true,
        minTemperature: true,
        maxTemperature: true,
        minHumidity: true,
        maxHumidity: true,
      },
      where: {
        name,
      },
    });
  }

  async update(
    id: string,
    data: Partial<SpeciesTypes.CreateSpeciesData>,
  ): Promise<SpeciesTypes.Species> {
    return await this.prisma.species
      .update({
        where: { id },
        data,
      })
      .then((v) => ({
        id: v.id,
        name: v.name,
        minTemperature: v.minTemperature,
        maxTemperature: v.maxTemperature,
        minHumidity: v.minHumidity,
        maxHumidity: v.maxHumidity,
      }));
  }

  async delete(id: string) {
    return this.prisma.species.delete({ where: { id } }).then((v) => ({
      name: v.name,
    }));
  }
}
