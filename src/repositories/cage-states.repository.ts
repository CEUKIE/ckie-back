import { CageStateTypes } from '../types';

export interface CageStatesRepository {
  create(
    data: CageStateTypes.CreateCageStatesData,
  ): Promise<CageStateTypes.CageState>;
}

export const CageStatesRepository = Symbol('CageStatesRepository');
