import { Injectable } from '@nestjs/common';
import { CreateMovieRatingDto } from './dto/create-movie-rating.dto';
import { UpdateMovieRatingDto } from './dto/update-movie-rating.dto';
import {
  createMovieRatingUseCase,
  deleteMovieRatingUseCase,
  findAllMovieRatingUseCase,
  findMovieRatingByIdUseCase,
  updateMovieRatingUseCase,
} from './use-cases';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieRating } from './entities/movie-rating.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class MovieRatingService {
  constructor(
    @InjectRepository(MovieRating)
    private readonly movieRatingRepository: Repository<MovieRating>,
  ) {}

  create(createMovieRatingDto: CreateMovieRatingDto) {
    return createMovieRatingUseCase(
      createMovieRatingDto,
      this.movieRatingRepository,
    );
  }

  findAll(paginationDto: PaginationDto) {
    return findAllMovieRatingUseCase(paginationDto, this.movieRatingRepository);
  }

  findOne(id: string) {
    return findMovieRatingByIdUseCase(id, this.movieRatingRepository);
  }

  update(id: string, updateMovieRatingDto: UpdateMovieRatingDto) {
    return updateMovieRatingUseCase(
      id,
      updateMovieRatingDto,
      this.movieRatingRepository,
    );
  }

  remove(id: string) {
    return deleteMovieRatingUseCase(id, this.movieRatingRepository);
  }
}
