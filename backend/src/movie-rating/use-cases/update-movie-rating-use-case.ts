import { Repository } from 'typeorm';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateMovieRatingDto } from '../dto/update-movie-rating.dto';
import { MovieRating } from '../entities/movie-rating.entity';

export const updateMovieRatingUseCase = async (
  id: string,
  updateMovieRatingDto: UpdateMovieRatingDto,
  movieRatingRepository: Repository<MovieRating>,
) => {
  let movieRating: MovieRating | undefined;

  try {
    movieRating = await movieRatingRepository.preload({
      id: id,
      ...updateMovieRatingDto,
    });
  } catch {
    throw new InternalServerErrorException('Error updating movie rating');
  }

  if (!movieRating)
    throw new NotFoundException(`Movie rating with id ${id} not found`);

  return movieRatingRepository.save(movieRating);
};
