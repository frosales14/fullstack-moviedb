import { getAllMoviesUseCase } from './get-all-movie-use-case';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Movie } from '../entities/movie.entity';
import { Repository } from 'typeorm';

// Mock repository type
type MockRepository = {
  [K in keyof Repository<Movie>]: jest.Mock;
};

describe('getAllMoviesUseCase', () => {
  it('should return paginated movies', async () => {
    const mockMovies = [{ id: 'uuid', name: 'Test Movie' }];
    const repo: MockRepository = {
      find: jest.fn().mockResolvedValue(mockMovies),
      count: jest.fn().mockResolvedValue(10),
    } as unknown as MockRepository;

    const paginationDto: PaginationDto = { page: 1, limit: 5, offset: 0 };

    const result = await getAllMoviesUseCase(paginationDto, repo as any);

    expect(repo.find).toHaveBeenCalledWith({
      relations: ['actors', 'ratings'],
      skip: 0,
      take: 5,
    });
    expect(repo.count).toHaveBeenCalled();
    expect(result.data).toEqual(mockMovies);
    expect(result.pagination.page).toBe(1);
    expect(result.pagination.limit).toBe(5);
    expect(result.pagination.total).toBe(10);
  });
});
