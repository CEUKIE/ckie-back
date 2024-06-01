import { Body, Controller, Get, Post } from '@nestjs/common';
import { CageStatesService } from '../providers/cage-states.service';
import { CreateCageStatesDto } from '../dto/cage-states/create-cage-states.dto';
import { ResponseForm } from '../common/format/response-form';

@Controller('cage-states')
export class CageStatesController {
  constructor(private readonly cageStatesService: CageStatesService) {}

  /**
   * @tag caga-states
   * @summary 사육장 상태 생성
   * @param dto temperature, humidity: 소수점 1자리까지 허용,   영상 온도만 가능.
   *  cageId: UUID
   * @returns 생성된 사육장 상태
   */
  @Post()
  async create(@Body() dto: CreateCageStatesDto) {
    const response = await this.cageStatesService.create(dto);
    return ResponseForm.ok(response);
  }
}
