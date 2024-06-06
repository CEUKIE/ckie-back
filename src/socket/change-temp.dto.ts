export class ChangeTempDto {
  readonly cageId: string;
  readonly minTemp?: number;
  readonly maxTemp?: number;

  constructor(cageId: string, minTemp?: number, maxTemp?: number) {
    this.cageId = cageId;
    this.minTemp = minTemp;
    this.maxTemp = maxTemp;
  }
}
