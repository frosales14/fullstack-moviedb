import { createMovieUseCase } from './create-movie-use-case';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { Movie } from '../entities/movie.entity';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

// A more flexible mock repository type
type MockRepository = {
  [K in keyof Repository<Movie>]: jest.Mock;
};

const mockRepo = (): MockRepository =>
  ({
    create: jest.fn(),
    save: jest.fn(),
  }) as unknown as MockRepository;

describe('createMovieUseCase', () => {
  let repo: MockRepository;

  beforeEach(() => {
    repo = mockRepo();
  });

  it('should create and save a movie', async () => {
    const dto: CreateMovieDto = {
      name: 'Test',
      description: 'Desc',
      isActive: true,
      imgUrl: '',
    };
    const movie: Movie = { id: 'uuid', ...dto, ratings: [], actors: [] };
    repo.create.mockReturnValue(movie);
    repo.save.mockResolvedValue(movie);
    const result = await createMovieUseCase(dto, repo as any);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(movie);
    expect(result).toBe(movie);
  });

  it('should handle errors gracefully', async () => {
    repo.create.mockImplementation(() => {
      throw new Error('fail');
    });
    const dto: CreateMovieDto = {
      name: 'Test',
      description: 'Desc',
      isActive: true,
      imgUrl: '',
    };
    await expect(createMovieUseCase(dto, repo as any)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
