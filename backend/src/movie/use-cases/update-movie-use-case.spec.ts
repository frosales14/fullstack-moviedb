import { updateMovieUseCase } from './update-movie-use-case';
import { NotFoundException } from '@nestjs/common';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { Movie } from '../entities/movie.entity';
import { MovieRating } from 'src/movie-rating/entities/movie-rating.entity';
import { Actor } from 'src/actor/entities/actor.entity';
import { Repository } from 'typeorm';

// More flexible mock repository type
type MockRepository = {
  [K in keyof Repository<Movie>]: jest.Mock;
};

type MockMovieRatingRepository = {
  [K in keyof Repository<MovieRating>]: jest.Mock;
};

type MockActorRepository = {
  [K in keyof Repository<Actor>]: jest.Mock;
};

describe('updateMovieUseCase', () => {
  let movieRepo: MockRepository;
  let movieRatingRepo: MockMovieRatingRepository;
  let actorRepo: MockActorRepository;

  beforeEach(() => {
    movieRepo = {
      preload: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    } as unknown as MockRepository;

    movieRatingRepo = {
      create: jest.fn(),
      save: jest.fn(),
    } as unknown as MockMovieRatingRepository;

    actorRepo = {
      find: jest.fn(),
    } as unknown as MockActorRepository;
  });

  it('should update and save a movie', async () => {
    const mockMovie: Movie = {
      id: 'uuid',
      name: 'Original',
      description: 'Original description',
      isActive: true,
      ratings: [],
      actors: [],
    };

    const updateDto: UpdateMovieDto = { name: 'Updated' };

    movieRepo.findOne = jest.fn().mockResolvedValue(mockMovie);
    movieRepo.save = jest
      .fn()
      .mockResolvedValue({ ...mockMovie, ...updateDto });

    const result = await updateMovieUseCase(
      'uuid',
      updateDto,
      movieRepo as any,
      movieRatingRepo as any,
      actorRepo as any,
    );

    expect(movieRepo.findOne).toHaveBeenCalledWith({
      where: { id: 'uuid' },
      relations: ['ratings', 'actors'],
    });
    expect(movieRepo.save).toHaveBeenCalled();
    expect(result).toEqual({ ...mockMovie, ...updateDto });
  });

  it('should throw NotFoundException if not found', async () => {
    movieRepo.findOne = jest.fn().mockResolvedValue(undefined);

    const updateDto: UpdateMovieDto = { name: 'Updated' };

    await expect(
      updateMovieUseCase(
        'bad-id',
        updateDto,
        movieRepo as any,
        movieRatingRepo as any,
        actorRepo as any,
      ),
    ).rejects.toThrow(NotFoundException);
  });

  it('should handle errors gracefully', async () => {
    movieRepo.findOne = jest.fn().mockRejectedValue(new Error('fail'));

    const updateDto: UpdateMovieDto = { name: 'Updated' };

    await expect(
      updateMovieUseCase(
        'uuid',
        updateDto,
        movieRepo as any,
        movieRatingRepo as any,
        actorRepo as any,
      ),
    ).rejects.toThrow(Error);
  });
});
