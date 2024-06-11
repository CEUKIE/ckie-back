import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { HttpExceptionFilter } from './http-exception.filter';
import { GlobalExceptionFilter } from './global-exception.filter';

const filters = [{ provide: APP_FILTER, useClass: GlobalExceptionFilter }];

@Module({
  providers: [...filters],
})
export class FilterModule {}
