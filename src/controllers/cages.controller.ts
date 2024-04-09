import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { CreateCageDto } from '../dto/cage/create-cage.dto';
import { CagesService } from '../providers/cages.service';
import { ResponseForm } from '../common/format/response-form';
import { AuthGuard } from '../common/guards/auth.guard';
import { UserInfo } from '../common/decorators/user.decorator';
import { TokenData } from '../auth/types';

@Controller('cages')
export class CagesController {
  constructor(private readonly cagesService: CagesService) {}

  /**
   * @tag cages
   * @summary 케이지 등록
   * @security bearer
   * @param dto 케이지 등록 데이터
   * @returns 등록된 케이지 데이터
   */
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() dto: CreateCageDto, @UserInfo() user: TokenData) {
    const response = await this.cagesService.create({
      ...dto,
      userId: user.id,
    });
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
   * @param user access token에서 추출한 user 데이터
   * @returns 케이지 목록
   */
  @UseGuards(AuthGuard)
  @Get()
  async getAllByUserId(@UserInfo() user: TokenData) {
    const response = await this.cagesService.findAllByUserId(user.id);
    return ResponseForm.ok(response);
  }
}
