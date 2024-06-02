import { Inject } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Server, Socket } from 'socket.io';
import { Logger } from 'winston';

@WebSocketGateway({
  namespace: 'cage',
  cors: '*',
})
export class CageConnectionGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @WebSocketServer()
  server: Server | undefined;

  afterInit() {
    this.logger.info('Socket Server Init Complete');
  }

  handleConnection(client: Socket) {
    this.logger.info(
      `${client.id}(${client.handshake.query['username']}) is connected`,
    );
    client.emit('connection');
  }

  handleDisconnect(client: Socket) {
    this.logger.info(`${client.id} is disconnected...`);
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { message: string },
  ) {
    this.logger.info('message!~');
    this.server?.emit('message', data);
  }
}
