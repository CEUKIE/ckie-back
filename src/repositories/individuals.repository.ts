import { IndividualTypes } from '../types';

export interface IndividualsRepository {
  create(
    data: IndividualTypes.CreateIndividualData,
  ): Promise<IndividualTypes.IndividualDetail>;
  findAllByUserId(userId: string): Promise<IndividualTypes.Individual[]>;
  update(
    id: string,
    data: IndividualTypes.UpdateIndividual,
  ): Promise<IndividualTypes.IndividualDetail>;
  // findOneById(id: string): Promise<IndividualTypes.IndividualDetail>;
}

export const IndividualsRepository = Symbol('IndividualsRepository');
