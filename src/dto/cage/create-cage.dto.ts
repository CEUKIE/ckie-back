import { IsString, Length } from 'class-validator';

export class CreateCageDto {
  @IsString()
  readonly id: string;

  @IsString()
  @Length(2, 15)
  readonly name: string;

  @IsString()
  readonly avatarUrl: string;

  constructor(id: string, name: string, avatarUrl: string) {
    this.id = id;
    this.name = name;
    this.avatarUrl = avatarUrl;
  }
}
