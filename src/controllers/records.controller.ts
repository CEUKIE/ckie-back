import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRecordsDto } from '../dto/records/create-records-dto';
import { RecordsService } from '../providers/records.service';
import { ResponseForm } from '../common/format/response-form';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  /**
   * @tag records
   * @summary 기록 생성
   * @param dto category는 enum RecordCategory 타입 확인. memo: 0 ~ 15자
   * @returns 생성된 기록 데이터
   */
  @Post()
  async create(@Body() dto: CreateRecordsDto) {
    const respose = await this.recordsService.create(dto);
    return ResponseForm.ok(respose);
  }

  /**
   * @tag records
   * @summary 기록 전체 조회
   * @param individualId 개체 번호
   * @returns 기록 데이터
   */
  @Get(':id')
  async getAll(@Param('id') individualId: string) {
    const response = await this.recordsService.findAllByIndividualId(
      individualId,
    );
    return ResponseForm.ok(response);
  }
}
