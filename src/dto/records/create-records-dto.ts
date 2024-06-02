import {
  IsDateString,
  IsString,
  IsUUID,
  Length,
  Validate,
} from 'class-validator';
import { RecordTypes } from '../../types';
import { IsCategory } from './validation-decorator/is-categort';

export class CreateRecordsDto {
  @IsUUID()
  readonly individualId: string;

  @IsDateString()
  readonly targetDate: string;

  @IsString()
  @Length(0, 15)
  readonly memo?: string | null;

  @Validate(IsCategory)
  readonly category: RecordTypes.RecordCategory;

  constructor(
    individualId: string,
    targetDate: string,
    category: RecordTypes.RecordCategory,
    memo?: string | null,
  ) {
    this.individualId = individualId;
    this.targetDate = targetDate;
    this.category = category;
    this.memo = memo;
  }
}
