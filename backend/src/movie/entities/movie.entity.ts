import { Actor } from 'src/actor/entities/actor.entity';
import { MovieRating } from 'src/movie-rating/entities/movie-rating.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('bool', { default: 0 })
  isActive?: boolean;

  @Column('text', { default: 'https://placehold.co/308x360' })
  imgUrl?: string;

  @OneToMany(() => MovieRating, (movieRating) => movieRating.movie, {
    cascade: true,
  })
  ratings?: MovieRating[];

  @ManyToMany(() => Actor, (actor) => actor.movies, { cascade: true })
  @JoinTable({
    name: 'movies_actors',
  })
  actors: Actor[];
}
