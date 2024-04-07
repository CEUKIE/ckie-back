import { HttpStatus } from '@nestjs/common';

export class ResponseForm<T> {
  readonly statusCode: HttpStatus;
  readonly data?: T;

  private constructor(statusCode: HttpStatus, data?: T) {
    this.statusCode = statusCode;
    this.data = data;
  }

  static ok<T>(data?: T) {
    return new ResponseForm(HttpStatus.OK, data);
  }
}
