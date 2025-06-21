import { Exclude } from 'class-transformer';
import { Movie } from 'src/movie/entities/movie.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MovieRating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', {
    default: 0,
  })
  rating: number;

  @Column('text')
  review: string;

  @Exclude()
  @ManyToOne(() => Movie, (movie) => movie.ratings, { onDelete: 'CASCADE' })
  movie: Movie;
}
