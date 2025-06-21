import {
  FindOneMovieUseCase,
  FindMovieByNameUseCase,
} from './find-one-movie-use-case';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

// Mock repository type
type MockRepository = {
  [K in keyof Repository<Movie>]: jest.Mock;
};

describe('FindOneMovieUseCase', () => {
  it('should return a movie if found', async () => {
    const mockMovie: Movie = {
      id: 'uuid',
      name: 'Test Movie',
      description: 'Test Description',
      isActive: true,
      imgUrl: 'https://example.com/image.jpg',
      ratings: [],
      actors: [],
    };

    const repo: MockRepository = {
      findOne: jest.fn().mockResolvedValue(mockMovie),
    } as unknown as MockRepository;

    const result = await FindOneMovieUseCase('uuid', repo as any);
    expect(result).toEqual(mockMovie);
  });

  it('should throw NotFoundException if not found', async () => {
    const repo: MockRepository = {
      findOne: jest.fn().mockResolvedValue(undefined),
    } as unknown as MockRepository;

    await expect(FindOneMovieUseCase('bad-id', repo as any)).rejects.toThrow(
      NotFoundException,
    );
  });
});

describe('FindMovieByNameUseCase', () => {
  it('should return paginated movies from queryBuilder', async () => {
    const mockMovies: Movie[] = [
      {
        id: 'uuid',
        name: 'Test Movie',
        description: 'Test Description',
        isActive: true,
        imgUrl: 'https://example.com/image.jpg',
        ratings: [],
        actors: [],
      },
    ];

    const mockPaginationDto: PaginationDto = { page: 1, limit: 10, offset: 0 };

    // Create a proper query builder mock chain
    const mockQueryBuilder = {
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orWhere: jest.fn().mockReturnThis(),
      getCount: jest.fn().mockResolvedValue(1),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(mockMovies),
    };

    const repo: MockRepository = {
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    } as unknown as MockRepository;

    const result = await FindMovieByNameUseCase(
      'Test',
      mockPaginationDto,
      repo as any,
    );

    expect(result.data).toEqual(mockMovies);
    expect(result.pagination).toEqual({
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
    });
  });

  it('should handle errors gracefully', async () => {
    const mockPaginationDto: PaginationDto = { page: 1, limit: 10, offset: 0 };

    const mockQueryBuilder = {
      leftJoinAndSelect: jest.fn().mockImplementation(() => {
        throw new Error('Database error');
      }),
    };

    const repo: MockRepository = {
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    } as unknown as MockRepository;

    await expect(
      FindMovieByNameUseCase('Test', mockPaginationDto, repo as any),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
