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

  async delete(id: string) {
    await this.findOneByIdOrThow(id);
    return this.speciesRepository.delete(id);
  }

  async checkDuplicateName(name: string) {
    const species = await this.speciesRepository.findOneByname(name);
    if (species) throw new BadRequestException('이미 존재하는 종.');
  }

  async findOneByIdOrThow(id: string) {
    const species = await this.speciesRepository.findOneById(id);
    if (!species) throw new BadRequestException('존재하지 않는 종.');

    return species;
  }
}
