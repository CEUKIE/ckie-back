import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CreateIndividualDto } from '../dto/individual/create-individual.dto';
import { IndividualsService } from '../providers/individuals.service';
import { ResponseForm } from '../common/format/response-form';
import { AuthGuard } from '../common/guards/auth.guard';
import { UserInfo } from '../common/decorators/user.decorator';
import { TokenData } from '../auth/types';
import { UpdateIndividualDto } from '../dto/individual/update-individual.dto';

@UseGuards(AuthGuard)
@Controller('individuals')
export class IndividualsController {
  constructor(private readonly individualsService: IndividualsService) {}

  /**
   * @tag individuals
   * @summary 개체 생성
   * @security bearer
   * @param dto 개체 생성 데이터
   * @returns 생성된 개체 상세 정보
   */
  @Post()
  async create(@Body() dto: CreateIndividualDto, @UserInfo() user: TokenData) {
    const response = await this.individualsService.create(user.id, dto);
    return ResponseForm.created(response);
  }

  /**
   * @tag individuals
   * @summary 자신 개체 목록 조회
   * @security bearer
   * @param user access token에서 추출한 회원 정보
   * @returns 개체 목록
   */
  @Get()
  async getAll(@UserInfo() user: TokenData) {
    const response = await this.individualsService.findAllByUserId(user.id);
    return ResponseForm.ok(response);
  }

  /**
   * @tag individuals
   * @security bearer
   * @summary 개체 상세 조회
   * @param id 개체 id
   * @returns 개체 상세 정보
   */
  @Get(':id')
  async getOneDetail(@Param('id') id: string) {
    const response = await this.individualsService.findOneById(id);
    return ResponseForm.ok(response);
  }

  /**
   * @tag individuals
   * @summary 개체 정보 수정
   * @security bearer
   * @param id 개체 id
   * @param dto 수정할 데이터
   * @returns 수정된 개체 정보
   */
  @Patch(':id')
  async modify(@Param('id') id: string, dto: UpdateIndividualDto) {
    const response = await this.individualsService.update(id, dto);
    return ResponseForm.ok(response);
  }

  // @Delete()
  // remove() {}
}
