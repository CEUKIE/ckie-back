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

  @SubscribeMessage('connect-cage')
  handleConnectCage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { cageId: string },
  ) {
    if (client.rooms.has(data.cageId)) return;

    client.join(data.cageId);
    client.to(data.cageId).emit('connect-cage', data);
    this.logger.info(`${client.id} is connected to ${data.cageId}`);
  }

  @SubscribeMessage('request-temp-humidity')
  handleRequestTemperature(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { cageId: string },
  ) {
    this.logger.info(`request temperature to ${data.cageId}`);
    client.to(data.cageId).emit('request-temp-humidity');
  }

  @SubscribeMessage('response-temp-humidity')
  handleResponseTemperature(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { cageId: string; temperature: number; humidity: number },
  ) {
    this.logger.info(
      `\nclientId: ${client.id},\nroomId: ${
        data.cageId
      },\nbody: ${JSON.stringify(data, null, 2)}`,
    );

    client.to(data.cageId).emit('response-temp-humidity', {
      temperature: data.temperature,
      humidity: data.humidity,
    });
  }
}
