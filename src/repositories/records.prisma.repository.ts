import { Injectable } from '@nestjs/common';
import { RecordsRepository } from './records.repository';
import { RecordTypes } from '../types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecordsPrismaRepository implements RecordsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: RecordTypes.CreateRecordData,
  ): Promise<RecordTypes.Record> {
    return await this.prisma.record.create({
      data,
    });
  }

  async findAllByIndividualId(
    individualId: string,
  ): Promise<RecordTypes.Record[]> {
    return await this.prisma.record.findMany({
      select: {
        id: true,
        targetDate: true,
        memo: true,
        category: true,
      },
      where: { individualId },
      orderBy: { targetDate: 'asc' },
    });
  }

  async findWeightsByIndividualId(
    individualId: string,
  ): Promise<RecordTypes.WeightRecord[]> {
    return await this.prisma.record.findMany({
      select: {
        id: true,
        targetDate: true,
        weight: true,
      },
      where: {
        individualId,
        category: 'WEIGHT',
      },
    });
  }

  async delete(id: string) {
    await this.prisma.record.delete({
      where: { id },
    });
  }
}
