import { IsString, Length } from 'class-validator';

export class CreateCageDto {
  @IsString()
  readonly id: string;

  @IsString()
  @Length(2, 15)
  readonly name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
