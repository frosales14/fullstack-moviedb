import {
  PaginationDto,
  PaginatedResponseDto,
} from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { Actor } from '../entities/actor.entity';

export const findAllActorsUseCase = async (
  paginationDto: PaginationDto,
  actorRepository: Repository<Actor>,
): Promise<PaginatedResponseDto<Actor>> => {
  const { page = 1, limit = 10 } = paginationDto;
  const offset = (page - 1) * limit;

  // Get total count
  const total = await actorRepository.count({
    where: { isActive: true },
  });

  // Get paginated data
  const data = await actorRepository.find({
    where: { isActive: true },
    relations: ['movies'],
    take: limit,
    skip: offset,
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
