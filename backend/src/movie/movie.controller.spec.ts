import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {
  PaginationDto,
  PaginatedResponseDto,
} from 'src/common/dto/pagination.dto';
import { Movie } from './entities/movie.entity';

describe('MovieController', () => {
  let controller: MovieController;
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findByName: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
    service = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with correct dto', async () => {
      const dto: CreateMovieDto = {
        name: 'Test',
        description: 'Desc',
        isActive: true,
        imgUrl: 'https://example.com/image.jpg',
      };
      const result: Movie = {
        id: 'uuid',
        name: 'Test',
        description: 'Desc',
        isActive: true,
        imgUrl: 'https://example.com/image.jpg',
        ratings: [],
        actors: [],
      };

      const mockCreate = jest.fn().mockResolvedValue(result);
      Object.defineProperty(service, 'create', {
        value: mockCreate,
        writable: true,
      });

      expect(await controller.create(dto)).toEqual(result);
      expect(mockCreate).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll with pagination dto', async () => {
      const paginationDto: PaginationDto = { page: 1, limit: 10, offset: 0 };
      const mockMovies: Movie[] = [
        {
          id: 'uuid',
          name: 'Test',
          description: 'Desc',
          isActive: true,
          imgUrl: 'https://example.com/image.jpg',
          ratings: [],
          actors: [],
        },
      ];

      const result: PaginatedResponseDto<Movie> = {
        data: mockMovies,
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        },
      };

      const mockFindAll = jest.fn().mockResolvedValue(result);
      Object.defineProperty(service, 'findAll', {
        value: mockFindAll,
        writable: true,
      });

      expect(await controller.findAll(paginationDto)).toEqual(result);
      expect(mockFindAll).toHaveBeenCalledWith(paginationDto);
    });
  });

  describe('update', () => {
    it('should call service.update with id and dto', async () => {
      const id = 'uuid';
      const dto: UpdateMovieDto = { name: 'Updated' };
      const result: Movie = {
        id,
        name: 'Updated',
        description: 'Original description',
        isActive: true,
        imgUrl: 'https://example.com/image.jpg',
        ratings: [],
        actors: [],
      };

      const mockUpdate = jest.fn().mockResolvedValue(result);
      Object.defineProperty(service, 'update', {
        value: mockUpdate,
        writable: true,
      });

      expect(await controller.update(id, dto)).toEqual(result);
      expect(mockUpdate).toHaveBeenCalledWith(id, dto);
    });
  });

});
