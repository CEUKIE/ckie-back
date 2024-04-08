import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateSpeciesDto } from '../dto/species/create-species.dto';
import { SpeciesService } from '../providers/species.service';
import { ResponseForm } from '../common/format/response-form';
import { UpdateSpeciesDto } from '../dto/species/update-species.dto';

@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  /**
   * @tag species
   * @summary 새로운 종 추가
   * @param dto 생성에 필요한 데이터
   * @return 생성된 종 데이터
   */
  @Post()
  async create(@Body() dto: CreateSpeciesDto) {
    const response = await this.speciesService.create(dto);
    return ResponseForm.created(response);
  }

  /**
   * @tag species
   * @summary 종 목록 조회
   * @returns 종 목록
   */
  @Get()
  async getAll() {
    const response = await this.speciesService.findAll();
    return ResponseForm.ok(response);
  }

  /**
   * @tag species
   * @param id 종 id
   * @param dto 수정할 데이터
   * @returns 수정된 종 데이터
   */
  @Patch(':id')
  async modify(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateSpeciesDto,
  ) {
    const response = await this.speciesService.update(id, dto);
    return ResponseForm.ok(response);
  }
}
