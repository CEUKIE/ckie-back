import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
