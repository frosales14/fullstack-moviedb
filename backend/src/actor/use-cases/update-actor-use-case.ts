import { Repository } from 'typeorm';
import { Actor } from '../entities/actor.entity';
import { UpdateActorDto } from '../dto/update-actor.dto';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export const updateActorUseCase = async (
  id: string,
  updateActorDto: UpdateActorDto,
  actorRepository: Repository<Actor>,
) => {
  let actor: Actor | undefined;

  try {
    actor = await actorRepository.preload({
      id: id,
      ...updateActorDto,
    });
  } catch {
    throw new InternalServerErrorException('Error updating actor');
  }

  if (!actor) throw new NotFoundException(`Movie with id ${id} not found`);

  return actorRepository.save(actor);
};
