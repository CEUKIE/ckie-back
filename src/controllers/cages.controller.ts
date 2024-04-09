import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateCageDto } from '../dto/cage/create-cage.dto';
import { CagesService } from '../providers/cages.service';
import { ResponseForm } from '../common/format/response-form';
import { AuthGuard } from '../common/guards/auth.guard';
import { UserInfo } from '../common/decorators/user.decorator';
import { TokenData } from '../auth/types';

@Controller('cages')
export class CagesController {
  constructor(private readonly cagesService: CagesService) {}

  // TODO token 테스트, swagger에 인증 정보 등록
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
}
