import { SelectQueryBuilder, BaseEntity } from 'typeorm';
import { PaginationDto, PaginatedResponseDto } from '../dto/pagination.dto';

export class PaginationService {
  static async paginate<T extends BaseEntity>(
    queryBuilder: SelectQueryBuilder<T>,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<T>> {
    const { page = 1, limit = 10 } = paginationDto;
    const offset = (page - 1) * limit;

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
  }
}
