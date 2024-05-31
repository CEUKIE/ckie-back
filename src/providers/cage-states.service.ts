import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CagesRepository } from '../repositories/cages.repository';
import { CreateCageStatesDto } from '../dto/cage-states/create-cage-states.dto';
import { CageStatesRepository } from '../repositories/cage-states.repository';

@Injectable()
export class CageStatesService {
  constructor(
    @Inject(CagesRepository)
    private readonly cagesRepository: CagesRepository,
    @Inject(CageStatesRepository)
    private readonly cageStatesRepository: CageStatesRepository,
  ) {}

  async create(dto: CreateCageStatesDto) {
    await this.findCageByIdOrThrow(dto.cageId);
    return this.cageStatesRepository.create(dto);
  }

  async findCageByIdOrThrow(id: string) {
    const cage = await this.cagesRepository.findOneById(id);
    if (!cage) throw new BadRequestException('존재하지 않는 사육장');

    return cage;
  }
}
