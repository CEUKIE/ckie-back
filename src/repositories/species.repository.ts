import { SpeciesTypes } from '../types';

export interface SpeciesRepository {
  create(data: SpeciesTypes.CreateSpeciesData): Promise<SpeciesTypes.Species>;
  findAll(): Promise<SpeciesTypes.Species[]>;
  findOneById(id: string): Promise<SpeciesTypes.Species | null>;
  findOneByname(name: string): Promise<SpeciesTypes.Species | null>;
  update(
    id: string,
    data: SpeciesTypes.UpdateSpeciesData,
  ): Promise<SpeciesTypes.Species>;
}

export const SpeciesRepository = Symbol('SpeciesRepository');
