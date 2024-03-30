import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilterModule } from './common/filters/filter.module';
import { ConfigModule } from '@nestjs/config';
import { InterceptorsModule } from './common/interceptors/interceptors.module';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`./configs/env/.env.${process.env.NODE_ENV}`],
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
                  nestWinstonModuleUtilities.format.nestLike('Bubble-Chat', {
                    colors: true,
                    prettyPrint: true,
                  }),
                ),
        }),
      ],
    }),
    FilterModule,
    InterceptorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
