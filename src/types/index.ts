import { Platform } from '../auth/types';

export namespace UserTypes {
  export interface UserForLogin {
    id: string;
    platform: Platform;
  }

  export interface CreateUserData {
    nickname: string;
    avatarUrl?: string;
    introduction?: string;
    platform: Platform;
    identifier: string;
  }

  export interface UpdateUserData
    extends Omit<CreateUserData, 'platform' | 'identifier'> {}

  export type CreateReturnData = UserForLogin;

  export interface UserDetail {
    id: string;
    nickname: string;
    avatarUrl?: string | null;
    platform: Platform;
    introduction?: string | null;
  }
}

export namespace IndividualTypes {
  export type Gender = 'MALE' | 'FEMALE' | 'LESS';
  export type WeightUnit = 'G' | 'KG';

  export interface Individual {
    id: string;
    name: string;
    gender: Gender;
    hatchedAt: Date;
    memo?: string | null;
  }

  export interface IndividualDetail {
    id: string;
    name: string;
    avatarUrl: string;
    gender: Gender;
    hatchedAt: Date;
    memo?: string | null;
    weight: number;
    weightUnit: WeightUnit;
  }

  export interface CreateIndividualData {
    name: string;
    avatarUrl: string;
    weight: number;
    weightUnit: IndividualTypes.WeightUnit;
    gender: IndividualTypes.Gender;
    hatchedAt: Date;
    memo?: string;
    userId: string;
    speciesId: string;
  }

  export interface UpdateIndividual extends Partial<CreateIndividualData> {}
}

export namespace SpeciesTypes {
  export interface Species {
    id: string;
    name: string;
    minTemperature: number;
    maxTemperature: number;
    minHumidity: number;
    maxHumidity: number;
  }

  export interface CreateSpeciesData extends Omit<Species, 'id'> {}
  export interface UpdateSpeciesData extends Partial<CreateSpeciesData> {}
}

export namespace CageTypes {
  export interface CreateCageData {
    id: string;
    name: string;
    userId: string;
  }

  export interface UpdateCageData {
    name: string;
  }

  export interface Cage extends Omit<CreateCageData, 'userId'> {}

  export interface CageDetail extends Cage {
    individuals: IndividualTypes.Individual[];
    cageStates: CageStateTypes.CageState[];
  }
}

export namespace CageStateTypes {
  export interface CageState {
    temperature: number;
    humidity: number;
    createdAt: Date;
  }
}

export interface ImageResponse {
  filePath: string;
}
