import { Repository } from 'typeorm';
import { CreateActorDto } from '../dto/create-actor.dto';
import { Actor } from '../entities/actor.entity';

export const createActorUseCase = async (
  createActorDto: CreateActorDto,
  actorRepository: Repository<Actor>,
) => {
  const actor = actorRepository.create(createActorDto);
  await actorRepository.save(actor);
  return actor;
};
