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
}
