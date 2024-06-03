import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  /**
   * @tag records
   * @summary 무게 기록 조회
   * @param individualId 개체 번호
   * @returns 무게 기록 데이터
   */
  @Get(':id/weights')
  async getWeights(@Param('id') individualId: string) {
    const response = await this.recordsService.findWeightsByIndividualId(
      individualId,
    );
    return ResponseForm.ok(response);
  }

  /**
   * @tag records
   * @summary 기록 삭제
   * @param id 기록 번호
   * @returns 성공: true, 실패: false
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.recordsService.delete(id);
    return ResponseForm.ok(response);
  }
}
