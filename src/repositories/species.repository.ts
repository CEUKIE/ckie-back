import { SpeciesTypes } from '../types';

export interface SpeciesRepository {
  create(data: SpeciesTypes.CreateSpeciesData): Promise<SpeciesTypes.Species>;
  findAll(): Promise<SpeciesTypes.Species[]>;
  findOneById(id: string): Promise<SpeciesTypes.Species | null>;
  findOneByName(name: string): Promise<SpeciesTypes.Species | null>;
  update(
    id: string,
    data: SpeciesTypes.UpdateSpeciesData,
  ): Promise<SpeciesTypes.Species>;
  delete(id: string): Promise<{ name: string }>;
}

export const SpeciesRepository = Symbol('SpeciesRepository');
