import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieRating } from 'src/movie-rating/entities/movie-rating.entity';
import { Actor } from 'src/actor/entities/actor.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  imports: [TypeOrmModule.forFeature([Movie, MovieRating, Actor]), AuthModule],
})
export class MovieModule {}
