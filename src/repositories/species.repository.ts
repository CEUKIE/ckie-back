import { SpeciesTypes } from '../types';

export interface SpeciesRepository {
  create(data: SpeciesTypes.CreateSpeciesData): Promise<SpeciesTypes.Species>;
  findOneById(id: string): Promise<SpeciesTypes.Species | null>;
  findOneByname(name: string): Promise<SpeciesTypes.Species | null>;
}

export const SpeciesRepository = Symbol('SpeciesRepository');
