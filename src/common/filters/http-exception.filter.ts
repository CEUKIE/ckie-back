import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

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

    this.logger.error(
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
