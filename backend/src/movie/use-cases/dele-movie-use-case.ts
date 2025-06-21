import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { FindOneMovieUseCase } from './find-one-movie-use-case';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export const deleteMovieUseCase = async (
  id: string,
  movieRepository: Repository<Movie>,
) => {
  const movie = await FindOneMovieUseCase(id, movieRepository);

  if (!movie) {
    throw new NotFoundException(`movie with id ${id} not found`);
  }

  try {
    movie.isActive = false;
    await movieRepository.save(movie);
    return movie;
  } catch {
    throw new InternalServerErrorException('Error deleting movie');
  }
};

export const deleteMoviePermanentlyUseCase = async (id: string, movieRepository: Repository<Movie>) => {
  const movie = await movieRepository.findBy({ id });

  if (!movie) {
    throw new NotFoundException(`movie with id ${id} not found`);
  }

  try {
    await movieRepository.remove(movie);
    return { message: 'Movie deleted successfully' };
  } catch {
    throw new InternalServerErrorException('Error deleting movie');
  }
};
