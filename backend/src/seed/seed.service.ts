import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MovieRating } from 'src/movie-rating/entities/movie-rating.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/movie/entities/movie.entity';
import { Actor } from 'src/actor/entities/actor.entity';
import { User } from 'src/auth/entities/auth.entity';
import { initialData, updatedMovies } from './seed-data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(MovieRating)
    private readonly movieRatingRepository: Repository<MovieRating>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async runSeed() {
    await this.deleteTables();
    await this.inserUsers();
    await this.insertActors();
    await this.insertMovies();

    await this.updateMoviesWithRatingsAndActors();
  }

  async deleteTables() {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      // Use TRUNCATE with CASCADE (note the quotes around "user")
      await queryRunner.query('TRUNCATE TABLE movie_rating CASCADE');
      await queryRunner.query('TRUNCATE TABLE movies_actors CASCADE');
      await queryRunner.query('TRUNCATE TABLE movie CASCADE');
      await queryRunner.query('TRUNCATE TABLE actor CASCADE');
      await queryRunner.query('TRUNCATE TABLE "users"'); // Note the quotes

      await queryRunner.commitTransaction();

      return {
        message: 'Tables deleted successfully',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async inserUsers() {
    const users = initialData.users;
    const insertPromises = users.map((user) => this.userRepository.save(user));
    await Promise.all(insertPromises);
  }

  private async insertMovies() {
    const movies = initialData.movies;
    const insertPromises = movies.map((movie) =>
      this.movieRepository.save(movie),
    );
    await Promise.all(insertPromises);
  }

  private async insertActors() {
    const actors = initialData.actors;
    const insertPromises = actors.map((actor) =>
      this.actorRepository.save(actor),
    );
    await Promise.all(insertPromises);
  }

  async updateMoviesWithRatingsAndActors() {
    const movies = updatedMovies;

    const insertPromises = movies.map((movie) =>
      this.movieRepository.save(movie),
    );
    await Promise.all(insertPromises);
  }
}
