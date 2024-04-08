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
    const { name } = dto;
    await this.findSpeciesByNameOrThrow(name);

    return this.speciesRepository.create(dto);
  }

  async findSpeciesByNameOrThrow(name: string) {
    const species = await this.speciesRepository.findOneByname(name);
    if (species) throw new BadRequestException('이미 존재하는 종입니다.');

    return species;
  }
}
