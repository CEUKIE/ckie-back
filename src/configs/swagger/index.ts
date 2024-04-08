import { INestApplication } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

export const setupSwagger = (app: INestApplication) => {
  const document: OpenAPIObject = JSON.parse(
    fs.readFileSync(`${__dirname}/swagger.json`, { encoding: 'utf8' }),
  );
  SwaggerModule.setup('api', app, document);
};
