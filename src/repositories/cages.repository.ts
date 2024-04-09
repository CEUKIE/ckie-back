import { CageTypes } from '../types';

export interface CagesRepository {
  create(data: CageTypes.CreateCageData): Promise<CageTypes.Cage>;
  findAllByUserId(userId: string): Promise<CageTypes.Cage[]>;
}

export const CagesRepository = Symbol('CagesRepository');
