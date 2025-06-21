import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { MovieRating } from '../entities/movie-rating.entity';

export const findAllMovieRatingUseCase = async (
  paginationDto: PaginationDto,
  movieRatingRepository: Repository<MovieRating>,
) => {
  const { limit = 10, offset = 0 } = paginationDto;

  const movieRating = movieRatingRepository.find({
    take: limit,
    skip: offset,
  });

  return movieRating;
};
