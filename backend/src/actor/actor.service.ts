import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from './entities/actor.entity';
import { Repository } from 'typeorm';
import {
  createActorUseCase,
  deleteActorUseCase,
  findActorByIdUseCase,
  FindActorByNameUseCase,
  findAllActorsUseCase,
  updateActorUseCase,
} from './use-cases';
import {
  PaginationDto,
  PaginatedResponseDto,
} from 'src/common/dto/pagination.dto';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}

  async create(createActorDto: CreateActorDto) {
    return createActorUseCase(createActorDto, this.actorRepository);
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<Actor>> {
    return findAllActorsUseCase(paginationDto, this.actorRepository);
  }

  async findOne(id: string) {
    return findActorByIdUseCase(id, this.actorRepository);
  }

  async findByName(
    name: string,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<Actor>> {
    return FindActorByNameUseCase(name, paginationDto, this.actorRepository);
  }

  async update(id: string, updateActorDto: UpdateActorDto) {
    return updateActorUseCase(id, updateActorDto, this.actorRepository);
  }

  async remove(id: string) {
    return deleteActorUseCase(id, this.actorRepository);
  }
}
