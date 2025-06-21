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
import { MovieRatingService } from './movie-rating.service';
import { CreateMovieRatingDto } from './dto/create-movie-rating.dto';
import { UpdateMovieRatingDto } from './dto/update-movie-rating.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('movie-rating')
export class MovieRatingController {
  constructor(private readonly movieRatingService: MovieRatingService) {}

  @UseGuards(AuthGuard())
  @Post()
  create(@Body() createMovieRatingDto: CreateMovieRatingDto) {
    return this.movieRatingService.create(createMovieRatingDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.movieRatingService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.movieRatingService.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMovieRatingDto: UpdateMovieRatingDto,
  ) {
    return this.movieRatingService.update(id, updateMovieRatingDto);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.movieRatingService.remove(id);
  }
}
