import { MoviesService } from './movies.service';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', function () {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', function () {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const result = service.getOne(1);
      expect(result).toBeDefined();
      expect(result.id).toEqual(1);
    });

    it('should throw 404 error', function () {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found. ');
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', function () {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('should return a 404', function () {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', function () {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', function () {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      service.update(1, { title: 'Updated Test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });

    it('should throw a NotFoundException', function () {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
