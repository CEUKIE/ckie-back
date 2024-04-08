import { SpeciesTypes } from '../types';

export interface SpeciesRepository {
  findOneById(id: string): Promise<SpeciesTypes.Species | null>;
}

export const SpeciesRepository = Symbol('SpeciesRepository');
