import { RecordTypes } from '../types';

export interface RecordsRepository {
  create(data: RecordTypes.CreateRecordData): Promise<RecordTypes.Record>;
  findAllByIndividualId(individualId: string): Promise<RecordTypes.Record[]>;
}

export const RecordsRepository = Symbol('RecordsRepository');
