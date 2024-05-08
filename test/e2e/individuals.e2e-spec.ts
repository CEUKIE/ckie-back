import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { after } from 'node:test';

describe('individual test (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  after(async () => {
    await app.close();
  });

  describe('/individuals (POST)', () => {
    it('', () => {
      return request(app.getHttpServer()).get('/individuals').expect(401);
    });
  });

  describe('/individuals (GET)', () => {
    it('로그인 하지 않고 조회하는 경우', () => {
      return request(app.getHttpServer()).get('/individuals').expect(401);
    });
  });

  describe('/individuals/:id (GET)', () => {
    it('', () => {
      return request(app.getHttpServer()).get('/individuals').expect(401);
    });
  });

  describe('/individuals/:id (PATCH)', () => {
    it('', () => {
      return request(app.getHttpServer()).get('/individuals').expect(401);
    });
  });

  describe('/individuals/:id (DELETE)', () => {
    it('', () => {
      return request(app.getHttpServer()).get('/individuals').expect(401);
    });
  });
});
