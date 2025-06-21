import {
  PaginationDto,
  PaginatedResponseDto,
} from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';

export const getAllMoviesUseCase = async (
  paginationDto: PaginationDto,
  movieRepository: Repository<Movie>,
): Promise<PaginatedResponseDto<Movie>> => {
  const { page = 1, limit = 10 } = paginationDto;
  const offset = (page - 1) * limit;

  // Get total count
  const total = await movieRepository.count();

  // Get paginated data
  const data = await movieRepository.find({
    relations: ['actors', 'ratings'],
    skip: offset,
    take: limit,
  });

  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
};
