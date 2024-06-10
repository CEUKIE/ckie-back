import { Inject, UseFilters, UseInterceptors } from '@nestjs/common';
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

import { ChangeTempDto } from './change-temp.dto';
import { ChangeHumidityDto } from './change-humidity.dto';
import { WsExceptionFilter } from '../common/filters/ws-exception.filter';
import { LoggingInterceptor } from '../common';
import { WsInterceptor } from '../common/interceptors/ws.interceptor';

@UseInterceptors(WsInterceptor)
@UseFilters(WsExceptionFilter)
@WebSocketGateway({
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

  @SubscribeMessage('change-temp')
  handleChangeTemp(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: ChangeTempDto,
  ) {
    const { cageId, ...rest } = data;

    this.logger.info(
      `\nclientId: ${client.id},\nroomId: ${cageId},\nbody: ${JSON.stringify(
        data,
        null,
        2,
      )}`,
    );
    client.to(data.cageId).emit('change-temp', rest);
  }

  @SubscribeMessage('change-humidity')
  handleChangeHumidity(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: ChangeHumidityDto,
  ) {
    const { cageId, ...rest } = data;

    this.logger.info(
      `\nclientId: ${client.id},\nroomId: ${cageId},\nbody: ${JSON.stringify(
        data,
        null,
        2,
      )}`,
    );
    client.to(data.cageId).emit('change-humidity', rest);
  }

  @SubscribeMessage('request-target-temp')
  handleRequestTargetTemp(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { cageId: string },
  ) {
    this.logger.info(
      `\nevent: request-target-temp\nclientId: ${client.id},\nroomId: ${
        data.cageId
      },\nbody: ${JSON.stringify(data, null, 2)}`,
    );

    client.to(data.cageId).emit('request-target-temp');
  }

  @SubscribeMessage('response-target-temp')
  handleResponseTargetTemp(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { cageId: string; minTemp: number; maxTemp: number },
  ) {
    const { cageId, ...rest } = data;
    this.logger.info(
      `\nevent: request-target-temp\nclientId: ${
        client.id
      },\nroomId: ${cageId},\nbody: ${JSON.stringify(data, null, 2)}`,
    );

    client.to(data.cageId).emit('response-target-temp', rest);
  }
}
