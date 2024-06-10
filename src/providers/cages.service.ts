import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { CagesRepository } from '../repositories/cages.repository';
import { CageTypes } from '../types';
import { UsersRepository } from '../repositories/users.repository';
import { CreateCageDto } from '../dto/cage/create-cage.dto';

@Injectable()
export class CagesService {
  constructor(
    @Inject(CagesRepository) private readonly cagesRepository: CagesRepository,
    @Inject(UsersRepository) private readonly usersRepository: UsersRepository,
  ) {}

  async create(userId: string, dto: CreateCageDto) {
    const data: CageTypes.CreateCageData = { ...dto, userId };
    await this.findUserByIdOrThrow(userId);

    return await this.cagesRepository.create(data);
  }

  async findAll() {
    return await this.cagesRepository.findAll();
  }

  async findAllByUserId(userId: string) {
    await this.usersRepository.findOneById(userId);
    return await this.cagesRepository.findAllByUserId(userId);
  }

  async findOneById(id: string) {
    return await this.findCageByIdOrThrow(id);
  }

  async update(id: string, userId: string, data: CageTypes.UpdateCageData) {
    await this.usersRepository.findOneById(id);
    await this.findCageByIdOrThrow(id);

    return await this.cagesRepository.update(id, userId, data);
  }

  async delete(id: string, userId: string) {
    try {
      await this.cagesRepository.delete(id, userId);
      return true;
    } catch (e) {
      return false;
    }
  }

  async findCageByIdOrThrow(id: string) {
    const cage = await this.cagesRepository.findOneById(id);
    if (!cage) throw new BadRequestException('존재하지 않는 사육장');

    return cage;
  }

  async findUserByIdOrThrow(id: string) {
    const user = await this.usersRepository.findOneById(id);
    if (!user) throw new BadRequestException('존재하지 않는 회원');

    return user;
  }
}
