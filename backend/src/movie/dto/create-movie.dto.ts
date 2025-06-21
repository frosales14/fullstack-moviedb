import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateActorDto } from 'src/actor/dto/create-actor.dto';
import { Actor } from 'src/actor/entities/actor.entity';
import { CreateMovieRatingDto } from 'src/movie-rating/dto/create-movie-rating.dto';
import { MovieRating } from 'src/movie-rating/entities/movie-rating.entity';

export class CreateMovieDto {
  @IsOptional()
  @IsUUID() // Or IsUUID() if you're using UUIDs
  id?: string;

  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  description: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  imgUrl?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMovieRatingDto)
  ratings?: MovieRating[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateActorDto)
  actors?: Actor[];
}
