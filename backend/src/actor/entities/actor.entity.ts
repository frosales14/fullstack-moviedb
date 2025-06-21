import { Movie } from 'src/movie/entities/movie.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Actor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { default: 'Actor Name' })
  name?: string;

  @Column('boolean', {
    default: true,
  })
  isActive?: boolean;

  @ManyToMany(() => Movie, (movie) => movie.actors)
  movies?: Movie[];
}
