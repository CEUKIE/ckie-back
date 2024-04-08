import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateSpeciesDto } from '../dto/species/create-species.dto';
import { SpeciesRepository } from '../repositories/species.repository';

@Injectable()
export class SpeciesService {
  constructor(
    @Inject(SpeciesRepository)
    private readonly speciesRepository: SpeciesRepository,
  ) {}

  async create(dto: CreateSpeciesDto) {
    const species = await this.speciesRepository.findOneByname(dto.name);
    if (species) throw new BadRequestException('이미 존재하는 종.');

    return this.speciesRepository.create(dto);
  }

  async findAll() {
    return await this.speciesRepository.findAll();
  }
}
