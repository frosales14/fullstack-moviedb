import { Repository } from 'typeorm';
import { CreateMovieRatingDto } from '../dto/create-movie-rating.dto';
import { MovieRating } from '../entities/movie-rating.entity';

export const createMovieRatingUseCase = async (
  createMovieRatingDto: CreateMovieRatingDto,
  movieRatingRepository: Repository<MovieRating>,
) => {
  const movieRating = movieRatingRepository.create(createMovieRatingDto);
  await movieRatingRepository.save(movieRating);
  return movieRating;
};
