import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const body = req.body;
    const params = req.params;
    const query = req.query;

    const paramMessage = params
      ? ` \nparams: ${JSON.stringify(params, null, 2)}`
      : '';
    const queryMessage = query
      ? ` \nquery: ${JSON.stringify(query, null, 2)}`
      : '';
    const bodyMessage = body ? ` \nbody: ${JSON.stringify(body, null, 2)}` : '';
    const ipMessage = `\nip: ${req.ip}`;

    let errorMessage: any = exception.getResponse();
    if (typeof errorMessage === 'object') {
      errorMessage = errorMessage.message;
    }

    process.env.NODE_ENV !== 'test' &&
      this.logger.warn(
        `Error to ${req.method} ${
          req.url
        }${ipMessage} ${paramMessage} ${queryMessage} ${bodyMessage} \nstatusCode : ${status} \nmessage : ${JSON.stringify(
          errorMessage,
          null,
          2,
        )}`,
      );

    res.status(status).json({
      statusCode: status,
      message: errorMessage,
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}
