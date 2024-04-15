import { Module } from '@nestjs/common';
import { FilesController } from '../controllers/files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { multerOptionsFactory } from '../configs/multer';
import { FilesService } from '../providers/files.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: multerOptionsFactory,
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
