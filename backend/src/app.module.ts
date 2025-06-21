import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CONFIG_DATABASE } from './common/infraestructure/config-database';
import { AuthModule } from './auth/auth.module';
import { ActorModule } from './actor/actor.module';
import { MovieRatingModule } from './movie-rating/movie-rating.module';
import { MovieModule } from './movie/movie.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CONFIG_DATABASE(),
    AuthModule,
    ActorModule,
    MovieRatingModule,
    MovieModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
