import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { CreateSpeciesDto } from '../dto/species/create-species.dto';
import { SpeciesRepository } from '../repositories/species.repository';
import { UpdateSpeciesDto } from '../dto/species/update-species.dto';

@Injectable()
export class SpeciesService {
  constructor(
    @Inject(SpeciesRepository)
    private readonly speciesRepository: SpeciesRepository,
  ) {}

  async create(dto: CreateSpeciesDto) {
    await this.checkDuplicateName(dto.name);
    return this.speciesRepository.create(dto);
  }

  async findAll() {
    return await this.speciesRepository.findAll();
  }

  async update(id: string, dto: UpdateSpeciesDto) {
    const { name } = dto;
    name && (await this.checkDuplicateName(name));

    return await this.speciesRepository.update(id, dto);
  }

  async checkDuplicateName(name: string) {
    const species = await this.speciesRepository.findOneByname(name);
    if (species) throw new BadRequestException('이미 존재하는 종.');
  }
}
