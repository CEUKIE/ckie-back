import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  readonly accessToken: string;

  @IsString()
  readonly avatarUrl: string;

  @IsString()
  @Length(2, 15)
  readonly nickname: string;

  @IsString()
  @Length(0, 30)
  readonly introduction: string;

  constructor(
    accessToken: string,
    avatarUrl: string,
    nickname: string,
    introduction: string,
  ) {
    this.accessToken = accessToken;
    this.avatarUrl = avatarUrl;
    this.nickname = nickname;
    this.introduction = introduction;
  }
}
