import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

// TODO min, max 대소 검증
export class CreateSpeciesDto {
  @IsString()
  @Length(2, 20)
  readonly name: string;

  @IsNumber({
    maxDecimalPlaces: 1,
  })
  @Min(0)
  @Max(40)
  readonly minTemperature: number;

  @IsNumber({
    maxDecimalPlaces: 1,
  })
  @Min(0)
  @Max(40)
  readonly maxTemperature: number;

  @IsNumber({
    maxDecimalPlaces: 1,
  })
  @Min(0)
  @Max(100)
  readonly minHumidity: number;

  @IsNumber({
    maxDecimalPlaces: 1,
  })
  @Min(0)
  @Max(100)
  readonly maxHumidity: number;

  constructor(
    name: string,
    minTemperature: number,
    maxTemperature: number,
    minHumidity: number,
    maxHumidity: number,
  ) {
    this.name = name;
    this.minTemperature = minTemperature;
    this.maxTemperature = maxTemperature;
    this.minHumidity = minHumidity;
    this.maxHumidity = maxHumidity;
  }
}
