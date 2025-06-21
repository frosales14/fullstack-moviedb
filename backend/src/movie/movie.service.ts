import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import {
  PaginationDto,
  PaginatedResponseDto,
} from 'src/common/dto/pagination.dto';
import {
  createMovieUseCase,
  deleteMoviePermanentlyUseCase,
  deleteMovieUseCase,
  FindMovieByNameUseCase,
  FindOneMovieUseCase,
  getAllMoviesUseCase,
  updateMovieUseCase,
} from './use-cases';
import { MovieRating } from 'src/movie-rating/entities/movie-rating.entity';
import { Actor } from 'src/actor/entities/actor.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,

    @InjectRepository(MovieRating)
    private readonly movieRatingRepository: Repository<MovieRating>,

    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) { }

  async create(createMovieDto: CreateMovieDto) {
    return createMovieUseCase(createMovieDto, this.movieRepository);
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<Movie>> {
    return getAllMoviesUseCase(paginationDto, this.movieRepository);
  }

  async findOne(id: string) {
    return FindOneMovieUseCase(id, this.movieRepository);
  }

  async findByName(
    name: string,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<Movie>> {
    return FindMovieByNameUseCase(name, paginationDto, this.movieRepository);
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    return updateMovieUseCase(
      id,
      updateMovieDto,
      this.movieRepository,
      this.movieRatingRepository,
      this.actorRepository,
    );
  }

  async deletePermanently(id: string) {
    return deleteMoviePermanentlyUseCase(id, this.movieRepository);
  }

  async remove(id: string) {
    return deleteMovieUseCase(id, this.movieRepository);
  }
}
