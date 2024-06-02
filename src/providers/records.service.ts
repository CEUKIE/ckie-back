import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RecordsRepository } from '../repositories/records.repository';
import { IndividualsRepository } from '../repositories/individuals.repository';
import { CreateRecordsDto } from '../dto/records/create-records-dto';

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

  async findIndividualByIdOrThrow(id: string) {
    const individual = await this.individualsRepository.findOneById(id);
    if (!individual) throw new BadRequestException('존재하지 않는 개체.');

    return individual;
  }
}
