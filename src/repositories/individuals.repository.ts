import { IndividualTypes } from '../types';

export interface IndividualsRepository {
  create(
    data: IndividualTypes.CreateIndividualData,
  ): Promise<IndividualTypes.IndividualDetail>;
  // findAll(): Promise<IndividualTypes.Individual>;
  // findOneById(id: string): Promise<IndividualTypes.IndividualDetail>;
}

export const IndividualsRepository = Symbol('IndividualsRepository');
