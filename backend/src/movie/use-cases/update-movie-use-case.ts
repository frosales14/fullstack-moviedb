import { In, Repository } from 'typeorm';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { Movie } from '../entities/movie.entity';
import { FindOneMovieUseCase } from './find-one-movie-use-case';
import { MovieRating } from 'src/movie-rating/entities/movie-rating.entity';
import { instanceToPlain } from 'class-transformer';
import { Actor } from 'src/actor/entities/actor.entity';
import { NotFoundException } from '@nestjs/common';

export const updateMovieUseCase = async (
  id: string,
  updateMovieDto: UpdateMovieDto,
  movieRepository: Repository<Movie>,
  movieRatingRepository: Repository<MovieRating>,
  actorRepository: Repository<Actor>,
) => {
  const movie = await FindOneMovieUseCase(id, movieRepository);

  const { ratings = [], ...movieDb } = movie;

  const updatedMovie = { ...movieDb, ...updateMovieDto };

  updateMovieRatingUseCase(
    updateMovieDto,
    ratings,
    movieRatingRepository,
    movieDb,
  );

  const actors = await updateActorInMoviesUseCase(
    updateMovieDto,
    actorRepository,
  );

  const movieToSave = {
    ...updatedMovie,
    ratings,
    actors,
  };

  const savedMovie = await movieRepository.save(movieToSave);
  return instanceToPlain(savedMovie);
};

const updateMovieRatingUseCase = (
  updateMovieDto: UpdateMovieDto,
  ratings: MovieRating[],
  movieRatingRepository: Repository<MovieRating>,
  movieDb: Movie,
): void => {
  if (updateMovieDto.ratings && updateMovieDto.ratings.length > 0) {
    for (const ratingDto of updateMovieDto.ratings) {
      if (ratingDto.id) {
        const existingRating = ratings?.find((r) => r.id === ratingDto.id);
        if (existingRating) {
          Object.assign(existingRating, ratingDto);
        }
      } else {
        const newRating = movieRatingRepository.create(ratingDto);
        newRating.movie = movieDb;
        ratings.push(newRating);
      }
    }
  }
};

const updateActorInMoviesUseCase = async (
  updateMovieDto: UpdateMovieDto,
  actorRepository: Repository<Actor>,
) => {
  let newActors: Actor[] = [];
  if (updateMovieDto.actors && updateMovieDto.actors.length > 0) {
    const actorsIds = updateMovieDto.actors.map((actor) => actor.id);
    const actors = await actorRepository.find({
      where: { id: In(actorsIds) },
    });

    if (actors.length === 0) {
      throw new NotFoundException('No matching actors found');
    }

    newActors = actors;
  }
  return newActors;
};
