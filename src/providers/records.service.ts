import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RecordsRepository } from '../repositories/records.repository';
import { IndividualsRepository } from '../repositories/individuals.repository';
import { CreateRecordsDto } from '../dto/records/create-records-dto';
import { RecordTypes } from '../types';

@Injectable()
export class RecordsService {
  constructor(
    @Inject(RecordsRepository)
    private readonly recordsRepository: RecordsRepository,
    @Inject(IndividualsRepository)
    private readonly individualsRepository: IndividualsRepository,
  ) {}

  async create(data: CreateRecordsDto) {
    const { individualId, targetDate } = data;
    await this.findIndividualByIdOrThrow(individualId);

    return await this.recordsRepository.create({
      ...data,
      targetDate: new Date(targetDate),
    });
  }

  async findAllByIndividualId(individualId: string) {
    await this.findIndividualByIdOrThrow(individualId);
    const original = await this.recordsRepository.findAllByIndividualId(
      individualId,
    );
    return this.transformRecordData(original);
  }

  async findWeightsByIndividualId(individualId: string) {
    await this.findIndividualByIdOrThrow(individualId);
    return await this.recordsRepository.findWeightsByIndividualId(individualId);
  }

  async findIndividualByIdOrThrow(id: string) {
    const individual = await this.individualsRepository.findOneById(id);
    if (!individual) throw new BadRequestException('존재하지 않는 개체.');

    return individual;
  }

  async delete(id: string) {
    try {
      await this.recordsRepository.delete(id);
      return true;
    } catch (e) {
      return false;
    }
  }

  transformRecordData(
    original: RecordTypes.Record[],
  ): RecordTypes.RecordsResponse[] {
    const groupData: { [key: string]: RecordTypes.RecordsResponse } = {};

    original.forEach((item) => {
      const target = this.foramtDate(item.targetDate);
      if (!groupData[target]) {
        groupData[target] = { target, record: [] };
      }

      groupData[target].record.push({
        id: item.id,
        name: item.category,
        memo: item.memo,
      });
    });

    return Object.values(groupData);
  }

  foramtDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }
}
