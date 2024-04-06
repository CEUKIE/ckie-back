import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './providers/app.service';
import { FilterModule } from './common/filters/filter.module';
import { ConfigModule } from '@nestjs/config';
import { InterceptorsModule } from './common/interceptors/interceptors.module';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';
import { AuthModule } from './auth/auth.module';
import { validationSchema } from './configs/validationSchema';
import { PipesModule } from './common/pipes/pipes.module';
import { UsersModule } from './modules/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${__dirname}/configs/env/.env.${process.env.NODE_ENV}`],
      validationSchema: validationSchema,
    }),
    WinstonModule.forRoot({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
      transports: [
        new winston.transports.Console({
          format:
            process.env.NODE_ENV === 'production'
              ? winston.format.simple()
              : winston.format.combine(
                  winston.format.timestamp(),
                  winston.format.ms(),
                  nestWinstonModuleUtilities.format.nestLike('CKIE', {
                    colors: true,
                    prettyPrint: true,
                  }),
                ),
        }),
      ],
    }),
    FilterModule,
    InterceptorsModule,
    PipesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
