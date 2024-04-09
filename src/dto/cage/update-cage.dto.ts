import { IsString, Length } from 'class-validator';

export class UpdateCageDto {
  @IsString()
  @Length(2, 15)
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}
