import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Min,
  Validate,
} from 'class-validator';
import { RecordTypes } from '../../types';
import { IsCategory } from './validation-decorator/is-categort';

export class CreateRecordsDto {
  @IsUUID()
  readonly individualId: string;

  @IsDateString()
  readonly targetDate: string;

  @IsOptional()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 1,
  })
  @Min(1)
  readonly weight?: number | null;

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
    weight?: number | null,
  ) {
    this.individualId = individualId;
    this.targetDate = targetDate;
    this.category = category;
    this.memo = memo;
    this.weight = weight;
  }
}
