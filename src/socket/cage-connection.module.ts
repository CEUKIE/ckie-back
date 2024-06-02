import { Module } from '@nestjs/common';
import { CageConnectionGateway } from './cage-connection.gateway';

@Module({
  providers: [CageConnectionGateway],
})
export class CageConnectionModule {}
