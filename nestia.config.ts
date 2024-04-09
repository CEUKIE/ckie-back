import { INestiaConfig } from '@nestia/sdk';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
// import { FastifyAdaptor } from "@nestjs/platform-fastify";

const NESTIA_CONFIG: INestiaConfig = {
  input: async () => {
    const app = await NestFactory.create(AppModule);
    return app;
  },
  swagger: {
    output: './src/configs/swagger',
    security: {
      bearer: {
        type: 'apiKey',
        name: 'authorization',
        in: 'header',
      },
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Local Server',
      },
    ],
    beautify: true,
  },
};
export default NESTIA_CONFIG;
