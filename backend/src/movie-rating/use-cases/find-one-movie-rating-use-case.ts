import { Repository } from 'typeorm';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { MovieRating } from '../entities/movie-rating.entity';

export const findMovieRatingByIdUseCase = async (
  id: string,
  movieRatingRepository: Repository<MovieRating>,
) => {
  try {
    const movieRating = await movieRatingRepository.findOneBy({ id });

    if (!movieRating) {
      throw new NotFoundException(`actor with id ${id} not found`);
    }

    return movieRating;
  } catch {
    throw new InternalServerErrorException('Error finding movie rating');
  }
};
