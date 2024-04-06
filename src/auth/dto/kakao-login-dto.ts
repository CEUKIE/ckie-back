import { IsOptional, IsString, Length } from 'class-validator';

export class KakaoLoginDto {
  @IsString()
  readonly code: string;

  @IsString()
  @Length(2, 15)
  readonly nickname: string;

  @IsString()
  @IsOptional()
  readonly introduction: string;

  @IsString()
  @IsOptional()
  readonly avatarUrl?: string;

  constructor(
    code: string,
    nickname: string,
    introduction: string,
    avatarUrl?: string,
  ) {
    this.code = code;
    this.nickname = nickname;
    this.introduction = introduction;
    this.avatarUrl = avatarUrl;
  }
}
