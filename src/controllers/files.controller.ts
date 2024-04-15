import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from '../providers/files.service';
import { ResponseForm } from '../common/format/response-form';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  /**
   * @tag files
   * @summary 이미지 업로드
   * @param image 이미지
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  upload(
    @UploadedFile()
    image: Express.MulterS3.File,
  ) {
    const imageUrl = this.filesService.upload(image);
    return ResponseForm.ok(imageUrl);
  }
}
