import { Logger, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';

const filters = [{ provide: APP_FILTER, useClass: HttpExceptionFilter }];

@Module({
  providers: [...filters],
})
export class FilterModule {}
