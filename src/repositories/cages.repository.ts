import { CageTypes } from '../types';

export interface CagesRepository {
  create(data: CageTypes.CreateCageData): Promise<CageTypes.Cage>;
  findAll(): Promise<CageTypes.Cage[]>;
  findAllByUserId(userId: string): Promise<CageTypes.Cage[]>;
  findOneById(id: string): Promise<CageTypes.CageDetail | null>;
  update(id: string, data: CageTypes.UpdateCageData): Promise<CageTypes.Cage>;
}

export const CagesRepository = Symbol('CagesRepository');
