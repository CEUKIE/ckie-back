import { ConfigService } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { S3Client } from '@aws-sdk/client-s3';
import * as multerS3 from 'multer-s3';
import * as path from 'path';

export const multerOptionsFactory = (config: ConfigService): MulterOptions => {
  const s3 = new S3Client({
    region: config.get<string>('S3_REGION')!,
    credentials: {
      accessKeyId: config.get<string>('S3_ACCESS_KEY')!,
      secretAccessKey: config.get<string>('S3_SECRET_KEY')!,
    },
  });

  return {
    storage: multerS3({
      s3,
      bucket: config.get<string>('S3_BUCKET_NAME')!,
      acl: 'public-read',
      key(req, file, done) {
        try {
          const folder = 'images';
          const ext = path.extname(file.originalname);
          const basename = path.basename(file.originalname, ext);
          done(null, `${folder}/${basename}_${Date.now()}${ext}`);
        } catch (e) {}
      },
    }),
    limits: { fileSize: 1000 * 1000 * 2 },
  };
};
