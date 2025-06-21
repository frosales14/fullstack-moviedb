import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {
  PaginationDto,
  PaginatedResponseDto,
} from 'src/common/dto/pagination.dto';
import { Movie } from './entities/movie.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }

  @UseGuards(AuthGuard())
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  async findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<Movie>> {
    return this.movieService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.movieService.findOne(id);
  }

  @Get('name/:name')
  async findOneByName(
    @Param('name') name: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<Movie>> {
    return this.movieService.findByName(name, paginationDto);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.movieService.update(id, updateMovieDto);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.movieService.deletePermanently(id);
  }
}
