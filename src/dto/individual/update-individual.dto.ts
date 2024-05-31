import {
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Validate,
} from 'class-validator';

import { IsGender } from './validation-decorator/is-gender';
import { IndividualTypes } from '../../types';

export class UpdateIndividualDto {
  @IsString()
  @Length(2, 10)
  readonly name: string;

  @IsString()
  readonly avatarUrl: string;

  @Validate(IsGender)
  readonly gender: IndividualTypes.Gender;

  @IsDateString()
  readonly hatchedAt: Date;

  @IsUUID()
  readonly cageId: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  readonly memo?: string;

  constructor(
    name: string,
    avatarUrl: string,
    gender: IndividualTypes.Gender,
    hatchedAt: Date,
    cageId: string,
    memo?: string,
  ) {
    this.name = name;
    this.avatarUrl = avatarUrl;
    this.gender = gender;
    this.hatchedAt = hatchedAt;
    this.cageId = cageId;
    this.memo = memo;
  }
}
