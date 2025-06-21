import { Repository } from 'typeorm';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { Movie } from '../entities/movie.entity';
import { InternalServerErrorException } from '@nestjs/common';

export const createMovieUseCase = async (
  createMovieDto: CreateMovieDto,
  movieRepository: Repository<Movie>,
) => {
  try {
    const movie = movieRepository.create(createMovieDto);
    await movieRepository.save(movie);
    return movie;
  } catch {
    throw new InternalServerErrorException('Error creating movie');
  }
};
