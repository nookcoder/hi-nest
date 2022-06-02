import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach(async () => {
  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [AppModule],
  //   }).compile();
  //
  //   app = moduleFixture.createNestApplication();
  //   await app.init();
  // });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('/movies', () => {
    it('GET', function () {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST 201', function () {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'POST TEST',
          year: 2022,
          genres: ['action'],
        })
        .expect(201);
    });

    it('POST 400', function () {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'POST TEST',
          year: 2022,
          genres: ['action'],
          other: 'no create',
        })
        .expect(400);
    });

    it('DELETE', function () {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', function () {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });

    it('GET 404', function () {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });

    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({
          title: 'Updated Name',
        })
        .expect(200);
    });

    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
