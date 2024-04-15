import { BadRequestException, Injectable } from '@nestjs/common';
import { ImageResponse } from '../types';

@Injectable()
export class FilesService {
  upload(image: Express.MulterS3.File): ImageResponse {
    if (!image) throw new BadRequestException('이미지 없음');
    return { filePath: image.location };
  }
}
