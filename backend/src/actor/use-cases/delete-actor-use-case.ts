import { Repository } from 'typeorm';
import { Actor } from '../entities/actor.entity';
import { findActorByIdUseCase } from './find-one-actor-use-case';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export const deleteActorUseCase = async (
  id: string,
  actorRepository: Repository<Actor>,
) => {
  const actor = await findActorByIdUseCase(id, actorRepository);

  if (!actor) {
    throw new NotFoundException(`movie with id ${id} not found`);
  }

  try {
    actor.isActive = false;
    await actorRepository.save(actor);
    return actor;
  } catch {
    throw new InternalServerErrorException('Error deleting actor');
  }
};
