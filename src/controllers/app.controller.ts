import { BadRequestException, Controller, Get } from '@nestjs/common';
import { AppService } from '../providers/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('exception')
  throwException() {
    throw new BadRequestException('test');
  }
}
