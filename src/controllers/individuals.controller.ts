import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateIndividualDto } from '../dto/individual/create-individual.dto';
import { IndividualsService } from '../providers/individuals.service';
import { ResponseForm } from '../common/format/response-form';
import { CreateIndividualResponse } from '../dto/individual/create-response';
import { AuthGuard } from '../common/guards/auth.guard';
import { UserInfo } from '../common/decorators/user.decorator';
import { TokenData } from '../auth/types';

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
  async create(
    @Body() dto: CreateIndividualDto,
    @UserInfo() user: TokenData,
  ): Promise<ResponseForm<CreateIndividualResponse>> {
    const response = await this.individualsService.create(user.id, dto);
    return ResponseForm.created(response);
  }

  // @Get()
  // getAll() {}

  // @Get(':id')
  // getOneDetail() {}

  // @Patch(':id')
  // modify() {}

  // @Delete()
  // remove() {}
}
