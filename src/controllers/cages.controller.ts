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

import { CreateCageDto } from '../dto/cage/create-cage.dto';
import { CagesService } from '../providers/cages.service';
import { ResponseForm } from '../common/format/response-form';
import { AuthGuard } from '../common/guards/auth.guard';
import { UserInfo } from '../common/decorators/user.decorator';
import { TokenData } from '../auth/types';
import { UpdateCageDto } from '../dto/cage/update-cage.dto';

@Controller('cages')
@UseGuards(AuthGuard)
export class CagesController {
  constructor(private readonly cagesService: CagesService) {}

  /**
   * @tag cages
   * @summary 케이지 등록
   * @security bearer
   * @param dto 케이지 등록 데이터
   * @param user access token에서 추출한 회원 정보
   * @returns 등록된 케이지 데이터
   */
  @Post()
  async create(@Body() dto: CreateCageDto, @UserInfo() user: TokenData) {
    const response = await this.cagesService.create(user.id, dto);
    return ResponseForm.created(response);
  }

  // TODO ADMIN 권한 기능.
  /**
   * @tag cages
   * @summary 모든 케이지 목록 조회
   * @security bearer
   * @returns 케이지 목록
   */
  @Get('all')
  async getAll() {
    const response = await this.cagesService.findAll();
    return ResponseForm.ok(response);
  }

  /**
   * @tag cages
   * @summary 자기 케이지 목록 조회
   * @security bearer
   * @param user access token에서 추출한 user 정보
   * @returns 케이지 목록
   */
  @Get()
  async getAllByUserId(@UserInfo() user: TokenData) {
    const response = await this.cagesService.findAllByUserId(user.id);
    return ResponseForm.ok(response);
  }

  /**
   * @tag cages
   * @summary 케이지 상세 정보 조회
   * @security bearer
   * @param id 케이지 id
   * @returns 케이지 상세 정보
   */
  @Get(':id')
  async getOneById(@Param('id') id: string) {
    const response = await this.cagesService.findOneById(id);
    return ResponseForm.ok(response);
  }

  /**
   * @tag cages
   * @summary 케이지 정보 수정
   * @security bearer
   * @param id 케이지 id
   * @param dto 케이지 수정 데이터
   * @param user access token에서 추출한 회원 정보
   * @returns 수정된 케이지 데이터
   */
  @Patch(':id')
  async modify(
    @Param('id') id: string,
    @Body() dto: UpdateCageDto,
    @UserInfo() user: TokenData,
  ) {
    const response = await this.cagesService.update(id, user.id, dto);
    return ResponseForm.ok(response);
  }

  /**
   * @tag cages
   * @summary 케이지 데이터 삭제
   * @security bearer
   * @param id 케이지 id
   * @param user access token에서 추출한 회원 정보
   * @returns 삭제 성공 시 true, 실패 시 false
   */
  @Delete(':id')
  async remove(@Param('id') id: string, @UserInfo() user: TokenData) {
    const response = await this.cagesService.delete(id, user.id);
    return ResponseForm.ok(response);
  }
}
