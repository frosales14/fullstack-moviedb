import { Module } from '@nestjs/common';
import { MovieRatingService } from './movie-rating.service';
import { MovieRatingController } from './movie-rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRating } from './entities/movie-rating.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [MovieRatingController],
  providers: [MovieRatingService],
  imports: [TypeOrmModule.forFeature([MovieRating]), AuthModule],
})
export class MovieRatingModule {}
