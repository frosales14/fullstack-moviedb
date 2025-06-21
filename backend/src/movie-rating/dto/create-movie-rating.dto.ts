import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateMovieRatingDto {
  @IsOptional()
  @IsUUID() // Or IsUUID() if you're using UUIDs
  id?: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @IsString()
  @MinLength(1)
  review: string;
}
