import { BadRequestException, Injectable } from '@nestjs/common';
import { ImageResponse } from '../types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilesService {
  constructor(private readonly config: ConfigService) {}

  upload(image: Express.MulterS3.File): ImageResponse {
    if (!image) throw new BadRequestException('이미지 없음');
    const filePath = `${this.config.get<string>('IMAGE_PREFIX')}${
      image.location.split('amazonaws.com')[1]
    }`;
    return { filePath };
  }
}
