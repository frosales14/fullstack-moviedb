import { Test, TestingModule } from '@nestjs/testing';
import { MovieRatingController } from './movie-rating.controller';
import { MovieRatingService } from './movie-rating.service';

describe('MovieRatingController', () => {
  let controller: MovieRatingController;
  let service: MovieRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieRatingController],
      providers: [
        {
          provide: MovieRatingService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MovieRatingController>(MovieRatingController);
    service = module.get<MovieRatingService>(MovieRatingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have service defined', () => {
    expect(service).toBeDefined();
  });
});
