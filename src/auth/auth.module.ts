import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { KakaoClient } from './kakao.client';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersRepository } from '../repositories/users.repository';
import { UsersPrismaRepository } from '../repositories/users.prisma.repository';
import { UsersService } from '../providers/users.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          global: true,
          secret: config.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: config.get<string>('JWT_TOKEN_EXPIRATION_TIME'),
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    KakaoClient,
    UsersService,
    { provide: UsersRepository, useClass: UsersPrismaRepository },
  ],
})
export class AuthModule {}
