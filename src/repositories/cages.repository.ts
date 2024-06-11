import { CageTypes } from '../types';

export interface CagesRepository {
  create(data: CageTypes.CreateCageData): Promise<CageTypes.Cage>;
  // TODO 타입 수정
  findAll(): Promise<(CageTypes.Cage & { avatarUrl: string })[]>;
  findAllByUserId(userId: string): Promise<CageTypes.Cage[]>;
  findOneById(id: string): Promise<CageTypes.CageDetail | null>;
  update(
    id: string,
    userId: string,
    data: CageTypes.UpdateCageData,
  ): Promise<CageTypes.Cage>;
  delete(id: string, userId: string): Promise<void>;
}

export const CagesRepository = Symbol('CagesRepository');
