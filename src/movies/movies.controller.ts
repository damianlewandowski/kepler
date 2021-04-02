import { Role } from './../common/enums/role.enum';
import { MoviesService } from './movies.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import CreateMovieDto from './dto/create-movie.dto';
import { Roles } from 'common/decorators/roles.decorator';
import { RolesGuard } from 'common/guards/roles.guard';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';

@Controller('movies')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Post('')
  @Roles(Role.Admin)
  async insertMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.insert(createMovieDto);
  }
}
