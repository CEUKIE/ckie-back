import { INestiaConfig } from '@nestia/sdk';
// import { FastifyAdaptor } from "@nestjs/platform-fastify";

const NESTIA_CONFIG: INestiaConfig = {
  input: ['src/controllers', 'src/auth'],
  swagger: {
    output: 'dist/swagger.json',
    security: {
      bearer: {
        type: 'apiKey',
        name: 'Authorization',
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
