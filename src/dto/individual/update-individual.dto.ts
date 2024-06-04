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
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly avatarUrl?: string;

  @Validate(IsGender)
  @IsOptional()
  readonly gender?: IndividualTypes.Gender;

  @IsDateString()
  @IsOptional()
  readonly hatchedAt?: Date;

  @IsUUID()
  @IsOptional()
  readonly cageId?: string;

  @IsString()
  @Length(0, 50)
  @IsOptional()
  readonly memo?: string;

  constructor(
    name?: string,
    avatarUrl?: string,
    gender?: IndividualTypes.Gender,
    hatchedAt?: Date,
    cageId?: string,
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
