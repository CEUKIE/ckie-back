import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { TokenData } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async generateAccessToken(data: TokenData) {
    return {
      accessToken: await this.jwtService.signAsync(data),
    };
  }

  async verifyAccessToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.config.get<string>('JWT_SECRET'),
    });
  }
}
