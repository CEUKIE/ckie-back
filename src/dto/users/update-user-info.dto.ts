import { IsString, Length } from 'class-validator';

export class UpdateUserInfoDto {
  @IsString()
  avatarUrl: string;

  @IsString()
  @Length(2, 15)
  readonly nickname: string;

  @IsString()
  @Length(0, 30)
  readonly introduction: string;

  constructor(avatarUrl: string, nickname: string, introduction: string) {
    this.avatarUrl = avatarUrl;
    this.nickname = nickname;
    this.introduction = introduction;
  }
}
