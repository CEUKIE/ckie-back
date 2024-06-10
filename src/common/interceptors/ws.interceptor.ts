import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Observable, tap } from 'rxjs';
import { Logger } from 'winston';

@Injectable()
export class WsInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    private readonly config: ConfigService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToWs();
    const client = ctx.getClient();
    const data = ctx.getData();

    const message = `\nWS\nip: ${client.handshake?.address}\ndata: ${data?.event}`;
    this.logger.warn(message);

    return next.handle();
    // const req = ctx.getRequest<Request>();
    // const { ip, path } = req;
    // const now = Date.now();

    // return next
    //   .handle()
    //   .pipe(
    //     tap(
    //       () =>
    //         this.config.get<string>('NODE_ENV') !== 'test' &&
    //         this.logger.info(
    //           `\nip: ${ip}\npath: ${path}\n${Date.now() - now}ms`,
    //         ),
    //     ),
    //   );
  }
}
