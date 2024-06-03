import { RecordTypes } from '../types';

export interface RecordsRepository {
  create(data: RecordTypes.CreateRecordData): Promise<RecordTypes.Record>;
  findAllByIndividualId(individualId: string): Promise<RecordTypes.Record[]>;
  findWeightsByIndividualId(
    individualId: string,
  ): Promise<RecordTypes.WeightRecord[]>;
  delete(id: string): Promise<void>;
}

export const RecordsRepository = Symbol('RecordsRepository');
