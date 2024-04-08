import { Body, Controller, Post } from '@nestjs/common';
import { CreateSpeciesDto } from '../dto/species/create-species.dto';
import { SpeciesService } from '../providers/species.service';
import { ResponseForm } from '../common/format/response-form';

@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  /**
   * @tag species
   * @summary 새로운 종 추가
   * @param dto 생성에 필요한 데이터
   */
  @Post()
  async create(@Body() dto: CreateSpeciesDto) {
    const response = await this.speciesService.create(dto);
    return ResponseForm.created(response);
  }
}
