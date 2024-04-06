import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

const pipes = [{ provide: APP_PIPE, useClass: ValidationPipe }];

@Module({
  providers: [...pipes],
})
export class PipesModule {}
