import { Repository } from 'typeorm';
import { Actor } from '../entities/actor.entity';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  PaginationDto,
  PaginatedResponseDto,
} from 'src/common/dto/pagination.dto';

export const findActorByIdUseCase = async (
  id: string,
  actorRepository: Repository<Actor>,
) => {
  try {
    const actor = await actorRepository.findOne({
      where: { id },
      relations: ['movies'],
    });

    if (!actor) {
      throw new NotFoundException(`actor with id ${id} not found`);
    }

    return actor;
  } catch {
    throw new InternalServerErrorException(
      'Something went wrong, check the logs.',
    );
  }
};

export const FindActorByNameUseCase = async (
  name: string,
  paginationDto: PaginationDto,
  actorRepository: Repository<Actor>,
): Promise<PaginatedResponseDto<Actor>> => {
  try {
    const { page = 1, limit = 10 } = paginationDto;
    const offset = (page - 1) * limit;

    // Create query builder
    const queryBuilder = actorRepository.createQueryBuilder('actor');

    // Apply search filter
    queryBuilder
      .leftJoinAndSelect('actor.movies', 'movie')
      .where('LOWER(actor.name) LIKE LOWER(:name)', {
        name: `%${name}%`,
      })
      .orWhere('LOWER(movie.name) LIKE LOWER(:name)', { name: `%${name}%` });

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
      'Something went wrong, check the logs.',
    );
  }
};
