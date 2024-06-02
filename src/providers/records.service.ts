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

  async findIndividualByIdOrThrow(id: string) {
    const individual = await this.individualsRepository.findOneById(id);
    if (!individual) throw new BadRequestException('존재하지 않는 개체.');

    return individual;
  }

  transformRecordData(
    original: RecordTypes.Record[],
  ): RecordTypes.RecordsResponse[] {
    const transformedData: RecordTypes.RecordsResponse[] = [];

    original.forEach((item) => {
      let exist = false;
      const target = this.foramtDate(item.targetDate);

      transformedData.forEach((newItem) => {
        if (newItem['target'] === target) {
          newItem.record.push({
            id: item.id,
            name: item.category,
            memo: item.memo,
          });
          exist = true;
        }
      });

      if (!exist) {
        transformedData.push({
          target: target,
          record: [{ id: item.id, name: item.category, memo: item.memo }],
        });
        exist = false;
      }
    });

    return transformedData;
  }

  foramtDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }
}
