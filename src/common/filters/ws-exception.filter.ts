import { ArgumentsHost, Catch, Inject } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Catch(WsException)
export class WsExceptionFilter extends BaseWsExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    super();
  }

  catch(exception: WsException, host: ArgumentsHost): void {
    const ctx = host.switchToWs();
    const client = ctx.getClient();
    const data = ctx.getData();

    const message = `\nip: ${client.handshake?.address}\ndata: ${data?.event}`;
    this.logger.warn(message);

    client.send(
      JSON.stringify({
        event: 'error',
        ok: false,
        error: exception.getError(),
        data,
      }),
    );
  }
}
