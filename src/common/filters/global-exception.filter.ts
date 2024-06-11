import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

interface LoggingFormat {
  level: 'warn' | 'error';
  ip: string | undefined;
  timestamp: Date;
  path: string;
  context: string;
  message: string;
  stack?: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req: Request = ctx.getRequest();
    const res: Response = ctx.getResponse();

    const log: LoggingFormat = {
      level: 'warn',
      ip: req.ip,
      timestamp: new Date(),
      path: req.url,
      context: exception.name,
      message: exception.message,
    };

    const message = `\nlevel: ${log.level}\nip: ${log.ip}\npath: ${
      log.path
    }\nbody: ${JSON.stringify(req.body, null, 2)}\ntimestamp: ${
      log.timestamp
    }\ncontext: ${log.context}\nmessage: ${log.message}\n`;

    if (exception instanceof HttpException) {
      this.logger.warn(message);
    } else {
      log.level = 'error';
      log.stack = exception.stack;
      this.logger.error(message);

      exception = new InternalServerErrorException();
    }

    const response = (exception as HttpException).getResponse();

    res.status((exception as HttpException).getStatus()).json(response);
  }
}
