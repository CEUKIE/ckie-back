import { HttpStatus } from '@nestjs/common';

export class ResponseForm<T> {
  readonly statusCode: HttpStatus;
  readonly result?: T;

  private constructor(statusCode: HttpStatus, result?: T) {
    this.statusCode = statusCode;
    this.result = result;
  }

  static ok<T>(data?: T) {
    return new ResponseForm(HttpStatus.OK, data);
  }

  static created<T>(data?: T) {
    return new ResponseForm(HttpStatus.CREATED, data);
  }
}
