export class ChangeHumidityDto {
  readonly cageId: string;
  readonly minHumidity?: number;
  readonly maxHumidity?: number;

  constructor(cageId: string, minHumidity?: number, maxHumidity?: number) {
    this.cageId = cageId;
    this.minHumidity = minHumidity;
    this.maxHumidity = maxHumidity;
  }
}
