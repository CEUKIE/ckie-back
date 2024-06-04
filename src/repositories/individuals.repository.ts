import { IndividualTypes } from '../types';

export interface IndividualsRepository {
  create(
    data: IndividualTypes.CreateIndividualData,
  ): Promise<Omit<IndividualTypes.IndividualDetail, 'species' | 'cage'>>;
  findAllByUserId(userId: string): Promise<IndividualTypes.Individual[]>;
  findOneById(id: string): Promise<IndividualTypes.IndividualDetail | null>;
  update(
    id: string,
    data: IndividualTypes.UpdateIndividual,
  ): Promise<Omit<IndividualTypes.IndividualDetail, 'species' | 'cage'>>;
  delete(id: string): Promise<void>;
}

export const IndividualsRepository = Symbol('IndividualsRepository');
