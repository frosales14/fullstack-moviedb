import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { MovieRating } from 'src/movie-rating/entities/movie-rating.entity';
import { Movie } from 'src/movie/entities/movie.entity';
import { Actor } from 'src/actor/entities/actor.entity';
import { User } from 'src/auth/entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedController } from './seed.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MovieRating, Movie, Actor, User])],
  providers: [SeedService],
  controllers: [SeedController],
})
export class SeedModule {}
