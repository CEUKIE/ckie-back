import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { KakaoService } from './kakao.service';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, KakaoService],
})
export class AuthModule {}
