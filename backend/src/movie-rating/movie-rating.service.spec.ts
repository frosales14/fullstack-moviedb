import { Test, TestingModule } from '@nestjs/testing';
import { MovieRatingService } from './movie-rating.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MovieRating } from './entities/movie-rating.entity';

describe('MovieRatingService', () => {
  let service: MovieRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieRatingService,
        {
          provide: getRepositoryToken(MovieRating),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
            count: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MovieRatingService>(MovieRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
