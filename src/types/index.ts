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
    avatarUrl: string;
    gender: Gender;
    hatchedAt: Date;
    memo?: string | null;
    species: Pick<SpeciesTypes.Species, 'id' | 'name'>;
    cage: CageTypes.Cage | null;
  }

  export interface IndividualDetail extends Individual {
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
    avatarUrl: string;
    userId: string;
  }

  export interface UpdateCageData {
    name: string;
  }

  export interface Cage extends Omit<CreateCageData, 'userId' | 'avatarUrl'> {}

  export interface CageDetail extends Cage {
    individuals: Omit<IndividualTypes.Individual, 'cage'>[];
    cageStates: CageStateTypes.CageState[];
  }
}

export namespace CageStateTypes {
  export interface CreateCageStatesData {
    cageId: string;
    temperature: number;
    humidity: number;
  }

  export interface CageState {
    temperature: number;
    humidity: number;
    createdAt: Date;
  }
}

export namespace RecordTypes {
  export type RecordCategory = 'FEEDING' | 'WEIGHT' | 'ECDYSIS' | 'ETC';

  export interface RecordsResponse {
    target: string;
    record: {
      id: string;
      name: RecordCategory;
      memo?: string | null;
    }[];
  }

  export interface CreateRecordData {
    individualId: string;
    targetDate: Date;
    memo?: string | null;
    weight?: number | null;
    category: RecordCategory;
  }

  export interface Record {
    id: string;
    targetDate: Date;
    memo?: string | null;
    category: RecordCategory;
  }

  export interface WeightRecord {
    id: string;
    targetDate: Date;
    weight?: number | null;
  }
}

export interface ImageResponse {
  filePath: string;
}
