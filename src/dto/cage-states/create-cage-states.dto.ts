import { IsNumber, IsUUID, Min } from 'class-validator';

export class CreateCageStatesDto {
  // 소수점 1자리까지만
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  @Min(0)
  readonly temperature: number;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  @Min(0)
  readonly humidity: number;

  @IsUUID()
  readonly cageId: string;

  constructor(temperature: number, humidity: number, cageId: string) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.cageId = cageId;
  }
}
