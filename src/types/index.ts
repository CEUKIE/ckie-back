import { Platform } from '../auth/types';

export namespace UserTypes {
  export interface UserForLogin {
    id: string;
    platform: Platform;
  }

  export interface CreateUserData {
    nickname: string;
    avatarUrl?: string;
    introduction: string;
    platform: Platform;
    identifier: string;
  }

  export type CreateReturnData = UserForLogin;

  export interface UserDetail {
    id: string;
    nickname: string;
    avatarUrl?: string | null;
    platform: Platform;
    introduction: string;
  }
}

export namespace IndividualTypes {
  export type Gender = 'MALE' | 'FEMALE';
  export type WeightUnit = 'G' | 'KG';

  export interface Individual {
    id: string;
    name: string;
    gender: Gender;
    hatchedAt: Date;
    memo?: string;
  }

  export interface IndividualDetail {
    id: string;
    name: string;
    gender: Gender;
    hatchedAt: Date;
    memo?: string | null;
    weight: number;
    weightUnit: WeightUnit;
  }

  export interface CreateIndividualData {
    name: string;
    weight: number;
    weightUnit: IndividualTypes.WeightUnit;
    gender: IndividualTypes.Gender;
    hatchedAt: Date;
    memo?: string;
    userId: string;
    speciesId: string;
  }
}

export namespace SpeciesTypes {
  export interface Species {
    id: string;
    name: string;
    optimalTemperature: number;
    optiamlHumidity: number;
  }
}
