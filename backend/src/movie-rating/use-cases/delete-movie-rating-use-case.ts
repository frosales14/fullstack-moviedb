import { Repository } from 'typeorm';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { MovieRating } from '../entities/movie-rating.entity';
import { findMovieRatingByIdUseCase } from './find-one-movie-rating-use-case';

export const deleteMovieRatingUseCase = async (
  id: string,
  movieRatingRepository: Repository<MovieRating>,
) => {
  const movieRating = await findMovieRatingByIdUseCase(
    id,
    movieRatingRepository,
  );

  if (!movieRating) {
    throw new NotFoundException(`movie rating with id ${id} not found`);
  }

  try {
    await movieRatingRepository.remove(movieRating);
    return { message: 'Movie rating deleted successfully' };
  } catch {
    throw new InternalServerErrorException('Error deleting movie rating');
  }
};
