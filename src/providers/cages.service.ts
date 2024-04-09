import { Inject, Injectable } from '@nestjs/common';

import { CagesRepository } from '../repositories/cages.repository';
import { CageTypes } from '../types';

@Injectable()
export class CagesService {
  constructor(
    @Inject(CagesRepository) private readonly cagesRepository: CagesRepository,
  ) {}

  async create(dto: CageTypes.CreateCageData) {
    return await this.cagesRepository.create(dto);
  }

  async findAll() {
    return await this.cagesRepository.findAll();
  }

  async findAllByUserId(userId: string) {
    return await this.cagesRepository.findAllByUserId(userId);
  }
}
