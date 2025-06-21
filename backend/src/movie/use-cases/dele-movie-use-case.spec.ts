import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { deleteMovieUseCase } from './dele-movie-use-case';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

type MockRepository = {
  [K in keyof Repository<Movie>]: jest.Mock;
};

describe('deleteMovieUseCase', () => {
  let repo: MockRepository;

  beforeEach(() => {
    repo = {
      findOne: jest.fn(),
      save: jest.fn(),
    } as unknown as MockRepository;
  });


  it('should throw NotFoundException if movie does not exist', async () => {
    repo.findOne.mockResolvedValue(undefined);

    await expect(deleteMovieUseCase('bad-id', repo as any)).rejects.toThrow(
      NotFoundException,
    );

    expect(repo.findOne).toHaveBeenCalledWith({
      where: { id: 'bad-id' },
      relations: ['ratings', 'actors'],
    });
    expect(repo.save).not.toHaveBeenCalled();
  });

  it('should throw InternalServerErrorException if save fails', async () => {
    const mockMovie: Movie = {
      id: 'uuid',
      name: 'Test Movie',
      description: 'Test Description',
      isActive: false,
      imgUrl: 'https://example.com/image.jpg',
      ratings: [],
      actors: [],
    };

    repo.findOne.mockResolvedValue(mockMovie);
    repo.save.mockRejectedValue(new Error('save failed'));

    await expect(deleteMovieUseCase('uuid', repo as any)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
