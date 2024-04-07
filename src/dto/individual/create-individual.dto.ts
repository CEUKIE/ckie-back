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

import { IndividualTypes } from '../../types';
import { IsGender } from './validation-decorator/is-gender';
import { IsWeightUnit } from './validation-decorator/is-weightunit';

export class CreateIndividualDto {
  @IsString()
  @Length(2, 10)
  readonly name: string;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 1,
  })
  @Min(0)
  readonly weight: number;

  @Validate(IsWeightUnit)
  readonly weightUnit: IndividualTypes.WeightUnit;

  @Validate(IsGender)
  readonly gender: IndividualTypes.Gender;

  @IsDateString()
  readonly hatchedAt: Date;

  @IsUUID()
  readonly userId: string;

  @IsUUID()
  readonly speciesId: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  readonly memo?: string;

  constructor(
    name: string,
    weight: number,
    weightUnit: IndividualTypes.WeightUnit,
    gender: IndividualTypes.Gender,
    hatchedAt: Date,
    userId: string,
    speciesId: string,
    memo?: string,
  ) {
    this.name = name;
    this.weight = weight;
    this.weightUnit = weightUnit;
    this.gender = gender;
    this.hatchedAt = hatchedAt;
    this.userId = userId;
    this.speciesId = speciesId;
    this.memo = memo;
  }
}
