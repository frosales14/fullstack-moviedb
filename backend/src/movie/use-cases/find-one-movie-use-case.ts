import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  PaginationDto,
  PaginatedResponseDto,
} from 'src/common/dto/pagination.dto';

export const FindOneMovieUseCase = async (
  id: string,
  movieRepository: Repository<Movie>,
): Promise<Movie> => {
  const movie = await movieRepository.findOne({
    where: { id },
    relations: ['ratings', 'actors'],
  });

  if (!movie) {
    throw new NotFoundException(`movie with id ${id} not found`);
  }

  return movie;
};

export const FindMovieByNameUseCase = async (
  name: string,
  paginationDto: PaginationDto,
  movieRepository: Repository<Movie>,
): Promise<PaginatedResponseDto<Movie>> => {
  try {
    const { page = 1, limit = 10 } = paginationDto;
    const offset = (page - 1) * limit;

    // Create query builder
    const queryBuilder = movieRepository.createQueryBuilder('movie');

    // Apply search filter
    queryBuilder
      .leftJoinAndSelect('movie.ratings', 'rating')
      .leftJoinAndSelect('movie.actors', 'actor')
      .where('LOWER(movie.name) LIKE LOWER(:name)', {
        name: `%${name}%`,
      })
      .orWhere('LOWER(actor.name) LIKE LOWER(:name)', { name: `%${name}%` });

    // Get total count
    const total = await queryBuilder.getCount();

    // Apply pagination
    const data = await queryBuilder.skip(offset).take(limit).getMany();

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
  } catch {
    throw new InternalServerErrorException(
      'something went wrong, check the logs.',
    );
  }
};
