import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import {
  PaginationDto,
  PaginatedResponseDto,
} from 'src/common/dto/pagination.dto';
import { Actor } from './entities/actor.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @UseGuards(AuthGuard())
  @Post()
  create(@Body() createActorDto: CreateActorDto) {
    return this.actorService.create(createActorDto);
  }

  @Get()
  async findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<Actor>> {
    return this.actorService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.actorService.findOne(id);
  }

  @Get('name/:name')
  async findOneByName(
    @Param('name') name: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<Actor>> {
    return this.actorService.findByName(name, paginationDto);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateActorDto: UpdateActorDto,
  ) {
    return this.actorService.update(id, updateActorDto);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.actorService.remove(id);
  }
}
