import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateIndividualDto } from '../dto/individual/create-individual.dto';
import { IndividualsRepository } from '../repositories/individuals.repository';
import { UsersRepository } from '../repositories/users.repository';
import { SpeciesRepository } from '../repositories/species.repository';
import { IndividualTypes } from '../types';
import { UpdateIndividualDto } from '../dto/individual/update-individual.dto';

@Injectable()
export class IndividualsService {
  constructor(
    @Inject(IndividualsRepository)
    private readonly individualsRepository: IndividualsRepository,
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,
    @Inject(SpeciesRepository)
    private readonly speciesRepository: SpeciesRepository,
  ) {}

  async create(userId: string, dto: CreateIndividualDto) {
    await this.findUserByIdOrThrow(userId);
    await this.findSpeciesByIdOrThrow(dto.speciesId);
    const data: IndividualTypes.CreateIndividualData = { ...dto, userId };

    return await this.individualsRepository.create(data);
  }

  async findAllByUserId(userId: string) {
    return await this.individualsRepository.findAllByUserId(userId);
  }

  async update(id: string, dto: UpdateIndividualDto) {
    return await this.individualsRepository.update(id, dto);
  }

  async findUserByIdOrThrow(id: string) {
    const user = await this.usersRepository.findOneById(id);
    if (!user) throw new BadRequestException('존재하지 않는 회원.');

    return user;
  }

  async findSpeciesByIdOrThrow(id: string) {
    const species = await this.speciesRepository.findOneById(id);
    if (!species) throw new BadRequestException('존재하지 않는 종');

    return species;
  }
}
